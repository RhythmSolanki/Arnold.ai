export default function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-10 text-center lg:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[60 w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <p className="mb-6 font-display text-xs font-medium uppercase tracking-[0.4em] text-accent">
        AI-Powered Strength
      </p>

      <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-7xl lg:text-8xl">
        <span className="bg-gradient-to-b from-text-primary via-text-primary to-text-dim bg-clip-text text-transparent">
          Build the Beast.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-base text-text-muted sm:text-lg">
        Your AI partner for heavy lifting, meal plans, and relentless progress.
      </p>

      <div className="mt-10">
        <a
          href="#pricing"
          className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-light px-10 py-4 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_var(--accent-glow)] transition-all hover:scale-105 hover:shadow-[0_0_45px_var(--accent-glow)]"
        >
          Get Started
          <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
        </a>
      </div>
    </section>
  );
}
