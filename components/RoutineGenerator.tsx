"use client";

import { useState } from "react";
import {
  Dumbbell,
  TrendingUp,
  Flame,
  Zap,
  Loader2,
  ChevronRight,
  Sparkles,
  Target,
  Calendar,
  Wrench,
  Award,
  RotateCcw,
} from "lucide-react";

type Goal =
  | "Hypertrophy (Mass)"
  | "Pure Strength (Power)"
  | "Cut & Conditioning"
  | "Athletic Performance";

type Experience =
  | "Beginner (<1 yr)"
  | "Intermediate (1–3 yrs)"
  | "Advanced Lifter (3+ yrs)";

type Frequency = "3 Days" | "4 Days" | "5 Days" | "6 Days";

type Equipment =
  | "Commercial Gym (Full Iron)"
  | "Barbells & Dumbbells Only"
  | "Home Gym / Calisthenics";

const goals: Goal[] = [
  "Hypertrophy (Mass)",
  "Pure Strength (Power)",
  "Cut & Conditioning",
  "Athletic Performance",
];

const experiences: Experience[] = [
  "Beginner (<1 yr)",
  "Intermediate (1–3 yrs)",
  "Advanced Lifter (3+ yrs)",
];

const frequencies: Frequency[] = ["3 Days", "4 Days", "5 Days", "6 Days"];

const equipments: Equipment[] = [
  "Commercial Gym (Full Iron)",
  "Barbells & Dumbbells Only",
  "Home Gym / Calisthenics",
];

type Exercise = {
  name: string;
  sets: number;
  reps: string;
};

type DayPlan = {
  day: string;
  focus: string;
  exercises: Exercise[];
};

type RoutineResult = {
  splitName: string;
  tagline: string;
  days: DayPlan[];
  overload: {
    progression: string;
    deload: string;
    volume: string;
  };
};

const goalConfig: Record<Goal, { sets: [number, number]; reps: string; rest: string }> = {
  "Hypertrophy (Mass)": { sets: [3, 4], reps: "8-12", rest: "60-90s" },
  "Pure Strength (Power)": { sets: [4, 5], reps: "3-6", rest: "2-3 min" },
  "Cut & Conditioning": { sets: [3, 4], reps: "12-15", rest: "45-60s" },
  "Athletic Performance": { sets: [3, 4], reps: "6-10", rest: "90-120s" },
};

const splits: Record<Frequency, string> = {
  "3 Days": "Full Body",
  "4 Days": "Upper / Lower",
  "5 Days": "Upper / Lower / Push / Pull / Legs",
  "6 Days": "Push / Pull / Legs (2x)",
};

