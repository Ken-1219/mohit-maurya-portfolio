// Page-level facts. Every string here comes from the Doop frames
// (Home / Desktop v4, Home / Mobile v4) or the Page metadata note.

export const site = {
  name: "Mohit Maurya",
  descriptor:
    "Full stack engineer in Bengaluru. I design systems and build them end to end: architecture, backend, cloud infrastructure and the interface on top.",
  now: "AI Native Engineer, Loylty Rewardz",
  before: "Head of Engineering, ContraVault AI",
  email: "mohitmaurya78871@gmail.com",
  contactLead:
    "Open to connecting about engineering, architecture and interesting problems.",
  colophon: "Bengaluru · IST · 2026",

  // TODO: résumé. Mohit is writing a new one; when the PDF lands, drop it in
  // /public and add { label: "Résumé (PDF)", href: "/<file>.pdf" } to the hero
  // actions below. The Doop frames have the action removed until then.
  heroActions: [{ label: "See my work", href: "#work", tone: "primary" }],

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  social: [
    { label: "github.com/Ken-1219", href: "https://github.com/Ken-1219" },
    {
      label: "linkedin.com/in/mohit-maurya-9a13a222a",
      href: "https://linkedin.com/in/mohit-maurya-9a13a222a",
    },
  ],

  meta: {
    title: "Mohit Maurya · Full stack and AI engineer",
    description:
      "Full stack engineer in Bengaluru, currently at Loylty Rewardz. Previously led engineering at ContraVault AI.",
    canonical: "https://mohitxmaurya.vercel.app",
  },
} as const;

/**
 * The hero portrait is deliberately NOT in this repo — the image file is
 * gitignored. Set NEXT_PUBLIC_PORTRAIT_URL to show it:
 *
 *   NEXT_PUBLIC_PORTRAIT_URL=/mohit-portrait.jpg        (local dev, file in /public)
 *   NEXT_PUBLIC_PORTRAIT_URL=https://host/portrait.jpg  (deployed)
 *
 * A remote host must also be allowed in next.config.ts, which reads the same
 * variable and adds it to images.remotePatterns automatically.
 *
 * With no value set, the hero renders the approved no-portrait layout
 * (Doop frame "Hero / no portrait (v4 option)"), so the site is complete
 * without the photo.
 */
export const portrait = process.env.NEXT_PUBLIC_PORTRAIT_URL
  ? {
      src: process.env.NEXT_PUBLIC_PORTRAIT_URL,
      alt: "Mohit Maurya at his desk",
      width: 1200,
      height: 1500,
    }
  : null;

export const workIndex = [
  {
    n: "01",
    title: "Loylty Rewardz",
    role: "AI Native Engineer",
    years: "2026 — now",
    href: "#loylty-rewardz",
  },
  {
    n: "02",
    title: "ContraVault AI",
    role: "Head of Engineering",
    years: "2024 — 2026",
    href: "#contravault-ai",
  },
  {
    n: "03",
    title: "Yirifi.ai",
    role: "Full Stack Developer",
    years: "2024",
    href: "#yirifi-ai",
  },
  {
    n: "04",
    title: "Side projects",
    role: "Vroom, Descent, Contexto",
    years: "2026",
    href: "#side-projects",
  },
] as const;
