import Image from "next/image";
import { site, portrait } from "@/data/site";

export default function Hero() {
  return (
    <div className="band" style={{ paddingTop: "var(--spacing-5xl)" }}>
      <div className="rail">
        <div />
        <div className={portrait ? "hero" : "hero hero--solo"}>
          <div className="col" style={{ gap: "var(--spacing-xl)" }}>
            <h1 className="serif hero__name anim-0">{site.name}</h1>
            <p className="lead anim-1" style={{ maxWidth: "620px" }}>
              {site.descriptor}
            </p>
            <div
              className="col anim-2"
              style={{
                gap: "var(--spacing-xs)",
                paddingTop: "var(--spacing-xs)",
              }}
            >
              <span className="label">
                <span className="label--blue">Now</span> · {site.now}
              </span>
              <span className="label">Before · {site.before}</span>
            </div>
            <div
              className="anim-2"
              style={{
                display: "flex",
                gap: "var(--spacing-xl)",
                alignItems: "flex-start",
                paddingTop: "var(--spacing-sm)",
              }}
            >
              {site.heroActions.map((a) => (
                <a key={a.href} className="act" href={a.href} data-tone={a.tone}>
                  <span className="act__t">{a.label}</span>
                  <span className="act__r" />
                </a>
              ))}
            </div>
          </div>
          {portrait && (
            <Image
              className="hero__img anim-fade"
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              sizes="(max-width: 599px) 100vw, (max-width: 1023px) 280px, 340px"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
