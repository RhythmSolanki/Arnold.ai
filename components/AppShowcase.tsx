"use client";

import { Dumbbell, Flame, TrendingUp, MoreHorizontal } from "lucide-react";

export default function AppShowcase() {
  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 md:flex-row md:items-end md:gap-8">
        <DailyLiftCard />
        <FuelCard />
        <ProgressCard />
      </div>
    </section>
  );
}

function CardShell({
  children,
  elevated = false,
}: {
  children: React.ReactNode;
  elevated?: boolean;
}) {
  return (
    <div
      className={`relative w-full max-w-[280px] overflow-hidden rounded-2xl border border-border-steel bg-bg-surface/80 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:-translate-y-1 ${
        elevated
          ? "md:-translate-y-6 md:scale-105 shadow-[0_0_40px_rgba(255,69,0,0.15)]"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <h3 className="font-display text-sm font-bold uppercase tracking-widest text-text-primary">
          {title}
        </h3>
      </div>
      <button
        type="button"
        aria-label="More options"
        className="text-text-dim hover:text-accent"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}

function DailyLiftCard() {
  return (
    <CardShell>
      <CardHeader title="Daily Lift" icon={Dumbbell} />
      <div className="px-5 pb-6 pt-4">
        <div className="flex flex-col items-center">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#262930"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#gauge-grad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${0.78 * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
              />
              <defs>
                <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-bold text-text-primary">
                78%
              </span>
              <span className="text-[10px] uppercase tracking-wider text-text-muted">
                Sets Done
              </span>
            </div>
          </div>
          <div className="mt-4 w-full rounded-lg border border-border-steel bg-bg-elevated px-4 py-3 text-center">
            <p className="font-display text-base font-bold uppercase tracking-wide text-text-primary">
              Bench Press
            </p>
            <p className="text-sm font-semibold text-accent">5 x 5</p>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function FuelCard() {
  const macros = [
    { label: "Protein", value: 165, target: 180, color: "#FF4500" },
    { label: "Carbs", value: 240, target: 300, color: "#FFA500" },
    { label: "Fat", value: 55, target: 70, color: "#6b7280" },
  ];

  return (
    <CardShell elevated>
      <CardHeader title="Fuel" icon={Flame} />
      <div className="px-5 pb-6 pt-4">
        <div className="flex flex-col items-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/5">
            <Flame className="h-10 w-10 text-accent" />
            <span className="absolute -bottom-1 rounded-full bg-bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
              Iron
            </span>
          </div>
          <p className="mt-4 font-display text-lg font-bold text-text-primary">
            Protein Check
          </p>
          <p className="text-xs text-text-muted">
            165g of 180g target
          </p>
        </div>
        <div className="mt-5 space-y-3">
          {macros.map((m) => (
            <div key={m.label}>
              <div className="mb-1 flex justify-between text-[11px] uppercase tracking-wider">
                <span className="text-text-muted">{m.label}</span>
                <span className="font-semibold text-text-primary">
                  {m.value}/{m.target}g
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min((m.value / m.target) * 100, 100)}%`,
                    backgroundColor: m.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

function ProgressCard() {
  const points = [10, 14, 12, 18, 16, 22, 20, 28, 26, 34, 30, 40];
  const max = Math.max(...points);
  const w = 220;
  const h = 90;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - (p / max) * (h - 10) - 5;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <CardShell>
      <CardHeader title="Progress" icon={TrendingUp} />
      <div className="px-5 pb-6 pt-4">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-text-primary">
              +24%
            </p>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              12-Week Strength
            </p>
          </div>
          <span className="rounded-md bg-accent/10 px-2 py-1 text-[10px] font-bold uppercase text-accent">
            Overload
          </span>
        </div>
        <div className="mt-4 w-full overflow-hidden rounded-lg border border-border-steel bg-bg-elevated p-2">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="h-24 w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="spark-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF4500" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#spark-area)" />
            <path
              d={path}
              fill="none"
              stroke="#FF4500"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-text-dim">
          <span>W1</span>
          <span>W6</span>
          <span>W12</span>
        </div>
      </div>
    </CardShell>
  );
}
