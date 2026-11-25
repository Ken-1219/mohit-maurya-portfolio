import type { NextConfig } from "next";

// The hero portrait is served from a URL, never committed to this repo.
// Whatever host NEXT_PUBLIC_PORTRAIT_URL points at is allowed through
// next/image; a path starting with "/" is local and needs no entry.
const portraitUrl = process.env.NEXT_PUBLIC_PORTRAIT_URL;
const remotePatterns =
  portraitUrl && !portraitUrl.startsWith("/")
    ? (() => {
        const u = new URL(portraitUrl);
        return [
          {
            protocol: u.protocol.replace(":", "") as "http" | "https",
            hostname: u.hostname,
            pathname: "/**",
          },
        ];
      })()
    : [];

const nextConfig: NextConfig = {
  images: { remotePatterns },
};

export default nextConfig;
