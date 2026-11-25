import { workIndex } from "@/data/site";

const Arrow = () => (
  <span className="ix__a" aria-hidden="true">
    <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
      <path
        d="M0 7h23M18 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  </span>
);

export default function WorkIndex() {
  return (
    <div
      className="band"
      id="work"
      style={{
        paddingTop: "var(--spacing-5xl)",
        paddingBottom: "var(--spacing-5xl)",
      }}
    >
      <h2 className="sr-only">Work</h2>
      <div className="col ixs">
        {workIndex.map((row) => (
          <a key={row.n} className="ix" href={row.href}>
            <span className="ix__n">{row.n}</span>
            <span className="ix__t">{row.title}</span>
            <span className="ix__r">{row.role}</span>
            <span className="ix__y">{row.years}</span>
            <Arrow />
          </a>
        ))}
      </div>
    </div>
  );
}
