# Portfolio palette — "carbon copy"

Design tokens for the v2 portfolio redesign. Approved 2026-11-24.
Documentation only — nothing in `src/` uses these yet.

## Mood

The duplicate page: blue-black carbon transfer, flimsy stock tinted cool by copy
order, and the red pencil that marks what changed.

The ground is **cool, never warm white**. A warm off-white mutes a high-chroma red
and is the single most common AI-portfolio palette; the cool ground holds the red.

## Colour

Every value clears WCAG AA (4.5:1) against its own ground.

### Light — "flimsy" (default)

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--bg` | `#E7E9E6` | Ground — flimsy stock | — |
| `--surface` | `#F1F2EF` | Raised sheet, panels | — |
| `--recess` | `#D8DBD7` | Bands, table heads, rails | — |
| `--ink` | `#14181A` | Headings, primary text | 14.7:1 |
| `--ink-2` | `#3E4447` | Body text | 8.1:1 |
| `--ink-3` | `#5F6669` | Meta, mono labels | 4.8:1 |
| `--rule` | `rgba(20,24,26,0.14)` | Hairline | — |
| `--rule-2` | `rgba(20,24,26,0.28)` | Emphasised rule | — |
| `--accent` | `#C02A22` | **The change** | 4.8:1 |
| `--support` | `#2E4F63` | **The system** | 7.1:1 |

### Dark — "carbon"

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--bg` | `#14181A` | Ground — carbon black | — |
| `--surface` | `#1C2125` | Raised sheet, panels | — |
| `--recess` | `#252B2F` | Bands, table heads, rails | — |
| `--ink` | `#EAEDEB` | Headings, primary text | 15.2:1 |
| `--ink-2` | `#AEB5B8` | Body text | 8.6:1 |
| `--ink-3` | `#848B8E` | Meta, mono labels | 5.2:1 |
| `--rule` | `rgba(234,237,235,0.14)` | Hairline | — |
| `--rule-2` | `rgba(234,237,235,0.26)` | Emphasised rule | — |
| `--accent` | `#E0564A` | **The change** | 4.8:1 |
| `--support` | `#7FA6BE` | **The system** | 6.9:1 |

### The two colours have one job each

**Accent — the change.** The struck clause and its replacement. The pipeline stage
currently running. The 94%. The rule under the primary action. The dot on the
current role. Nothing else, ever.

**Support — the system.** Structure inside diagrams: pipeline rails and completed
stages, granted permissions in the matrix, the "before" figure, link hover. It
never competes for the eye.

If a third colour seems necessary, the answer is that the element does not need
colour.

### Inverted band

For the full-bleed case-study band. In light theme it is the carbon palette; in
dark theme it lifts one step so the band still separates from the page.

| Token | Light | Dark |
|---|---|---|
| `--inv-bg` | `#14181A` | `#1C2125` |
| `--inv-surface` | `#1C2125` | `#252B2F` |
| `--inv-ink` | `#EAEDEB` | `#EAEDEB` |
| `--inv-ink-2` | `#AEB5B8` | `#AEB5B8` |
| `--inv-ink-3` | `#848B8E` | `#848B8E` |
| `--inv-rule` | `rgba(234,237,235,0.14)` | `rgba(234,237,235,0.14)` |
| `--inv-accent` | `#E0564A` | `#E0564A` |
| `--inv-support` | `#7FA6BE` | `#7FA6BE` |

## Type

**IBM Plex Sans** for everything structural. **IBM Plex Mono** for figures, dates,
margin numbers, addresses and stack names. Weights 400 and 500 only; 600 is
reserved and currently unused.

| Role | Size / line-height | Tracking |
|---|---|---|
| Display (hero) | 96 / 98 | −0.035em |
| Opener (section) | 64 / 68 | −0.03em |
| Head | 36 / 42 | −0.025em |
| Sub-head | 22 / 30 | −0.015em |
| Lead | 20 / 32 | 0 |
| Body | 17 / 28 | 0 |
| Small | 15 / 24 | 0 |
| Meta (mono) | 13 / 18 | +0.04em |

Mobile: display drops to 40–44, opener to 32, everything else holds.
Sentence case everywhere. No uppercase tracked labels. No italic. No negative
tracking below 20px. Figures use `tabular-nums`.

## Spacing

8px scale: **8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128**.
4px is the only half-step, for tight label-and-value pairs.

Desktop grid at 1440: 72px outer margin, 56px margin rail, 32px gutter,
1208px content column.
Mobile at 390: 24px gutters, single column, the rail collapses to a mono number
above each section heading.

## Radii

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Inner marks, dots |
| `--radius-md` | 8px | Controls, swatches |
| `--radius-lg` | 12px | Panels, cards, tables |

Nothing is a pill. Inner radius = outer radius − padding, never below 4px.

## Signature

The **margin rail**: a 56px left rail carrying mono section numbers the way a
contract carries line numbers (`01`, `02`, `03`…), and line numbers inside the
clause panel. One detail, used consistently, nowhere else.

## Tailwind v4 theme block

Ready to paste into `globals.css` when the redesign is implemented.
Not yet applied.

```css
@theme {
  --color-bg: #E7E9E6;
  --color-surface: #F1F2EF;
  --color-recess: #D8DBD7;
  --color-ink: #14181A;
  --color-ink-2: #3E4447;
  --color-ink-3: #5F6669;
  --color-rule: rgba(20, 24, 26, 0.14);
  --color-rule-2: rgba(20, 24, 26, 0.28);
  --color-accent: #C02A22;
  --color-support: #2E4F63;

  --font-sans: "IBM Plex Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --text-display: 96px;
  --text-opener: 64px;
  --text-head: 36px;
  --text-subhead: 22px;
  --text-lead: 20px;
  --text-body: 17px;
  --text-small: 15px;
  --text-meta: 13px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #14181A;
    --color-surface: #1C2125;
    --color-recess: #252B2F;
    --color-ink: #EAEDEB;
    --color-ink-2: #AEB5B8;
    --color-ink-3: #848B8E;
    --color-rule: rgba(234, 237, 235, 0.14);
    --color-rule-2: rgba(234, 237, 235, 0.26);
    --color-accent: #E0564A;
    --color-support: #7FA6BE;
    color-scheme: dark;
  }
}
```

Note: the current site loads Geist but then sets `font-family: Arial` on `body`
in `src/app/globals.css`, so it renders in Arial. That line goes when this lands.
