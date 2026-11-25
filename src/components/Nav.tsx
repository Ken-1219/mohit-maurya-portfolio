"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

type Theme = "light" | "dark";

/* ── The clock ──────────────────────────────────────────────────────────────
   Bengaluru time, to the minute. It is external state, not render state, so
   it is read through a store rather than set from an effect. The server
   snapshot is empty: the time cannot be known at build time. */

let formatter: Intl.DateTimeFormat | null = null;
function istNow() {
  formatter ??= new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formatter.format(new Date());
}

const clock = {
  subscribe(onChange: () => void) {
    let last = istNow();
    // Checked four times a minute so the displayed minute is never stale by
    // more than 15s, but a re-render only happens when it actually changes.
    const id = setInterval(() => {
      const next = istNow();
      if (next !== last) {
        last = next;
        onChange();
      }
    }, 15_000);
    return () => clearInterval(id);
  },
  getSnapshot: () => istNow(),
  getServerSnapshot: () => "",
};

/* ── The theme ──────────────────────────────────────────────────────────────
   Also external: it lives in localStorage and in the OS setting. A stored
   choice wins; with none, the system decides. The inline script in layout.tsx
   has already applied it before paint, so this only drives the toggle's
   pressed state. */

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // private browsing: fall through to the system setting
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const theme = {
  subscribe(onChange: () => void) {
    listeners.add(onChange);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", onChange);
    // another tab may change the stored choice
    window.addEventListener("storage", onChange);
    return () => {
      listeners.delete(onChange);
      mq.removeEventListener("change", onChange);
      window.removeEventListener("storage", onChange);
    };
  },
  getSnapshot: readTheme,
  getServerSnapshot: (): Theme | null => null,
};

function choose(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // private browsing: the choice just does not persist
  }
  emit();
}

export default function Nav() {
  const time = useSyncExternalStore(
    clock.subscribe,
    clock.getSnapshot,
    clock.getServerSnapshot,
  );
  const current = useSyncExternalStore(
    theme.subscribe,
    theme.getSnapshot,
    theme.getServerSnapshot,
  );

  return (
    <nav className="nb" aria-label="Primary">
      <span className="nb__name">{site.name}</span>
      <span className="nb__time">
        {time ? `${time} IST · Bengaluru` : "Bengaluru"}
      </span>
      <span className="nb__right">
        {site.nav.map((l) => (
          <a key={l.href} className="nb__l" href={l.href}>
            {l.label}
          </a>
        ))}
        <span className="nb__tog">
          <button
            type="button"
            className="nb__t"
            aria-pressed={current === "light"}
            onClick={() => choose("light")}
          >
            Bond
            <span className="sr-only"> — light theme</span>
          </button>
          <button
            type="button"
            className="nb__t"
            aria-pressed={current === "dark"}
            onClick={() => choose("dark")}
          >
            Carbon
            <span className="sr-only"> — dark theme</span>
          </button>
        </span>
      </span>
    </nav>
  );
}
