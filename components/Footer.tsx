import { Dumbbell, Share2, Send, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border-steel bg-bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <a href="#" className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-accent" />
              <span className="font-display text-xl font-bold tracking-wider text-text-primary">
                Arnold<span className="text-accent">.ai</span>
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              Build the beast. Heavy lifting, anabolic fuel, relentless progress.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <a
                href="#programs"
                className="font-display text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
              >
                Programs
              </a>
              <a
                href="#tracker"
                className="font-display text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
              >
                Tracker
              </a>
              <a
                href="#pricing"
                className="font-display text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
              >
                Pricing
              </a>
              <a
                href="#"
                className="font-display text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
              >
                Privacy
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {[Share2, Send, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-steel text-text-muted transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_12px_var(--accent-glow)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border-steel pt-6 text-xs text-text-dim sm:flex-row">
          <p>© 2026 Arnold.ai. All rights reserved.</p>
          <p>Forge greatness. Stay relentless.</p>
        </div>
      </div>
    </footer>
  );
}
