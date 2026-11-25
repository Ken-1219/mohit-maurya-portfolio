import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main
      className="band"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--spacing-5xl)",
        paddingBottom: "var(--spacing-5xl)",
      }}
    >
      <div className="rail" style={{ width: "100%" }}>
        <div className="rail__n">
          <span className="label">404</span>
        </div>
        <div className="col" style={{ gap: "var(--spacing-xl)" }}>
          <h1 className="serif job__name">Not found</h1>
          <p className="lead" style={{ maxWidth: "52ch" }}>
            There is nothing at this address. The site is a single page.
          </p>
          <div style={{ display: "flex" }}>
            <Link className="act" href="/">
              <span className="act__t">Back to the start</span>
              <span className="act__r" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
