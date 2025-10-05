import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import CustomCursor from "../components/CustomCursor";
import ParticleBackground from "../components/ParticleBackground";
import FloatingIcons from "../components/FloatingIcons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohit Maurya - Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and AWS. Currently Founding Engineer at ContraVault AI.",
  keywords: [
    "Mohit Maurya",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "TypeScript",
    "JavaScript",
  ],
  authors: [{ name: "Mohit Maurya" }],
  creator: "Mohit Maurya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohitmaurya.dev",
    title: "Mohit Maurya - Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and AWS. Currently Founding Engineer at ContraVault AI.",
    siteName: "Mohit Maurya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Maurya - Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and AWS. Currently Founding Engineer at ContraVault AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ParticleBackground />
        <FloatingIcons />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
