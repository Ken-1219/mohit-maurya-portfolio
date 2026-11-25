"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // clipboard refused: the address is on screen and selectable anyway
    }
  }

  return (
    <section
      className="band band--inv"
      id="contact"
      style={{
        paddingTop: "var(--spacing-5xl)",
        paddingBottom: "var(--spacing-5xl)",
      }}
    >
      <div className="rail">
        <div className="rail__n">
          <span className="label">07 · contact</span>
        </div>
        <div className="col" style={{ gap: "var(--spacing-xl)" }}>
          <h2 className="sr-only">Contact</h2>
          <span className="label" aria-hidden="true">
            {copied ? "Copied" : "Click to copy"}
          </span>
          <button type="button" className="mail" onClick={copy}>
            {site.email}
            <span className="sr-only">
              {copied ? " — copied to clipboard" : " — copy to clipboard"}
            </span>
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
          <p
            style={{
              fontSize: "var(--text-value)",
              lineHeight: "var(--leading-lead)",
              color: "var(--color-inv-ink-2)",
            }}
          >
            {site.contactLead}
          </p>
          <div className="social">
            {site.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener me"
              >
                {s.label}
              </a>
            ))}
          </div>
          <span className="label colophon">{site.colophon}</span>
        </div>
      </div>
    </section>
  );
}
