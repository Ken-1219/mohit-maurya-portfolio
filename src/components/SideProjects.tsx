import Image from "next/image";
import { projects } from "@/data/projects";
import Diagram from "./Diagram";

const Arrow = () => (
  <span className="p4__arw" aria-hidden="true">
    <svg width="30" height="16" viewBox="0 0 30 16" fill="none">
      <path
        d="M0 8h26M21 2.5 26.5 8 21 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  </span>
);

export default function SideProjects() {
  return (
    <section
      className="band band--recess"
      id="side-projects"
      style={{
        paddingTop: "var(--spacing-5xl)",
        paddingBottom: "var(--spacing-5xl)",
      }}
    >
      <div className="rail">
        <div className="rail__n">
          <span className="label">04 · built on my own time</span>
        </div>
        <div className="col" style={{ gap: "var(--spacing-6xl)" }}>
          <h2 className="sr-only">Side projects</h2>
          {projects.map((p) => (
            <article className="p4" key={p.id} data-side={p.side}>
              <div className="p4__vis">
                <a
                  className="p4__shot"
                  href={p.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${p.title} — open the live site`}
                >
                  <Image
                    className="p4__img"
                    src={p.shot.src}
                    alt={p.shot.alt}
                    width={p.shot.width}
                    height={p.shot.height}
                    sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 700px"
                  />
                </a>
                <Diagram kind={p.diagram} />
              </div>
              <div className="p4__txt">
                <span className="p4__y">{p.year}</span>
                <div className="p4__hd">
                  <h3 className="p4__t">{p.title}</h3>
                  <Arrow />
                </div>
                <p className="p4__what">{p.what}</p>
                <p className="p4__dp">{p.hard}</p>
                <span className="p4__s">{p.stack}</span>
                <div className="p4__links">
                  <a
                    className="p4__live"
                    href={p.live}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Live<span className="sr-only"> — {p.title}</span>
                  </a>
                  <a
                    className="p4__code"
                    href={p.code}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Code<span className="sr-only"> — {p.title} on GitHub</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
