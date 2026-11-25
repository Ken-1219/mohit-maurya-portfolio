import { diagrams, type Diagram as Kind } from "@/data/projects";

/** The hard-problem drawing under each project screenshot. The text is the
 *  drawing, so it stays legible at any width and in both themes. */
export default function Diagram({ kind }: { kind: Kind }) {
  const d = diagrams[kind];
  return (
    <figure className="p4__dia">
      <figcaption className="p4__dia-c">{d.caption}</figcaption>
      {d.rows.map((row, i) => {
        if (row.kind === "step")
          return (
            <span className="p4__step" key={i}>
              <b>{row.n}</b>
              {row.text}
            </span>
          );
        if (row.kind === "sql")
          return (
            <span className="p4__sql" key={i}>
              {row.lines.map((l, j) => (
                <span key={j}>
                  {l}
                  {j < row.lines.length - 1 && <br />}
                </span>
              ))}
            </span>
          );
        if (row.kind === "rung")
          return (
            <span className="p4__lad" key={i}>
              <b>{row.label}</b>
              {row.text}
            </span>
          );
        if (row.kind === "kv")
          return (
            <span className="p4__kv" key={i}>
              {row.head ? <b>{row.k}</b> : <span>{row.k}</span>}
              <i>{row.v}</i>
            </span>
          );
        return (
          <span className="p4__note" key={i}>
            {row.text}
          </span>
        );
      })}
    </figure>
  );
}
