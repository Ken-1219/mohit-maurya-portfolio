# Portfolio palette — "bond ledger"

The palette this site ships. Defined once in `src/app/globals.css` as CSS
variables; write `var(--token)`, never a literal.

It comes from one physical object: a bound ledger. Warm bond paper, iron-gall
black, the blue of a ruled line, the red of a correction pencil. It suits an
engineer whose work is records, pipelines and state, and it stays Mohit's
whatever he builds next.

An earlier palette, "carbon copy" (cool ground, blue-black), was explored for
v2 and is not used. The Doop canvas keeps it only as a reference frame.

## Light — bond

| Token | Hex | Role | On ground |
|---|---|---|---|
| `--color-ground` | `#F1EEE8` | Bond paper | — |
| `--color-surface` | `#F8F6F2` | Raised sheet, panels | — |
| `--color-recess` | `#E4E0D8` | Band, table head | — |
| `--color-ink` | `#1A1714` | Headings, primary text | 15.4:1 |
| `--color-ink-2` | `#44403A` | Body | 8.9:1 |
| `--color-ink-3` | `#6B6660` | Meta, mono labels | 4.9:1 |
| `--color-rule` | `rgba(26,23,20,0.14)` | Hairline | — |
| `--color-rule-strong` | `rgba(26,23,20,0.28)` | First row, table head | — |
| `--color-support` | `#2B5171` | Ledger blue | 7.2:1 |
| `--color-accent` | `#B8322A` | Redline | 5.1:1 |

## Dark — carbon

| Token | Hex | Role | On ground |
|---|---|---|---|
| `--color-ground` | `#1A1815` | — | — |
| `--color-surface` | `#22201C` | — | — |
| `--color-recess` | `#2A2722` | — | — |
| `--color-ink` | `#EDEAE4` | | 14.8:1 |
| `--color-ink-2` | `#B0ABA3` | | 7.8:1 |
| `--color-ink-3` | `#999389` | | 5.8:1 |
| `--color-rule` | `rgba(237,234,228,0.14)` | | — |
| `--color-rule-strong` | `rgba(237,234,228,0.26)` | | — |
| `--color-support` | `#7FA8C8` | | 7.0:1 |
| `--color-accent` | `#E8655A` | | 5.4:1 |

The `--color-inv-*` set carries the carbon values into a full-bleed band inside
the light theme, and lifts one step in dark so the band still separates.

### Two corrections made during the build

Contrast was originally checked only against each theme's **ground**. Two
pairings on other surfaces fell below 4.5:1 and were raised:

| Pairing | Was | Ratio | Now | Ratio |
|---|---|---|---|---|
| Dark meta ink on the recess band `#2A2722` | `#908B82` | 4.39 | `#999389` | 4.88 |
| Accent on an inverted band in dark `#22201C` | `#E2594C` | 4.47 | `#E8655A` | 4.99 |

Check any new pairing against the surface it actually sits on, not just the
page ground. Lighthouse reports 0 contrast failures in both themes.

## What each colour does

**Ledger blue — structure.** Every link, and anything the system knows that the
visitor can follow: completed steps, diagram rules and connectors, a filled
cell in a matrix, the role held now, a key in a key-value listing. It carries
most of the page's colour, quietly.

**Redline — the one change worth marking.** At most three places on a page:

1. The rule under the page's single primary action.
2. One figure that carries the page's point, where a before and an after sit
   side by side — here, ContraVault's 43% to 94%.
3. The keyboard focus ring.

If a fourth use seems necessary, the element does not need colour.

## Hazard, and how it is handled

A warm ground under a high-chroma red mutes the red, and the pairing is a
current cliché. Two things hold it: the warm is low-chroma (bond stock, not
cream) and the red is deepened to `#B8322A` to keep 5.1:1. Do not warm the
ground further, and do not lighten the red.

## Banned

No gradients of any kind, including inside one hue on a surface. No glow, no
coloured shadow, no neon, no glassmorphism, no backdrop blur. Depth comes from
surface steps and hairlines.
