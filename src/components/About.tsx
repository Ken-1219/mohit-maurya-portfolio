import { aboutParagraph, experience } from "@/data/employers";

export default function About() {
  return (
    <section
      className="band band--recess"
      id="about"
      style={{
        paddingTop: "var(--spacing-5xl)",
        paddingBottom: "var(--spacing-5xl)",
      }}
    >
      <div className="rail">
        <div className="rail__n">
          <span className="label">06 · about</span>
        </div>
        <div className="col" style={{ gap: "var(--spacing-2xl)" }}>
          <h2 className="sr-only">About</h2>
          <p className="lead" style={{ maxWidth: "66ch" }}>
            {aboutParagraph}
          </p>
          <div className="xps">
            {experience.map((x) => (
              <div className="xp" key={x.org}>
                <div className="xp__hd">
                  <span className="xp__c">{x.org}</span>
                  <span className="xp__w">{x.when}</span>
                  <span className="xp__p">{x.place}</span>
                </div>
                <div className="xp__rs">
                  {x.roles.map((r) => (
                    <div className="xp__r" key={r.title}>
                      <span className="xp__rt">{r.title}</span>
                      <span className="xp__rw">{r.when}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
