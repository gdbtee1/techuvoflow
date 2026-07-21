import Stripe from "npm:stripe@^22";
import { createClient } from "npm:@supabase/supabase-js@^2";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (
  !stripeSecretKey ||
  !webhookSecret ||
  !supabaseUrl ||
  !serviceRoleKey
) {
  throw new Error("Required webhook environment variables are missing.");
}

const stripe = new Stripe(stripeSecretKey);
const cryptoProvider = Stripe.createSubtleCryptoProvider();

const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey,
);

function unixToIso(value: number | null | undefined) {
  return value ? new Date(value * 1000).toISOString() : null;
}

async function syncSubscription(
  subscription: Stripe.Subscription,
) {
  const userId =
    subscription.metadata.supabase_user_id;

  if (!userId) {
    throw new Error(
      `Subscription ${subscription.id} has no Supabase user ID.`,
    );
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const priceId =
    subscription.items.data[0]?.price.id ?? null;

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        stripe_price_id: priceId,
        status: subscription.status,
        current_period_start: unixToIso(
          subscription.current_period_start,
        ),
        current_period_end: unixToIso(
          subscription.current_period_end,
        ),
        cancel_at_period_end:
          subscription.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    );

  if (error) {
    throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
    });
  }

  const signature =
    req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(
      "Missing Stripe signature",
      {
        status: 400,
      },
    );
  }

  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event =
      await stripe.webhooks.constructEventAsync(
        rawBody,
        signature,
        webhookSecret,
        undefined,
        cryptoProvider,
      );
  } catch (error) {
    console.error(
      "Webhook signature verification failed:",
      error,
    );

    return new Response(
      "Invalid webhook signature",
      {
        status: 400,
      },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        if (
          typeof session.subscription === "string"
        ) {
          const subscription =
            await stripe.subscriptions.retrieve(
              session.subscription,
            );

          await syncSubscription(subscription);
        }

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;

        await syncSubscription(subscription);
        break;
      }

      default:
        console.log(
          `Ignored Stripe event: ${event.type}`,
        );
    }

    return Response.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Webhook processing error:",
      error,
    );

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Webhook processing failed.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});