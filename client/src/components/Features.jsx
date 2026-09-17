import {
  BarChart3,
  QrCode,
  Clock,
  Users,
  Code2,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description:
      "See clicks as they happen, broken down by location, device, and referring source.",
  },
  {
    icon: QrCode,
    title: "QR codes, built in",
    description:
      "Every short link comes with a downloadable QR code — no separate tool needed.",
  },
  {
    icon: Clock,
    title: "Scheduling & expiry",
    description:
      "Set a link to go live later, or expire automatically after a date or click count.",
  },
  {
    icon: Users,
    title: "Team workspaces",
    description:
      "Share link folders with your team and see who created or edited what.",
  },
  {
    icon: Code2,
    title: "Developer API",
    description:
      "Create and manage links programmatically with a simple REST API and webhooks.",
  },
  {
    icon: ShieldCheck,
    title: "Safe by default",
    description:
      "Every destination is scanned for malware and phishing before the link goes live.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Built for people who share a lot of links — creators, marketers, and
            teams that need to know what&apos;s working.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Icon className="h-5 w-5 text-blue-600" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
