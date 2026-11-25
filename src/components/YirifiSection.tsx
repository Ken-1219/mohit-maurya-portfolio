import { yirifi } from "@/data/employers";

/** Yirifi.ai is a shorter entry than the two jobs above it: a smaller name,
 *  no point list, and the roles stacked in the right column. */
export default function YirifiSection() {
  return (
    <section
      className="band"
      id={yirifi.id}
      style={{
        paddingTop: "var(--spacing-4xl)",
        paddingBottom: "var(--spacing-4xl)",
      }}
    >
      <div className="rail">
        <div className="rail__n">
          <span className="label">{yirifi.marker}</span>
        </div>
        <div className="yirifi">
          <div className="col" style={{ gap: "var(--spacing-md)" }}>
            <h2 className="serif job__name job__name--sm">{yirifi.name}</h2>
            <p className="read" style={{ maxWidth: "56ch" }}>
              {yirifi.summary}
            </p>
          </div>
          <div
            className="col"
            style={{
              gap: "var(--spacing-half)",
              paddingTop: "var(--spacing-xs)",
            }}
          >
            {yirifi.meta.map((m, i) => (
              <span
                key={m}
                className="label"
                style={
                  i === 2 || i === 4
                    ? { paddingTop: "var(--spacing-sm)" }
                    : undefined
                }
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
