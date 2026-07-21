import Stripe from "npm:stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.55.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed",
        }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const starterPriceId = Deno.env.get("STRIPE_STARTER_PRICE_ID");
    const siteUrl = Deno.env.get("SITE_URL");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (
      !stripeSecretKey ||
      !starterPriceId ||
      !siteUrl ||
      !supabaseUrl ||
      !supabaseAnonKey ||
      !serviceRoleKey
    ) {
      throw new Error("Required server environment variables are missing.");
    }

    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return new Response(
        JSON.stringify({
          error: "Authorization header is missing.",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Client that identifies the currently logged-in user.
    const userClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: {
            Authorization: authorization,
          },
        },
      },
    );

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          error: "You must be logged in to subscribe.",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Admin client used only inside this secure Edge Function.
    const adminClient = createClient(
      supabaseUrl,
      serviceRoleKey,
    );

    const stripe = new Stripe(stripeSecretKey);

    const { data: existingSubscription, error: subscriptionError } =
      await adminClient
        .from("subscriptions")
        .select("stripe_customer_id, status")
        .eq("user_id", user.id)
        .maybeSingle();

    if (subscriptionError) {
      throw subscriptionError;
    }

    if (
      existingSubscription?.status === "active" ||
      existingSubscription?.status === "trialing"
    ) {
      return new Response(
        JSON.stringify({
          error: "You already have an active subscription.",
        }),
        {
          status: 409,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    let stripeCustomerId =
      existingSubscription?.stripe_customer_id ?? null;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });

      stripeCustomerId = customer.id;

      const { error: upsertError } = await adminClient
        .from("subscriptions")
        .upsert(
          {
            user_id: user.id,
            stripe_customer_id: stripeCustomerId,
            stripe_price_id: starterPriceId,
            status: "inactive",
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          },
        );

      if (upsertError) {
        throw upsertError;
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",

      customer: stripeCustomerId,

      line_items: [
        {
          price: starterPriceId,
          quantity: 1,
        },
      ],

      success_url:
        `${siteUrl}/#/settings?checkout=success&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url:
        `${siteUrl}/#/settings?checkout=cancelled`,

      client_reference_id: user.id,

      metadata: {
        supabase_user_id: user.id,
        plan: "starter",
      },

      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          plan: "starter",
        },
      },

      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    if (!checkoutSession.url) {
      throw new Error("Stripe did not return a Checkout URL.");
    }

    return new Response(
      JSON.stringify({
        url: checkoutSession.url,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Checkout function error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create checkout session.";

    return new Response(
      JSON.stringify({
        error: message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});