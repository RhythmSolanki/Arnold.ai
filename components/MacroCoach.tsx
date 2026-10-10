"use client";

import { useState, useMemo } from "react";
import { Flame, Target, Activity } from "lucide-react";

type Goal = "cut" | "maintain" | "bulk";
type Activity = "sedentary" | "light" | "moderate" | "heavy";

const activityMultipliers: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  heavy: 1.725,
};

export default function MacroCoach() {
  const [weight, setWeight] = useState(180);
  const [height, setHeight] = useState(70);
  const [age, setAge] = useState(28);
  const [goal, setGoal] = useState<Goal>("bulk");
  const [activity, setActivity] = useState<Activity>("moderate");

  const { calories, protein, carbs, fat } = useMemo(() => {
    const bmr = 10 * (weight * 0.453592) + 6.25 * (height * 2.54) - 5 * age + 5;
    let tdee = bmr * activityMultipliers[activity];
    if (goal === "cut") tdee -= 500;
    if (goal === "bulk") tdee += 350;
    const proteinG = Math.round(weight * 1);
    const fatG = Math.round((tdee * 0.25) / 9);
    const carbsG = Math.round((tdee - proteinG * 4 - fatG * 9) / 4);
    return {
      calories: Math.round(tdee),
      protein: proteinG,
      carbs: carbsG,
      fat: fatG,
    };
  }, [weight, height, age, goal, activity]);

  const macroData = [
    { label: "Protein", value: protein, unit: "g", color: "#FF4500", pct: 35 },
    { label: "Carbs", value: carbs, unit: "g", color: "#FFA500", pct: 45 },
    { label: "Fat", value: fat, unit: "g", color: "#6b7280", pct: 20 },
  ];

  return (
    <section id="tracker" className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-display text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Macro Coach
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-text-primary sm:text-5xl">
            Fuel Your Gains
          </h2>
          <p className="mt-4 text-text-muted">
            Dial in your calories and macros. Your AI nutrition coach, always on call.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border-steel bg-bg-surface/60 p-6 backdrop-blur-md sm:p-8">
            <div className="space-y-6">
              <Slider
                label="Body Weight"
                value={weight}
                min={100}
                max={300}
                unit="lbs"
                onChange={setWeight}
              />
              <Slider
                label="Height"
                value={height}
                min={58}
                max={84}
                unit="in"
                onChange={setHeight}
              />
              <Slider
                label="Age"
                value={age}
                min={16}
                max={65}
                unit="yrs"
                onChange={setAge}
              />

              <div>
                <label className="mb-2 block font-display text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Goal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["cut", "maintain", "bulk"] as Goal[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`rounded-lg border px-3 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-all ${
                        goal === g
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border-steel text-text-muted hover:border-accent/50 hover:text-text-primary"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block font-display text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Activity Level
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(Object.keys(activityMultipliers) as Activity[]).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setActivity(a)}
                      className={`rounded-lg border px-2 py-2.5 font-display text-[10px] font-bold uppercase tracking-wider transition-all ${
                        activity === a
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border-steel text-text-muted hover:border-accent/50 hover:text-text-primary"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-2xl border border-accent/30 bg-gradient-to-br from-bg-surface to-bg-elevated p-6 backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-accent" />
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-text-muted">
                    Daily Calories
                  </span>
                </div>
                <Target className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-4 font-display text-6xl font-extrabold text-text-primary">
                {calories}
              </p>
              <p className="mt-1 text-sm text-text-muted">kcal / day</p>
            </div>

            <div className="rounded-2xl border border-border-steel bg-bg-surface/60 p-6 backdrop-blur-md sm:p-8">
              <div className="mb-5 flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                <span className="font-display text-sm font-bold uppercase tracking-widest text-text-muted">
                  Macro Split
                </span>
              </div>
              <div className="space-y-4">
                {macroData.map((m) => (
                  <div key={m.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-display font-semibold uppercase tracking-wider text-text-primary">
                        {m.label}
                      </span>
                      <span className="font-semibold text-text-muted">
                        {m.value}
                        {m.unit}
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="font-display text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </label>
        <span className="font-display text-sm font-bold text-accent">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-bg-elevated accent-accent"
      />
    </div>
  );
}
