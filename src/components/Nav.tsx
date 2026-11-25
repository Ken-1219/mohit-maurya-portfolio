"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/** Bengaluru time, to the minute. */
function istNow() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function Nav() {
  // Rendered empty on the server: the clock would otherwise disagree with the
  // client and the whole nav would have to be suppressed from hydration.
  const [time, setTime] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTime(istNow());
    const id = setInterval(() => setTime(istNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
  }, []);

  function choose(next: "light" | "dark") {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // private browsing: the choice just does not persist
    }
  }

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
            aria-pressed={theme === "light"}
            onClick={() => choose("light")}
          >
            Bond
            <span className="sr-only"> — light theme</span>
          </button>
          <button
            type="button"
            className="nb__t"
            aria-pressed={theme === "dark"}
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