function pickExercises(
  goal: Goal,
  experience: Experience,
  equipment: Equipment,
  focus: string,
): Exercise[] {
  const cfg = goalConfig[goal];
  const sets = experience === "Beginner (<1 yr)" ? cfg.sets[0] : cfg.sets[1];

  const library: Record<string, Exercise[]> = {
    Push: [
      { name: "Barbell Bench Press", sets, reps: cfg.reps },
      { name: "Incline Dumbbell Press", sets, reps: cfg.reps },
      { name: "Overhead Press", sets, reps: cfg.reps },
      { name: "Cable Lateral Raises", sets: 3, reps: "12-15" },
      { name: "Tricep Pushdowns", sets: 3, reps: "12-15" },
    ],
    Pull: [
      { name: "Deadlift", sets, reps: cfg.reps },
      { name: "Weighted Pull-Ups", sets, reps: cfg.reps },
      { name: "Barbell Row", sets, reps: cfg.reps },
      { name: "Face Pulls", sets: 3, reps: "15-20" },
      { name: "Barbell Curls", sets: 3, reps: "10-12" },
    ],
    Legs: [
      { name: "Back Squat", sets, reps: cfg.reps },
      { name: "Romanian Deadlift", sets, reps: cfg.reps },
      { name: "Leg Press", sets, reps: cfg.reps },
      { name: "Walking Lunges", sets: 3, reps: "12/leg" },
      { name: "Calf Raises", sets: 4, reps: "15-20" },
    ],
    Upper: [
      { name: "Barbell Bench Press", sets, reps: cfg.reps },
      { name: "Weighted Pull-Ups", sets, reps: cfg.reps },
      { name: "Overhead Press", sets, reps: cfg.reps },
      { name: "Barbell Row", sets, reps: cfg.reps },
      { name: "Lateral Raises", sets: 3, reps: "12-15" },
      { name: "Tricep Pushdowns", sets: 3, reps: "12-15" },
      { name: "Barbell Curls", sets: 3, reps: "10-12" },
    ],
    Lower: [
      { name: "Back Squat", sets, reps: cfg.reps },
      { name: "Romanian Deadlift", sets, reps: cfg.reps },
      { name: "Leg Press", sets, reps: cfg.reps },
      { name: "Walking Lunges", sets: 3, reps: "12/leg" },
      { name: "Calf Raises", sets: 4, reps: "15-20" },
    ],
    "Full Body": [
      { name: "Back Squat", sets, reps: cfg.reps },
      { name: "Barbell Bench Press", sets, reps: cfg.reps },
      { name: "Weighted Pull-Ups", sets, reps: cfg.reps },
      { name: "Overhead Press", sets, reps: cfg.reps },
      { name: "Barbell Row", sets, reps: cfg.reps },
      { name: "Plank", sets: 3, reps: "45-60s" },
    ],
  };

  let list = library[focus] ?? library["Full Body"];

  if (experience === "Beginner (<1 yr)") {
    list = list.slice(0, Math.min(4, list.length));
  }

  if (equipment === "Barbells & Dumbbells Only") {
    list = list.filter(
      (e) =>
        !e.name.includes("Cable") &&
        !e.name.includes("Leg Press") &&
        !e.name.includes("Machine"),
    );
  }

  if (equipment === "Home Gym / Calisthenics") {
    const homeMap: Record<string, Exercise> = {
      "Barbell Bench Press": { name: "Push-Ups (weighted)", sets, reps: cfg.reps },
      "Incline Dumbbell Press": { name: "Dumbbell Floor Press", sets, reps: cfg.reps },
      "Overhead Press": { name: "Dumbbell Shoulder Press", sets, reps: cfg.reps },
      "Weighted Pull-Ups": { name: "Pull-Ups", sets, reps: cfg.reps },
      "Barbell Row": { name: "Dumbbell Row", sets, reps: cfg.reps },
      "Back Squat": { name: "Goblet Squats", sets, reps: cfg.reps },
      "Romanian Deadlift": { name: "Dumbbell RDL", sets, reps: cfg.reps },
      "Deadlift": { name: "Dumbbell Deadlift", sets, reps: cfg.reps },
      "Walking Lunges": { name: "Reverse Lunges", sets: 3, reps: "12/leg" },
      "Leg Press": { name: "Bulgarian Split Squats", sets: 3, reps: "10/leg" },
      "Cable Lateral Raises": { name: "Dumbbell Lateral Raises", sets: 3, reps: "12-15" },
      "Lateral Raises": { name: "Dumbbell Lateral Raises", sets: 3, reps: "12-15" },
      "Tricep Pushdowns": { name: "Diamond Push-Ups", sets: 3, reps: "12-15" },
      "Barbell Curls": { name: "Dumbbell Curls", sets: 3, reps: "10-12" },
      "Face Pulls": { name: "Band Pull-Aparts", sets: 3, reps: "15-20" },
      "Calf Raises": { name: "Bodyweight Calf Raises", sets: 4, reps: "15-20" },
      "Plank": { name: "Plank", sets: 3, reps: "45-60s" },
    };
    list = list.map((e) => homeMap[e.name] ?? e);
  }

  return list;
}

