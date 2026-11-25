import type { Job } from "@/data/employers";

/**
 * One job: marker in the rail, the employer in display serif, the role column,
 * a ruled list of points and the stack line. Loylty Rewardz and ContraVault AI
 * are the same shape in the frames, so they are the same component; the only
 * difference is the inverted band, which the tokens handle.
 */
export default function JobSection({ job }: { job: Job }) {
  return (
    <section
      className={job.inverted ? "band band--inv" : "band"}
      id={job.id}
      style={{
        paddingTop: "var(--spacing-4xl)",
        paddingBottom: job.inverted
          ? "var(--spacing-4xl)"
          : "var(--spacing-5xl)",
      }}
    >
      <div className="rail">
        <div className="rail__n">
          <span className="label">{job.marker}</span>
        </div>
        <div className="col" style={{ gap: "var(--spacing-xl)" }}>
          <div className="job__hd">
            <div className="col" style={{ gap: "var(--spacing-md)" }}>
              <h2 className="serif job__name">{job.name}</h2>
              <p className="read" style={{ maxWidth: "58ch" }}>
                {job.summary}
              </p>
            </div>
            <div className="job__meta">
              <span className="label label--blue">{job.role}</span>
              <span className="label">{job.dates}</span>
              <span className="label">{job.place}</span>
            </div>
          </div>

          <div className="pts">
            {job.points.map((p) => (
              <div className="pt" key={p.key}>
                <span className="pt__k">{p.key}</span>
                <span className="read">
                  {p.mark && <b className="pt__mark">{p.mark}</b>}
                  {p.body}
                </span>
              </div>
            ))}
          </div>

          <span className="label" style={{ lineHeight: "20px" }}>
            {job.stack}
          </span>
        </div>
      </div>
    </section>
  );
}
