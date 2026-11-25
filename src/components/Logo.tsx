import { icons, type IconName } from "@/data/icons";

/** A skill logo, drawn monochrome so its colour comes from the token on .g. */
export default function Logo({ name, wide }: { name: IconName; wide?: boolean }) {
  const icon = icons[name];
  return (
    <span className={wide ? "g g--w" : "g"} aria-hidden="true">
      <svg viewBox={icon.viewBox} role="presentation" focusable="false">
        {icon.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    </span>
  );
}
