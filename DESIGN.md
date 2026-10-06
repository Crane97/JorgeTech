# Design System

<!-- impeccable:design-schema 1 -->

## Product stance

Light product portfolio for hiring decision-makers. Craft bar: Stripe, Vercel, Linear, Notion, Raycast, Apple. The interface itself is evidence of engineering quality.

## Foundations

### Color

| Token | Value | Role |
| --- | --- | --- |
| `bg` | `#F7F8FA` | Page atmosphere |
| `surface` | `#FFFFFF` | Elevated panels |
| `ink` | `#0B0F17` | Primary text / solid controls |
| `muted` | `#5B6472` | Secondary text |
| `line` | `#E6E8EC` | Hairlines |
| `accent` | `#1A66FF` | Focus / emphasis |

Theme lock: light only.

### Typography

- **Sans:** Geist Variable
- **Mono:** Geist Mono Variable
- Display: 2.75–4.25rem, tracking `-0.03em`, medium weight
- Body: 15–18px, relaxed leading, ~65ch

### Spacing & layout

- Page max: 1400px
- Section padding: 96–128px
- Case studies: asymmetric 7/5 splits alternating media side

### Radius & elevation

- Controls: 8px
- Media / panels: 12–16px
- Shadows: tinted slate, low contrast

### Motion

- Ease out: `cubic-bezier(0.23, 1, 0.32, 1)`
- UI: 160–240ms
- Reveals: ~450ms
- Animate `transform` / `opacity` only
- Honor `prefers-reduced-motion`

## Components

- Sticky product nav (single row)
- Full-bleed portrait hero with readable scrim
- Home `#projects`: scroll-driven 3D depth stack (sticky stage, one project card front and centre; passed cards tilt back on `rotateX` and recede on `translateZ` into the page colour; `01 / 05` counter + hairline progress). Reduced motion: plain vertical list of the same cards
- Project modal (`?project=<id>` in the URL, shareable, Back closes): carousel + full case study (Problem / Solution / Architecture / Technologies / Results), previous/next project, focus trapped, page scroll locked. `/projects` redirects to the stack (`#id` opens that project)
- Experience timeline
- Stack groups with mono chips
- About editorial + boxing gallery
- Resume open layout on the shared page background (titles + hairlines only)
- Contact form (Web3Forms, mailto fallback), no filled section panels

## Anti-patterns rejected

Agency marquee hero, cream-on-black editorial CV, purple glow, card-in-card, perpetual motion, particle/gaming 3D.

Projects in a modal are accepted (owner decision, 2026-10): the stack is the proof surface on the home scroll path, the modal holds depth on demand, and each modal has its own URL so nothing is buried.
