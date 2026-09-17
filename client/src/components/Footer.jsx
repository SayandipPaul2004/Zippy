import { Link2, ArrowRight } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const linkColumns = [
    {
      heading: "Product",
      links: ["Features", "Pricing", "API", "Integrations"],
    },
    {
      heading: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
    },
    {
      heading: "Resources",
      links: ["Documentation", "Help center", "Status", "Changelog"],
    },
    {
      heading: "Legal",
      links: ["Privacy policy", "Terms of service", "Security"],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Top: brand + newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-slate-900">Zippy</span>
            </div>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Turn long, messy URLs into short links you can share anywhere —
              then see exactly who clicked, when, and from where.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[320px]">
            <p className="text-sm font-medium text-slate-900">
              Get product updates
            </p>
            <p className="mt-1 text-sm text-slate-500">
              One email a month. No spam, ever.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 min-w-0 px-4 py-2.5 text-sm rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Join
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-10 border-t border-slate-200">
          {linkColumns.map((column) => (
            <div key={column.heading}>
              <p className="text-sm font-medium text-slate-900">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            © 2026 Zippy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Zippy on GitHub"
              className="text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="#"
              aria-label="Zippy on Twitter"
              className="text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <Twitter className="w-4.5 h-4.5" />
            </a>
            <a
              href="#"
              aria-label="Zippy on LinkedIn"
              className="text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
