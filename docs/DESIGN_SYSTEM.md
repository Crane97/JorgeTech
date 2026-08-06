# STEP 2 - Design System (proposed)

## Visual language

**Cold product light.** Off-white surfaces, ink text, one electric blue accent. Inspired by Stripe/Vercel/Linear documentation and marketing craft. Not dark-cyber, not cream-editorial, not purple-glow.

## Typography

| Role | Face | Size / notes |
| --- | --- | --- |
| Display | Geist Sans | 48–72px, tracking `-0.03em`, weight 500–600 |
| Title | Geist Sans | 28–40px, tracking `-0.02em` |
| Body | Geist Sans | 16–18px, leading 1.6, max ~65ch |
| Meta / tech | Geist Mono | 12–13px |

## Spacing

4px base. Section vertical rhythm: `96 / 128 / 160`. Content gutters: `24` mobile, `40` desktop. Page max width: `1200px` for prose bands, `1400px` for media case studies.

## Grid

12-column mental model. Case studies: 5/7 or 7/5 asymmetric splits. Stack and résumé: 12-col with hairline dividers, not card grids.

## Colors

```
--bg: #F7F8FA
--surface: #FFFFFF
--ink: #0B0F17
--muted: #5B6472
--line: #E6E8EC
--accent: #1A66FF
--accent-ink: #FFFFFF
--success-soft: #EAF1FF
```

Dark mode: not shipped in v1 (theme lock to light for hiring clarity). System dark preference does not invert sections.

## Radius

Soft product system: `8` controls, `12` media, `16` large panels. One system only.

## Shadows

Tinted slate, never pure black:

- `shadow-sm`: `0 1px 2px rgb(15 23 42 / 0.04)`
- `shadow-md`: `0 8px 24px rgb(15 23 42 / 0.06)`

## Buttons

- Primary: solid ink or accent, 44px height, radius 8, press `scale(0.98)`
- Secondary: ghost with 1px line
- No pills, no glow

## Cards

Default: none. Elevation only when a surface is interactive (case study media, form). Prefer hairlines + whitespace.

## Icons

Keep `lucide-react` (already in project). Stroke `1.5` globally. No decorative icon rows.

## Animations

| Token | Value |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` |
| UI duration | 160–240ms |
| Reveal | 500–700ms ease-out, y: 16→0, opacity |
| Hover media | 240ms transform scale 1.02 |

Rules: animate only `transform`/`opacity`; honor `prefers-reduced-motion`; no marquees, particles, or perpetual loops.

## Component philosophy

1. One job per section
2. Proof before biography
3. Case studies over project cards
4. Scannable in under 4 minutes, deep on demand
5. The UI is the sample of craft
