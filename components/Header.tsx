"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Tracker", href: "#tracker" },
  { label: "Pricing", href: "#pricing" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-base/90 backdrop-blur-md border-b border-border-steel/60"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="flex items-center gap-2 group">
          <Dumbbell className="h-6 w-6 text-accent transition-transform group-hover:rotate-12" />
          <span className="font-display text-xl font-bold tracking-wider text-text-primary">
            Arnold<span className="text-accent">.ai</span>
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-display text-sm font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#pricing"
            className="inline-flex items-center rounded-md border border-accent bg-accent/10 px-5 py-2 font-display text-sm font-semibold uppercase tracking-widest text-accent transition-all hover:bg-accent hover:text-white hover:shadow-[0_0_20px_var(--accent-glow)]"
          >
            Join
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-text-primary"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-steel bg-bg-surface/95 backdrop-blur-md">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 font-display text-sm font-medium uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-md border border-accent bg-accent/10 py-3 text-center font-display text-sm font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-white"
              >
                Join
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
