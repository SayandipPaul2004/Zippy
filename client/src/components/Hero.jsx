import { useState } from "react";
import { Copy, Check, ArrowUpRight, TrendingUp } from "lucide-react";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    const code = Math.random().toString(36).slice(2, 8);
    setShortUrl(`zippy.ly/${code}`);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: copy + demo */}
          <div>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
              Shorten links.
              <br />
              Track everything.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500">
              Turn long, messy URLs into short links you can share anywhere —
              then see exactly who clicked, when, and from where.
            </p>

            {/* Functional demo widget */}
            <form
              onSubmit={handleShorten}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-2"
            >
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a long URL here"
                className="w-full rounded-lg border border-slate-300 px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-[#2451FF] focus:outline-none focus:ring-2 focus:ring-[#2451FF]/20 sm:max-w-sm"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-[#2451FF] px-6 py-3.5 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d40cc] hover:shadow-md active:scale-[0.98]"
              >
                Shorten it
              </button>
            </form>

            {/* Result row */}
            <div
              className={`mt-4 flex items-center gap-3 overflow-hidden transition-all duration-300 ${
                shortUrl ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-[15px]">
                <span className="font-medium text-[#2451FF]">{shortUrl}</span>
                <button
                  onClick={handleCopy}
                  className="ml-1 text-slate-400 transition-colors hover:text-slate-700"
                  aria-label="Copy link"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>No credit card needed</span>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900"
              >
                See how it works
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right: visual mockup */}
          <div className="relative">
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#EEF2FF] blur-3xl" />

            {/* Browser mockup card */}
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              </div>

              <div className="space-y-4 p-6">
                <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-400">
                  https://example.com/products/summer-sale/2026/promo?ref=email&amp;utm_source=newsletter
                </div>

                <div className="flex items-center justify-center py-1">
                  <div className="h-6 w-px bg-slate-200" />
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[#EEF2FF] px-4 py-3">
                  <span className="text-sm font-medium text-[#2451FF]">
                    zippy.ly/summer26
                  </span>
                  <Copy className="h-4 w-4 text-[#2451FF]/60" />
                </div>

                {/* Mini click chart */}
                <div className="pt-2">
                  <p className="mb-3 text-xs font-medium text-slate-400">
                    Clicks this week
                  </p>
                  <div className="flex items-end gap-2">
                    {[40, 65, 45, 80, 60, 95, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-[#2451FF]/15"
                        style={{ height: `${h}px` }}
                      >
                        <div
                          className="h-full w-full rounded-t-sm bg-[#2451FF]"
                          style={{ opacity: 0.15 + h / 130 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat chip */}
            <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  1,204 clicks
                </p>
                <p className="text-xs text-slate-400">in the last 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-8 sm:mt-24 sm:pt-10">
          {[
            { value: "100+", label: "Links shortened" },
            { value: "180ms", label: "Average redirect time" },
            { value: "99.99%", label: "Uptime, every month" },
          ].map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "pl-4 sm:pl-10" : ""}>
              <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
