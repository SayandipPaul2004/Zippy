import { useState, useEffect } from "react";
import { Link2, Eye, EyeOff, Check } from "lucide-react";

export default function ZippySignup() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const update = (field) => (e) => {
    const value = field === "agreed" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name";
    if (!form.email.trim()) next.email = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.password) next.password = "Enter a password";
    else if (form.password.length < 8)
      next.password = "Use at least 8 characters";
    if (form.confirmPassword !== form.password)
      next.confirmPassword = "Passwords don't match";
    if (!form.agreed) next.agreed = "You need to agree to continue";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  };

  const fadeUp = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
  });

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden overflow-hidden bg-indigo-600 px-10 py-12 lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div style={fadeUp(0)}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-white">Zippy</span>
          </div>
        </div>

        <div
          className="flex flex-1 items-center justify-center py-10"
          style={fadeUp(120)}
        >
          <LinkIllustration className="w-full max-w-md" />
        </div>

        <p className="text-sm text-indigo-100" style={fadeUp(240)}>
          Every long link has a short one waiting inside it.
        </p>
      </div>

      {/* Mobile-only compact header (brand panel is hidden below lg) */}
      <div className="flex items-center gap-2 bg-indigo-600 px-6 py-6 lg:hidden">
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
          <Link2 className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-bold text-white">Zippy</span>
      </div>

      {/* Right: form panel */}
      <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16 lg:py-14">
        <div className="w-full max-w-md" style={fadeUp(120)}>
          <h2 className="text-2xl font-bold text-slate-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Already have one?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Log in
            </a>
          </p>

          {submitted ? (
            <div
              className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 p-5 text-center"
              style={{ animation: "zippy-pop 0.4s ease" }}
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <p className="mt-3 font-medium text-slate-900">Account created</p>
              <p className="mt-1 text-sm text-slate-500">
                Welcome to Zippy, {form.name.split(" ")[0]}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              <Field
                label="Name"
                required
                error={errors.name}
                delay={160}
                mounted={mounted}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Sayandip paul"
                  className={inputClass(errors.name)}
                />
              </Field>

              <Field
                label="Email"
                required
                error={errors.email}
                delay={200}
                mounted={mounted}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@domain.com"
                  className={inputClass(errors.email)}
                />
              </Field>

              <Field
                label="Password"
                required
                error={errors.password}
                delay={240}
                mounted={mounted}
              >
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={update("password")}
                    placeholder="At least 8 characters"
                    className={`${inputClass(errors.password)} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </Field>

              <Field
                label="Confirm password"
                required
                error={errors.confirmPassword}
                delay={280}
                mounted={mounted}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={update("confirmPassword")}
                  placeholder="Type it again"
                  className={inputClass(errors.confirmPassword)}
                />
              </Field>

              <div style={fadeUp(320)}>
                <label className="flex items-start gap-2.5 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreed}
                    onChange={update("agreed")}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:ring-offset-0"
                  />
                  <span>
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.agreed && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.agreed}</p>
                )}
              </div>

              <button
                type="submit"
                style={fadeUp(360)}
                className="w-full rounded-lg bg-indigo-600 py-4 text-base font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.99]"
              >
                Create account
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes zippy-pop {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function LinkIllustration({ className }) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      className={className}
      role="img"
      aria-label="Illustration of a long URL turning into a short link"
    >
      <rect
        x="20"
        y="40"
        width="230"
        height="46"
        rx="23"
        fill="white"
        fillOpacity="0.12"
      />
      <rect
        x="40"
        y="58"
        width="150"
        height="10"
        rx="5"
        fill="white"
        fillOpacity="0.5"
      />

      <rect
        x="60"
        y="110"
        width="230"
        height="46"
        rx="23"
        fill="white"
        fillOpacity="0.12"
      />
      <rect
        x="80"
        y="128"
        width="110"
        height="10"
        rx="5"
        fill="white"
        fillOpacity="0.5"
      />

      <path
        d="M110 168 C 110 210, 170 210, 200 232"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
        fill="none"
      />

      <g transform="translate(150 232)">
        <rect x="-90" y="-30" width="180" height="60" rx="30" fill="white" />
        <g
          transform="translate(-64 -12)"
          stroke="#4F46E5"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M8 12 a8 8 0 0 1 0 -16 h8 a8 8 0 0 1 0 16" fill="none" />
          <path d="M16 12 h8 a8 8 0 0 0 0 -16 h-8" fill="none" />
        </g>
        <rect
          x="-38"
          y="-6"
          width="96"
          height="12"
          rx="6"
          fill="#4F46E5"
          fillOpacity="0.85"
        />
      </g>

      <circle cx="330" cy="70" r="26" fill="white" fillOpacity="0.1" />
      <circle cx="350" cy="230" r="16" fill="white" fillOpacity="0.15" />
      <circle cx="40" cy="260" r="10" fill="white" fillOpacity="0.2" />
    </svg>
  );
}

function inputClass(error) {
  return `w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
  }`;
}

function Field({ label, required, error, children, delay, mounted }) {
  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
