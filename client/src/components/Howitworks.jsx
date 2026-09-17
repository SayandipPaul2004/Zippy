import { Link2, Sparkles, Share2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Link2,
      title: "Paste your long link",
      description:
        "Drop in any URL — a product page, a doc, a campaign link. No sign-up needed to try it.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "Customize it",
      description:
        "Pick your own slug, add a tag, or set an expiry date. Or just let us generate one instantly.",
    },
    {
      number: "03",
      icon: Share2,
      title: "Share and track",
      description:
        "Send it anywhere. Every click is logged in real time — location, device, and referrer included.",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            Three steps, about ten seconds. That's the whole learning curve.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute right-[-16px] top-6 hidden h-px w-8 bg-slate-200 sm:block" />
              )}
              <span className="text-sm font-medium text-slate-300">
                {step.number}
              </span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#EEF2FF]">
                <step.icon className="h-5 w-5 text-[#2451FF]" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