function generateRoutine(
  goal: Goal,
  experience: Experience,
  frequency: Frequency,
  equipment: Equipment,
): RoutineResult {
  const splitName = splits[frequency];

  let dayFocuses: { day: string; focus: string }[] = [];

  if (frequency === "3 Days") {
    dayFocuses = [
      { day: "Day 1", focus: "Full Body" },
      { day: "Day 2", focus: "Full Body" },
      { day: "Day 3", focus: "Full Body" },
    ];
  } else if (frequency === "4 Days") {
    dayFocuses = [
      { day: "Day 1", focus: "Upper" },
      { day: "Day 2", focus: "Lower" },
      { day: "Day 3", focus: "Upper" },
      { day: "Day 4", focus: "Lower" },
    ];
  } else if (frequency === "5 Days") {
    dayFocuses = [
      { day: "Day 1", focus: "Upper" },
      { day: "Day 2", focus: "Lower" },
      { day: "Day 3", focus: "Push" },
      { day: "Day 4", focus: "Pull" },
      { day: "Day 5", focus: "Legs" },
    ];
  } else {
    dayFocuses = [
      { day: "Day 1", focus: "Push" },
      { day: "Day 2", focus: "Pull" },
      { day: "Day 3", focus: "Legs" },
      { day: "Day 4", focus: "Push" },
      { day: "Day 5", focus: "Pull" },
      { day: "Day 6", focus: "Legs" },
    ];
  }

  const days: DayPlan[] = dayFocuses.map((d) => ({
    day: d.day,
    focus: d.focus,
    exercises: pickExercises(goal, experience, equipment, d.focus),
  }));

  const experienceFactor =
    experience === "Beginner (<1 yr)"
      ? "2.5-5 lbs / week on compounds"
      : experience === "Intermediate (1–3 yrs)"
        ? "1.5-2.5 lbs / week on compounds"
        : "0.5-1.5 lbs / week on compounds (or +1 rep when stalled)";

  const taglineMap: Record<Goal, string> = {
    "Hypertrophy (Mass)": "Volume-driven hypertrophy block optimized for muscle growth.",
    "Pure Strength (Power)": "Low-rep, high-intensity block built for raw power and 1RM gains.",
    "Cut & Conditioning": "Higher-rep metabolic block to shred fat while preserving muscle.",
    "Athletic Performance": "Explosive, functional block built for speed, power, and athleticism.",
  };

  return {
    splitName,
    tagline: taglineMap[goal],
    days,
    overload: {
      progression: experienceFactor,
      deload: "Deload every 6-8 weeks: 50% volume, 60% intensity.",
      volume:
        experience === "Beginner (<1 yr)"
          ? "10-14 working sets / muscle group / week"
          : experience === "Intermediate (1–3 yrs)"
            ? "14-18 working sets / muscle group / week"
            : "18-22 working sets / muscle group / week",
    },
  };
}

