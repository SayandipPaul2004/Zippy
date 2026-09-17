import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-slate-900 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Your first link takes ten seconds.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-slate-400">
          Free to start, no credit card required. Upgrade only when you're
          sharing enough to need it.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#2451FF] px-7 py-3.5 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#3563ff] hover:shadow-md active:scale-[0.98]">
            Create your first link
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#pricing"
            className="text-[15px] font-medium text-slate-300 transition-colors hover:text-white"
          >
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}
