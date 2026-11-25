"use client";

import { useEffect, useRef, useState } from "react";
import { skillCategories, skillNotes } from "@/data/skills";
import Logo from "./Logo";

const DESKTOP_COLS = 7;
const MOBILE_COLS = 4;

/** Cells that exist only to close the grid's hairlines on the last row of a
 *  category. Desktop and phone need different counts, so both are rendered
 *  and CSS shows the right set. */
function pads(n: number) {
  const desktop = (DESKTOP_COLS - 1 - n) % DESKTOP_COLS;
  const mobile = (MOBILE_COLS - (n % MOBILE_COLS)) % MOBILE_COLS;
  return { desktop: desktop < 0 ? 0 : desktop, mobile };
}

export default function Skills() {
  const grid = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    // Reveal once, then stop watching.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Touch has no hover, so a tap toggles the "where I used it" swap.
  const [pressed, setPressed] = useState<string | null>(null);

  let i = 0;

  return (
    <section
      className="band"
      id="skills"
      style={{
        paddingTop: "var(--spacing-5xl)",
        paddingBottom: "var(--spacing-5xl)",
      }}
    >
      <div className="rail">
        <div className="rail__n">
          <span className="label">05 · what I work in</span>
        </div>
        <div className="col" style={{ gap: "var(--spacing-2xl)" }}>
          <h2 className="sr-only">What I work in</h2>
          <div className="skwrap">
            <div
              className="skw"
              ref={grid}
              data-reveal={revealed ? "in" : "pending"}
            >
              {skillCategories.map((cat) => {
                const p = pads(cat.skills.length);
                return (
                  <div key={cat.id} style={{ display: "contents" }}>
                    <span
                      className="c lab"
                      data-c={cat.id}
                      tabIndex={0}
                      style={{ "--i": i++ } as React.CSSProperties}
                    >
                      <span>{cat.label}</span>
                    </span>
                    {cat.skills.map((s) => (
                      <button
                        type="button"
                        key={s.name}
                        className={s.now ? "c s now" : "c s"}
                        data-c={cat.id}
                        data-where={s.where ? "" : undefined}
                        aria-pressed={pressed === s.name}
                        onClick={() =>
                          setPressed((cur) => (cur === s.name ? null : s.name))
                        }
                        style={{ "--i": i++ } as React.CSSProperties}
                      >
                        {s.icon ? (
                          <Logo name={s.icon} wide={s.wide} />
                        ) : (
                          <span className="mg" aria-hidden="true">
                            {s.monogram}
                          </span>
                        )}
                        <b className="nm">{s.name}</b>
                        {s.where && (
                          <b className="wh">
                            <span className="sr-only">{s.name} — used at </span>
                            {s.where}
                          </b>
                        )}
                      </button>
                    ))}
                    {Array.from({ length: p.desktop }, (_, k) => (
                      <span
                        key={`d${k}`}
                        className="c pad pad--d"
                        aria-hidden="true"
                      />
                    ))}
                    {Array.from({ length: p.mobile }, (_, k) => (
                      <span
                        key={`m${k}`}
                        className="c pad pad--m"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="col" style={{ gap: "var(--spacing-xs)" }}>
              <span className="label">{skillNotes.legend}</span>
              {skillNotes.lines.map((l) => (
                <span className="label" key={l.lead}>
                  <span className="label--blue">{l.lead}</span> · {l.rest}
                </span>
              ))}
              <div
                style={{ display: "flex", paddingTop: "var(--spacing-xs)" }}
              >
                <a
                  className="sk__more"
                  href={skillNotes.more.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {skillNotes.more.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
