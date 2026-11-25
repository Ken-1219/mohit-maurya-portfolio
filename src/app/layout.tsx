import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.canonical),
  title: site.meta.title,
  description: site.meta.description,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: site.meta.canonical,
    siteName: site.meta.title,
    title: site.meta.title,
    description: site.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1EEE8" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1815" },
  ],
};

/**
 * Runs before paint, so a stored theme is applied with no flash of the wrong
 * one. With no stored choice nothing is set and the CSS media query decides.
 * Also marks that script is running, which is what lets the skills grid hide
 * itself before revealing — with JavaScript off it is simply visible.
 */
const boot = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}}catch(e){}document.documentElement.classList.add('js')})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables go on <html>, not <body>: the tokens in globals.css
    // reference them from :root, and a custom property is substituted where it
    // is declared, so --font-serif would otherwise resolve to nothing.
    <html
      lang="en"
      className={`${sourceSerif.variable} ${workSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
