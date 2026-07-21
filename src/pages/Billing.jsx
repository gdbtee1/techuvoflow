import { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

const plans = [
  {
    name: "Starter",
    price: "$4.99",
    description: "Everything you need to organize leads and manage your pipeline.",
    available: true,
    featured: true,
    badge: "Best for getting started",
    features: [
      "Lead management",
      "Visual sales pipeline",
      "Appointments",
      "Business dashboard",
      "Secure workspace",
    ],
  },
  {
    name: "Growth",
    price: "$9.99",
    description: "More automation and communication tools for growing teams.",
    available: false,
    features: [
      "Everything in Starter",
      "Email and SMS automations",
      "Shared inbox",
      "Advanced analytics",
      "Team member access",
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Advanced tools for businesses ready to scale operations.",
    available: false,
    features: [
      "Everything in Growth",
      "AI agents",
      "Advanced automations",
      "Multiple team accounts",
      "Priority support",
    ],
  },
];

export default function Billing() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const startCheckout = async () => {
    try {
      setCheckoutLoading(true);
      setCheckoutError("");

      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {},
        }
      );

      if (error) {
        throw error;
      }

      if (!data?.url) {
        throw new Error("Stripe Checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);

      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Unable to open checkout."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroGlowOne} />
        <div style={styles.heroGlowTwo} />

        <div style={styles.heroContent}>
          <div style={styles.eyebrow}>
            <Sparkles size={16} />
            Simple pricing. Serious business tools.
          </div>

          <h1 style={styles.heading}>
            Choose the plan that moves your business forward
          </h1>

          <p style={styles.subheading}>
            Start with the essentials today. Upgrade as your business grows and
            unlock more automation, team access, and AI-powered tools.
          </p>

          <div style={styles.trustRow}>
            <span style={styles.trustItem}>
              <ShieldCheck size={17} />
              Secure Stripe checkout
            </span>

            <span style={styles.trustItem}>
              <Zap size={17} />
              Instant account access
            </span>

            <span style={styles.trustItem}>
              <Check size={17} />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      <section style={styles.content}>
        <div style={styles.planGrid}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              style={{
                ...styles.planCard,
                ...(plan.featured ? styles.featuredCard : {}),
              }}
            >
              {plan.badge && (
                <div style={styles.badge}>
                  <Sparkles size={14} />
                  {plan.badge}
                </div>
              )}

              <div style={styles.planHeader}>
                <div>
                  <p style={styles.planName}>{plan.name}</p>
                  <p style={styles.planDescription}>{plan.description}</p>
                </div>

                {!plan.available && (
                  <span style={styles.comingSoon}>Coming soon</span>
                )}
              </div>

              <div style={styles.priceRow}>
                <span style={styles.price}>{plan.price}</span>
                <span style={styles.interval}>/month</span>
              </div>

              <div style={styles.divider} />

              <p style={styles.includesText}>What&apos;s included</p>

              <ul style={styles.featureList}>
                {plan.features.map((feature) => (
                  <li key={feature} style={styles.featureItem}>
                    <span style={styles.checkIcon}>
                      <Check size={15} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.available ? (
                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={checkoutLoading}
                  style={{
                    ...styles.primaryButton,
                    ...(checkoutLoading ? styles.disabledButton : {}),
                  }}
                >
                  {checkoutLoading ? (
                    "Opening secure checkout..."
                  ) : (
                    <>
                      Start with Starter
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              ) : (
                <button type="button" disabled style={styles.secondaryButton}>
                  Coming soon
                </button>
              )}
            </article>
          ))}
        </div>

        {checkoutError && (
          <div style={styles.errorBox}>
            <strong>Checkout could not open.</strong>
            <span>{checkoutError}</span>
          </div>
        )}

        <section style={styles.bottomCard}>
          <div>
            <p style={styles.bottomEyebrow}>Built for real businesses</p>
            <h2 style={styles.bottomHeading}>
              Stop losing track of leads and opportunities.
            </h2>
            <p style={styles.bottomText}>
              Techuvo Flow gives you one clear place to manage your pipeline,
              appointments, and business activity without unnecessary
              complexity.
            </p>
          </div>

          <button
            type="button"
            onClick={startCheckout}
            disabled={checkoutLoading}
            style={{
              ...styles.bottomButton,
              ...(checkoutLoading ? styles.disabledButton : {}),
            }}
          >
            {checkoutLoading ? "Opening..." : "Get started for $4.99"}
          </button>
        </section>

        <p style={styles.footerNote}>
          Payments are processed securely through Stripe. Techuvo Flow does not
          store your card information.
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f8fc",
    color: "#111827",
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    padding: "72px 24px 130px",
    background:
      "linear-gradient(135deg, #111827 0%, #1f1b4d 48%, #4f46e5 100%)",
  },

  heroGlowOne: {
    position: "absolute",
    width: "380px",
    height: "380px",
    borderRadius: "50%",
    background: "rgba(139, 92, 246, 0.3)",
    filter: "blur(90px)",
    top: "-120px",
    right: "5%",
  },

  heroGlowTwo: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(59, 130, 246, 0.24)",
    filter: "blur(90px)",
    bottom: "-150px",
    left: "10%",
  },

  heroContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: "850px",
    margin: "0 auto",
    textAlign: "center",
  },

  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    marginBottom: "24px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.08)",
    color: "#ddd6fe",
    fontSize: "14px",
    fontWeight: 700,
  },

  heading: {
    margin: 0,
    color: "#ffffff",
    fontSize: "clamp(38px, 6vw, 68px)",
    lineHeight: 1.05,
    letterSpacing: "-0.045em",
  },

  subheading: {
    maxWidth: "700px",
    margin: "24px auto 0",
    color: "#d1d5db",
    fontSize: "18px",
    lineHeight: 1.7,
  },

  trustRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "18px",
    marginTop: "32px",
  },

  trustItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    color: "#e5e7eb",
    fontSize: "14px",
    fontWeight: 600,
  },

  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1180px",
    margin: "-72px auto 0",
    padding: "0 24px 56px",
  },

  planGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
    alignItems: "stretch",
  },

  planCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minHeight: "540px",
    padding: "28px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "24px",
    boxShadow: "0 16px 45px rgba(17, 24, 39, 0.09)",
  },

  featuredCard: {
    border: "2px solid #6366f1",
    transform: "translateY(-10px)",
    boxShadow: "0 22px 55px rgba(79, 70, 229, 0.18)",
  },

  badge: {
    position: "absolute",
    top: "-16px",
    left: "24px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#4f46e5",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 800,
    boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)",
  },

  planHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginTop: "6px",
  },

  planName: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 800,
  },

  planDescription: {
    minHeight: "68px",
    margin: "10px 0 0",
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: 1.6,
  },

  comingSoon: {
    height: "fit-content",
    padding: "6px 9px",
    borderRadius: "999px",
    background: "#f3f4f6",
    color: "#6b7280",
    fontSize: "11px",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },

  priceRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "6px",
    marginTop: "24px",
  },

  price: {
    fontSize: "44px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },

  interval: {
    paddingBottom: "7px",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: 600,
  },

  divider: {
    height: "1px",
    margin: "24px 0",
    background: "#e5e7eb",
  },

  includesText: {
    margin: "0 0 15px",
    fontSize: "13px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6b7280",
  },

  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },

  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#374151",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  checkIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#eef2ff",
    color: "#4f46e5",
  },

  primaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    width: "100%",
    marginTop: "auto",
    padding: "14px 16px",
    border: 0,
    borderRadius: "13px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(79, 70, 229, 0.25)",
  },

  secondaryButton: {
    width: "100%",
    marginTop: "auto",
    padding: "14px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "13px",
    background: "#f9fafb",
    color: "#9ca3af",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "not-allowed",
  },

  disabledButton: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  errorBox: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "24px",
    padding: "16px 18px",
    border: "1px solid #fecaca",
    borderRadius: "14px",
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: "14px",
  },

  bottomCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    marginTop: "44px",
    padding: "34px",
    borderRadius: "24px",
    background: "#111827",
    color: "#ffffff",
    boxShadow: "0 20px 45px rgba(17, 24, 39, 0.16)",
  },

  bottomEyebrow: {
    margin: "0 0 8px",
    color: "#a5b4fc",
    fontSize: "13px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },

  bottomHeading: {
    margin: 0,
    fontSize: "clamp(24px, 4vw, 34px)",
    letterSpacing: "-0.03em",
  },

  bottomText: {
    maxWidth: "700px",
    margin: "12px 0 0",
    color: "#d1d5db",
    lineHeight: 1.65,
  },

  bottomButton: {
    flexShrink: 0,
    padding: "14px 20px",
    border: 0,
    borderRadius: "12px",
    background: "#ffffff",
    color: "#111827",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
  },

  footerNote: {
    margin: "24px 0 0",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "13px",
  },
};