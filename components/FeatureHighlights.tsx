import { Dumbbell, Utensils, LineChart } from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Custom Iron",
    desc: "Heavy workout routines & progressive overload tracking.",
  },
  {
    icon: Utensils,
    title: "Anabolic Meals",
    desc: "High-protein nutrition plans & surplus tracking.",
  },
  {
    icon: LineChart,
    title: "Data Trk",
    desc: "Relentless strength metrics & PR history.",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="border-y border-border-steel bg-bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group flex items-center gap-4 px-8 py-8 transition-colors hover:bg-bg-surface sm:px-10"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border-steel bg-bg-elevated text-accent transition-all group-hover:border-accent/50 group-hover:shadow-[0_0_15px_var(--accent-glow)]">
              <f.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-wider text-text-primary">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-text-muted">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