export default function RoutineGenerator() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoutineResult | null>(null);

  const allSelected = goal && experience && frequency && equipment;

  const handleGenerate = () => {
    if (!allSelected) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = generateRoutine(goal, experience, frequency, equipment);
      setResult(r);
      setLoading(false);
    }, 1600);
  };

  const handleReset = () => {
    setGoal(null);
    setExperience(null);
    setFrequency(null);
    setEquipment(null);
    setResult(null);
  };

  return (
    <section id="programs" className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-display text-xs font-medium uppercase tracking-[0.4em] text-accent">
            AI Workout Generator
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-text-primary sm:text-5xl">
            Dial in Your Routine
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            Tell Arnold.ai your target, experience, and schedule to calculate your optimal split and progressive overload baseline.
          </p>
        </div>

        <div className="rounded-2xl border border-border-steel bg-bg-surface/60 backdrop-blur-md">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
            <SelectGroup
              label="Fitness Goal"
              icon={Target}
              options={goals}
              value={goal}
              onChange={(v) => setGoal(v as Goal)}
            />
            <SelectGroup
              label="Experience Level"
              icon={Award}
              options={experiences}
              value={experience}
              onChange={(v) => setExperience(v as Experience)}
            />
            <SelectGroup
              label="Weekly Frequency"
              icon={Calendar}
              options={frequencies}
              value={frequency}
              onChange={(v) => setFrequency(v as Frequency)}
            />
            <SelectGroup
              label="Equipment Access"
              icon={Wrench}
              options={equipments}
              value={equipment}
              onChange={(v) => setEquipment(v as Equipment)}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 border-t border-border-steel px-6 py-6 sm:flex-row sm:px-8">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!allSelected || loading}
              className={`group relative inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 font-display text-sm font-bold uppercase tracking-widest transition-all sm:w-auto ${
                allSelected && !loading
                  ? "bg-gradient-to-r from-accent to-accent-light text-white shadow-[0_0_25px_var(--accent-glow)] hover:scale-[1.02] hover:shadow-[0_0_40px_var(--accent-glow)]"
                  : "cursor-not-allowed bg-bg-elevated text-text-dim"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Your Routine
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Generate My Routine
                </>
              )}
            </button>

            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-border-steel px-5 py-3 font-display text-xs font-semibold uppercase tracking-widest text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            )}
          </div>

          {!allSelected && !result && (
            <p className="pb-6 text-center text-xs text-text-dim">
              Select all four options above to unlock your custom routine.
            </p>
          )}
        </div>

        {result && (
          <div className="mt-10 animate-fade-up">
            <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-accent/40 bg-gradient-to-r from-bg-elevated to-bg-surface p-6 sm:flex-row">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-accent">
                    Your Custom Split
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight text-text-primary sm:text-3xl">
                  {result.splitName}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{result.tagline}</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3">
                <Flame className="h-5 w-5 text-accent" />
                <span className="font-display text-sm font-bold uppercase tracking-wider text-accent">
                  {frequency}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {result.days.map((day) => (
                <div
                  key={day.day}
                  className="overflow-hidden rounded-2xl border border-border-steel bg-bg-surface/60 backdrop-blur-md transition-colors hover:border-accent/40"
                >
                  <div className="flex items-center justify-between border-b border-border-steel px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 font-display text-sm font-bold text-accent">
                        {day.day.split(" ")[1]}
                      </span>
                      <h4 className="font-display text-lg font-bold uppercase tracking-wide text-text-primary">
                        {day.focus}
                      </h4>
                    </div>
                    <span className="hidden items-center gap-1 rounded-md border border-border-steel px-3 py-1 text-xs text-text-muted sm:inline-flex">
                      {day.exercises.length} exercises
                    </span>
                  </div>
                  <ul className="divide-y divide-border-steel">
                    {day.exercises.map((ex, i) => (
                      <li
                        key={ex.name}
                        className="flex flex-col gap-2 px-6 py-4 transition-colors hover:bg-bg-elevated/50 sm:flex-row sm:items-center sm:gap-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-steel font-display text-xs font-bold text-text-muted">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <h5 className="font-display text-sm font-bold uppercase tracking-wide text-text-primary">
                            {ex.name}
                          </h5>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="rounded-md bg-bg-elevated px-3 py-1.5 text-xs font-semibold text-text-muted">
                            {ex.sets} × {ex.reps}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <InfoCard
                icon={TrendingUp}
                title="Progression"
                value={result.overload.progression}
              />
              <InfoCard
                icon={Dumbbell}
                title="Volume"
                value={result.overload.volume}
              />
              <InfoCard
                icon={RotateCcw}
                title="Deload"
                value={result.overload.deload}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-light px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_25px_var(--accent-glow)] transition-all hover:scale-105 hover:shadow-[0_0_40px_var(--accent-glow)]"
              >
                Start Training Now
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SelectGroup({
  label,
  icon: Icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: React.ElementType;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-3 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-widest text-text-muted">
        <Icon className="h-4 w-4 text-accent" />
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-lg border px-4 py-3 text-left font-display text-xs font-semibold uppercase tracking-wide transition-all ${
                selected
                  ? "border-accent bg-accent/15 text-accent shadow-[0_0_15px_var(--accent-glow)]"
                  : "border-border-steel bg-bg-elevated/50 text-text-muted hover:border-accent/50 hover:text-text-primary"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border-steel bg-bg-surface/60 p-5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <span className="font-display text-xs font-bold uppercase tracking-widest text-text-muted">
          {title}
        </span>
      </div>
      <p className="mt-3 text-sm text-text-primary">{value}</p>
    </div>
  );
}
