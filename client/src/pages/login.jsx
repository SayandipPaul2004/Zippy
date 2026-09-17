import { useState } from "react";
import { Link2, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden overflow-hidden bg-[#4338EC] lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <Link2 className="h-5 w-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-semibold text-white">Zippy</span>
        </div>

        {/* Decorative illustration */}
        <div className="relative flex flex-1 items-center justify-center">
          <span className="absolute right-12 top-10 h-16 w-16 rounded-full bg-white/10" />
          <span className="absolute bottom-24 left-4 h-6 w-6 rounded-full bg-white/10" />
          <span className="absolute bottom-40 right-16 h-10 w-10 rounded-full bg-white/10" />

          <div className="space-y-6">
            <div className="flex h-16 w-96 max-w-full items-center rounded-2xl bg-white/10 px-6">
              <div className="h-2.5 w-2/3 rounded-full bg-white/30" />
            </div>
            <div className="ml-12 flex h-16 w-80 max-w-full items-center rounded-2xl bg-white/10 px-6">
              <div className="h-2.5 w-1/2 rounded-full bg-white/30" />
            </div>
            <div className="relative ml-6">
              <svg
                className="absolute -top-9 left-16 h-9 w-6 text-white/30"
                viewBox="0 0 24 36"
                fill="none"
              >
                <path
                  d="M2 0v20a4 4 0 0 0 4 4h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>
              <div className="flex h-20 w-72 max-w-full items-center gap-3 rounded-2xl bg-white px-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#4338EC]">
                  <Link2 className="h-4 w-4 text-[#4338EC]" />
                </span>
                <div className="h-2.5 flex-1 rounded-full bg-[#4338EC]/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg text-white/90">
          Every long link has a short one waiting inside it.
        </p>
      </div>

      {/* Mobile-only brand bar (left brand panel is hidden below lg) */}
      <div className="flex items-center gap-3 bg-[#4338EC] px-6 py-6 sm:px-10 lg:hidden">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <Link2 className="h-5 w-5 text-white" strokeWidth={2.5} />
        </span>
        <span className="text-lg font-semibold text-white">Zippy</span>
      </div>

      {/* Right: form panel */}
      <div className="flex flex-col px-6 py-8 sm:px-10 sm:py-12 lg:items-center lg:justify-center lg:px-16 lg:py-16">
        <div className="w-full lg:max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-3 text-[15px] text-slate-500">
            New to Zippy?{" "}
            <a
              href="/signup"
              className="font-medium text-[#4338EC] hover:text-[#372dc7]"
            >
              Create an account
            </a>
          </p>

          <form className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-[15px] font-medium text-slate-900"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@domain.com"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-[#4338EC] focus:outline-none focus:ring-2 focus:ring-[#4338EC]/15"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-[15px] font-medium text-slate-900"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-12 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-[#4338EC] focus:outline-none focus:ring-2 focus:ring-[#4338EC]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[15px]">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#4338EC] focus:ring-[#4338EC]/30"
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="font-medium text-[#4338EC] hover:text-[#372dc7]"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#4338EC] py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#372dc7] hover:shadow-md active:scale-[0.98]"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
