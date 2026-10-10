import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "Free Lifter",
    price: "$0",
    period: "/forever",
    desc: "Start forging the foundation. No card required.",
    features: [
      { text: "3 custom workouts / week", included: true },
      { text: "Basic progress tracker", included: true },
      { text: "Protein logging", included: true },
      { text: "Community access", included: true },
      { text: "AI weight suggestions", included: false },
      { text: "Advanced macro coach", included: false },
      { text: "PR history & analytics", included: false },
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Beast Pro",
    price: "$14",
    period: "/month",
    desc: "Unleash the beast. Everything, analytics, every tool.",
    features: [
      { text: "Unlimited custom workouts", included: true },
      { text: "AI progressive overload engine", included: true },
      { text: "Macro coach & meal plans", included: true },
      { text: "Full PR history & analytics", included: true },
      { text: "AI weight suggestions", included: true },
      { text: "Priority AI coaching insights", included: true },
      { text: "Cancel anytime", included: true },
    ],
    cta: "Go Beast",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <p className="mb-3 font-display text-xs font-medium uppercase tracking-[0.4em] text-accent">
          Pricing
        </p>
        <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-text-primary sm:text-5xl">
          Pick Your Plan
        </h2>
        <p className="mt-4 text-text-muted">
          Start free. Upgrade when you&apos;re ready to level up.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
              tier.highlight
                ? "border-accent bg-bg-elevated shadow-[0_0_40px_rgba(255,69,0,0.15)]"
                : "border-border-steel bg-bg-surface/60 hover:border-accent/40"
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-light px-4 py-1 font-display text-xs font-bold uppercase tracking-widest text-white">
              Most Popular
            </span>
          )}

            <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-text-primary">
              {tier.name}
            </h3>
            <p className="mt-2 text-sm text-text-muted">{tier.desc}</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-extrabold text-text-primary">
                {tier.price}
              </span>
              <span className="text-text-muted">{tier.period}</span>
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  {f.included ? (
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  ) : (
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-text-dim" />
                  )}
                  <span
                    className={f.included ? "text-text-primary" : "text-text-dim"}
                  >
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className={`mt-8 inline-flex w-full items-center justify-center rounded-lg px-6 py-3.5 font-display text-sm font-bold uppercase tracking-widest transition-all ${
                tier.highlight
                  ? "bg-gradient-to-r from-accent to-accent-light text-white shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_var(--accent-glow)]"
                  : "border border-border-steel text-text-primary hover:border-accent hover:text-accent"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
