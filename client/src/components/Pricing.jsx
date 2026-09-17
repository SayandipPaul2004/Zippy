import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      credits: "50 credits / month",
      description: "For trying things out or light personal use.",
      features: [
        "50 credits every month",
        "1 credit per short link",
        "Basic click analytics",
        "Community support",
      ],
      highlighted: false,
    },
    {
      name: "Growth",
      price: "$12",
      period: "/ month",
      credits: "1,000 credits / month",
      description: "For creators and marketers who share often.",
      features: [
        "1,000 credits every month",
        "Custom slugs & QR codes",
        "Full analytics with export",
        "Unused credits roll over",
        "Priority email support",
      ],
      highlighted: true,
    },
    {
      name: "Scale",
      price: "$39",
      period: "/ month",
      credits: "Unlimited credits",
      description: "For teams running links at volume.",
      features: [
        "Unlimited credits, no cap",
        "Custom domains",
        "Team workspaces & roles",
        "API access & webhooks",
        "Dedicated support",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Simple, credit-based pricing
          </h2>
          <p className="mt-3 text-lg text-slate-500">
            Every action costs a small number of credits — a short link is 1, a
            custom slug is 2, a QR code is 1. Pick the plan that matches how
            much you share.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-[#2451FF] shadow-lg"
                  : "border-slate-200"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-[#2451FF] px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-slate-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-slate-400">{plan.period}</span>
                )}
              </div>
              <p className="mt-1 text-sm font-medium text-[#2451FF]">
                {plan.credits}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2451FF]" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-lg px-5 py-3 text-[15px] font-medium transition-all duration-200 active:scale-[0.98] ${
                  plan.highlighted
                    ? "bg-[#2451FF] text-white hover:bg-[#1d40cc]"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plan.price === "Free" ? "Start for free" : "Choose plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
