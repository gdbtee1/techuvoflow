import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";

import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event?.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await login(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/");
  }

  return (
    <main style={styles.page}>
      <div style={styles.backgroundGrid} />
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <section style={styles.shell}>
        <aside style={styles.brandPanel}>
          <div style={styles.brandTop}>
            <button
              type="button"
              onClick={() => navigate("/")}
              style={styles.logoButton}
              aria-label="Go to homepage"
            >
              <span style={styles.logoMark}>
                <Workflow size={21} />
              </span>

              <span style={styles.logoText}>
                Techuvo <strong>Flow</strong>
              </span>
            </button>

            <div style={styles.brandBadge}>
              <Sparkles size={14} />
              Built for growing businesses
            </div>
          </div>

          <div style={styles.brandContent}>
            <p style={styles.brandEyebrow}>WELCOME BACK</p>

            <h1 style={styles.brandHeading}>
              Pick up exactly where your business left off.
            </h1>

            <p style={styles.brandDescription}>
              Access your leads, appointments, pipeline, and business activity
              from one focused workspace.
            </p>

            <div style={styles.featureList}>
              <Feature
                icon={<UsersRound size={18} />}
                title="Keep every lead organized"
                text="Know who needs attention and what happens next."
              />

              <Feature
                icon={<BarChart3 size={18} />}
                title="See your pipeline clearly"
                text="Track opportunities from first contact to closed deal."
              />

              <Feature
                icon={<ShieldCheck size={18} />}
                title="Secure business workspace"
                text="Your account and business information stay protected."
              />
            </div>
          </div>

          <DashboardPreview />
        </aside>

        <section style={styles.formPanel}>
          <div style={styles.mobileBrand}>
            <span style={styles.logoMark}>
              <Workflow size={20} />
            </span>

            <span style={styles.logoTextDark}>
              Techuvo <strong>Flow</strong>
            </span>
          </div>

          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <div style={styles.formIcon}>
                <LockKeyhole size={22} />
              </div>

              <p style={styles.formEyebrow}>SECURE LOGIN</p>

              <h2 style={styles.formHeading}>Welcome back</h2>

              <p style={styles.formDescription}>
                Sign in to continue managing your Techuvo Flow workspace.
              </p>
            </div>

            {error && (
              <div style={styles.errorBox} role="alert">
                <span style={styles.errorIcon}>!</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label htmlFor="login-email" style={styles.label}>
                  Email address
                </label>

                <div style={styles.inputWrapper}>
                  <Mail size={18} style={styles.inputIcon} />

                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.fieldGroup}>
                <div style={styles.labelRow}>
                  <label htmlFor="login-password" style={styles.label}>
                    Password
                  </label>
                </div>

                <div style={styles.inputWrapper}>
                  <LockKeyhole size={18} style={styles.inputIcon} />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={{
                      ...styles.input,
                      paddingRight: "52px",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    style={styles.passwordButton}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.primaryButton,
                  ...(loading ? styles.disabledButton : {}),
                }}
              >
                <span>{loading ? "Logging in..." : "Login to workspace"}</span>

                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={styles.securityRow}>
              <ShieldCheck size={15} />
              Protected with secure authentication
            </div>

            <div style={styles.divider}>
              <span style={styles.dividerLine} />
              <span style={styles.dividerText}>New to Techuvo Flow?</span>
              <span style={styles.dividerLine} />
            </div>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              style={styles.secondaryButton}
            >
              Create your account
              <ArrowRight size={17} />
            </button>

            <p style={styles.termsText}>
              By continuing, you agree to use Techuvo Flow responsibly and
              securely.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div style={styles.feature}>
      <span style={styles.featureIcon}>{icon}</span>

      <div>
        <p style={styles.featureTitle}>{title}</p>
        <p style={styles.featureText}>{text}</p>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div style={styles.previewWrap}>
      <div style={styles.previewCard}>
        <div style={styles.previewHeader}>
          <div>
            <p style={styles.previewEyebrow}>PIPELINE OVERVIEW</p>
            <p style={styles.previewTitle}>Business activity</p>
          </div>

          <span style={styles.liveBadge}>
            <span style={styles.liveDot} />
            Live
          </span>
        </div>

        <div style={styles.metricGrid}>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>New leads</span>
            <strong style={styles.metricValue}>24</strong>
            <span style={styles.metricChange}>+18% this week</span>
          </div>

          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Appointments</span>
            <strong style={styles.metricValue}>12</strong>
            <span style={styles.metricChange}>4 upcoming today</span>
          </div>
        </div>

        <div style={styles.pipeline}>
          <div style={styles.pipelineRow}>
            <span>New</span>
            <span style={styles.pipelineCount}>14</span>
          </div>
          <div style={styles.pipelineBar}>
            <span style={{ ...styles.pipelineFill, width: "86%" }} />
          </div>

          <div style={styles.pipelineRow}>
            <span>Qualified</span>
            <span style={styles.pipelineCount}>8</span>
          </div>
          <div style={styles.pipelineBar}>
            <span style={{ ...styles.pipelineFill, width: "62%" }} />
          </div>

          <div style={styles.pipelineRow}>
            <span>Proposal</span>
            <span style={styles.pipelineCount}>5</span>
          </div>
          <div style={styles.pipelineBar}>
            <span style={{ ...styles.pipelineFill, width: "42%" }} />
          </div>
        </div>
      </div>

      <div style={styles.floatingCard}>
        <span style={styles.floatingIcon}>
          <Check size={16} />
        </span>

        <div>
          <strong style={styles.floatingTitle}>Follow-up completed</strong>
          <span style={styles.floatingText}>Lead moved to qualified</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    padding: "22px",
    background:
      "radial-gradient(circle at top left, #eef2ff 0%, #f8fafc 38%, #f8fafc 100%)",
    color: "#111827",
  },

  backgroundGrid: {
    position: "absolute",
    inset: 0,
    opacity: 0.28,
    backgroundImage:
      "linear-gradient(rgba(79,70,229,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.08) 1px, transparent 1px)",
    backgroundSize: "46px 46px",
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0.85), transparent 85%)",
  },

  glowOne: {
    position: "absolute",
    width: "420px",
    height: "420px",
    top: "-200px",
    right: "-100px",
    borderRadius: "50%",
    background: "rgba(124,58,237,0.18)",
    filter: "blur(90px)",
  },

  glowTwo: {
    position: "absolute",
    width: "360px",
    height: "360px",
    bottom: "-180px",
    left: "-120px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.15)",
    filter: "blur(90px)",
  },

  shell: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.05fr) minmax(420px, 0.95fr)",
    width: "100%",
    maxWidth: "1380px",
    minHeight: "calc(100vh - 44px)",
    margin: "0 auto",
    overflow: "hidden",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: "32px",
    background: "#ffffff",
    boxShadow: "0 30px 90px rgba(15,23,42,0.16)",
  },

  brandPanel: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
    padding: "38px",
    background:
      "linear-gradient(145deg, #0f172a 0%, #151638 46%, #312e81 100%)",
    color: "#ffffff",
  },

  brandTop: {
    position: "relative",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  logoButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "11px",
    padding: 0,
    border: 0,
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
  },

  logoMark: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    flexShrink: 0,
    borderRadius: "14px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#ffffff",
    boxShadow: "0 10px 25px rgba(99,102,241,0.35)",
  },

  logoText: {
    color: "#ffffff",
    fontSize: "19px",
    fontWeight: 500,
    letterSpacing: "-0.02em",
  },

  logoTextDark: {
    color: "#111827",
    fontSize: "18px",
    fontWeight: 500,
    letterSpacing: "-0.02em",
  },

  brandBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 12px",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.07)",
    color: "#ddd6fe",
    fontSize: "12px",
    fontWeight: 700,
    backdropFilter: "blur(12px)",
  },

  brandContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "610px",
    marginTop: "clamp(60px, 9vh, 110px)",
  },

  brandEyebrow: {
    margin: "0 0 18px",
    color: "#a5b4fc",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.14em",
  },

  brandHeading: {
    maxWidth: "620px",
    margin: 0,
    fontSize: "clamp(42px, 5vw, 72px)",
    lineHeight: 1.02,
    letterSpacing: "-0.055em",
  },

  brandDescription: {
    maxWidth: "570px",
    margin: "24px 0 0",
    color: "#cbd5e1",
    fontSize: "17px",
    lineHeight: 1.7,
  },

  featureList: {
    display: "grid",
    gap: "18px",
    marginTop: "38px",
  },

  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "13px",
  },

  featureIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    flexShrink: 0,
    border: "1px solid rgba(165,180,252,0.2)",
    borderRadius: "12px",
    background: "rgba(99,102,241,0.15)",
    color: "#c4b5fd",
  },

  featureTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 800,
  },

  featureText: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: 1.55,
  },

  previewWrap: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "640px",
    marginTop: "auto",
    paddingTop: "58px",
  },

  previewCard: {
    position: "relative",
    overflow: "hidden",
    padding: "22px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    background: "rgba(15,23,42,0.64)",
    boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
    backdropFilter: "blur(18px)",
  },

  previewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  previewEyebrow: {
    margin: 0,
    color: "#818cf8",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "0.12em",
  },

  previewTitle: {
    margin: "5px 0 0",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: 800,
  },

  liveBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 9px",
    borderRadius: "999px",
    background: "rgba(16,185,129,0.12)",
    color: "#6ee7b7",
    fontSize: "11px",
    fontWeight: 800,
  },

  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#34d399",
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "20px",
  },

  metricCard: {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
  },

  metricLabel: {
    color: "#94a3b8",
    fontSize: "11px",
    fontWeight: 700,
  },

  metricValue: {
    marginTop: "8px",
    color: "#ffffff",
    fontSize: "28px",
    letterSpacing: "-0.04em",
  },

  metricChange: {
    marginTop: "5px",
    color: "#a5b4fc",
    fontSize: "10px",
    fontWeight: 700,
  },

  pipeline: {
    display: "grid",
    gap: "8px",
    marginTop: "20px",
  },

  pipelineRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#cbd5e1",
    fontSize: "11px",
    fontWeight: 700,
  },

  pipelineCount: {
    color: "#ffffff",
  },

  pipelineBar: {
    height: "6px",
    overflow: "hidden",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.08)",
  },

  pipelineFill: {
    display: "block",
    height: "100%",
    borderRadius: "inherit",
    background: "linear-gradient(90deg, #6366f1, #a78bfa)",
  },

  floatingCard: {
    position: "absolute",
    right: "-12px",
    top: "28px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.94)",
    color: "#111827",
    boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
  },

  floatingIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "31px",
    height: "31px",
    borderRadius: "10px",
    background: "#ecfdf5",
    color: "#059669",
  },

  floatingTitle: {
    display: "block",
    fontSize: "11px",
  },

  floatingText: {
    display: "block",
    marginTop: "3px",
    color: "#64748b",
    fontSize: "9px",
  },

  formPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
    padding: "44px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #ffffff 70%, #fafafa 100%)",
  },

  mobileBrand: {
    display: "none",
    alignItems: "center",
    gap: "10px",
    marginBottom: "38px",
  },

  formContainer: {
    width: "100%",
    maxWidth: "470px",
    margin: "0 auto",
  },

  formHeader: {
    marginBottom: "30px",
  },

  formIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    marginBottom: "20px",
    borderRadius: "15px",
    background: "#eef2ff",
    color: "#4f46e5",
  },

  formEyebrow: {
    margin: "0 0 9px",
    color: "#4f46e5",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "0.13em",
  },

  formHeading: {
    margin: 0,
    color: "#0f172a",
    fontSize: "clamp(34px, 4vw, 46px)",
    lineHeight: 1.05,
    letterSpacing: "-0.045em",
  },

  formDescription: {
    margin: "14px 0 0",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.65,
  },

  errorBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "20px",
    padding: "13px 14px",
    border: "1px solid #fecaca",
    borderRadius: "13px",
    background: "#fef2f2",
    color: "#b91c1c",
    fontSize: "13px",
    lineHeight: 1.5,
  },

  errorIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "19px",
    height: "19px",
    flexShrink: 0,
    borderRadius: "50%",
    background: "#fee2e2",
    fontSize: "11px",
    fontWeight: 900,
  },

  form: {
    display: "grid",
    gap: "18px",
  },

  fieldGroup: {
    display: "grid",
    gap: "8px",
  },

  labelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    color: "#1e293b",
    fontSize: "13px",
    fontWeight: 800,
  },

  inputWrapper: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    top: "50%",
    left: "16px",
    zIndex: 1,
    color: "#94a3b8",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    height: "56px",
    boxSizing: "border-box",
    padding: "0 16px 0 47px",
    border: "1px solid #dbe3ee",
    borderRadius: "14px",
    outline: "none",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "15px",
    transition: "border-color 160ms ease, box-shadow 160ms ease",
  },

  passwordButton: {
    position: "absolute",
    top: "50%",
    right: "9px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    border: 0,
    borderRadius: "10px",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    transform: "translateY(-50%)",
  },

  primaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    width: "100%",
    height: "56px",
    marginTop: "4px",
    border: 0,
    borderRadius: "14px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 14px 28px rgba(79,70,229,0.25)",
  },

  disabledButton: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  securityRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    marginTop: "15px",
    color: "#64748b",
    fontSize: "11px",
    fontWeight: 700,
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "28px 0 18px",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },

  dividerText: {
    flexShrink: 0,
    color: "#94a3b8",
    fontSize: "11px",
    fontWeight: 700,
  },

  secondaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    height: "52px",
    border: "1px solid #dbe3ee",
    borderRadius: "14px",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
  },

  termsText: {
    maxWidth: "390px",
    margin: "18px auto 0",
    color: "#94a3b8",
    fontSize: "10px",
    lineHeight: 1.6,
    textAlign: "center",
  },
};