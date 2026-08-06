# STEP 1 - Taste Skill Audit

**Design read:** Redesign overhaul of a developer portfolio for recruiters, EMs, and CTOs, with a Linear/Vercel/Stripe-grade premium minimal language. Not an agency spectacle site.

**Current dials (inferred):** `DESIGN_VARIANCE: 7` · `MOTION_INTENSITY: 5` · `VISUAL_DENSITY: 4`

**Target dials:** `DESIGN_VARIANCE: 6` · `MOTION_INTENSITY: 5` · `VISUAL_DENSITY: 3`

## What works

- Rich bilingual/trilingual content already exists
- Real project screenshots and boxing photography
- Deep project write-ups (architecture, technologies, flows)
- Keyboard support on overlays and lightbox
- `prefers-reduced-motion` partially respected

## UX problems

1. **Projects and About are buried in modal overlays.** Hiring managers scanning for 2-4 minutes never see the strongest proof (case studies) on the main scroll path.
2. **Information architecture is résumé-linear, not product-linear.** Path → Experience → Education → Courses → Personal hub → Contact. Selected work should lead after the hero.
3. **Mixed navigation model.** Some nav items scroll; others open panels. Unpredictable for first-time visitors.
4. **No Technology Stack or Résumé surface.** Skills are scattered inside project modals; résumé is not a dedicated scannable section.
5. **Contact duplicates intent.** Mailto CTA plus form that also opens mailto.

## Weak hierarchy

1. Hero brand signal is a marquee of the name, but role/value proposition is tiny footer text.
2. Every section repeats the same pattern: eyebrow + H2 + long body (`max-w-3xl`), so nothing feels primary.
3. Project list inside the panel is text-first with images last; screenshots should lead case studies.
4. Full legal name appears late and competes with section titles.

## Spacing issues

1. Dense `max-w-3xl` column everywhere creates a blog/CV feel, not a product site.
2. Section rhythm alternates `#0a0a0a` / `#111111` without compositional purpose.
3. Project entries stack long paragraphs before media; vertical fatigue before proof.

## Typography problems

1. Helvetica Neue via third-party CDN is fragile and generic for a craft portfolio.
2. Display type relies on extreme viewport-height marquee sizing rather than a controlled type scale.
3. Too many uppercase tracked micro-labels (eyebrow on nearly every block).
4. Body and UI share one face/weight; no mono for technical metadata.

## Repetitive layouts

1. Experience, education, and courses are nearly identical list layouts.
2. Five project detail dialogs are copy-pasted modal shells.
3. Personal hub uses two identical bordered cards (Projects / About).

## Generic / agency tells

1. Full-bleed atmospheric stock-like hero + infinite name marquee reads as creative-agency portfolio, not engineering product quality.
2. Cream-on-near-black palette is a common AI/agency cluster.
3. Decorative hairline + marquee + overlay drawers prioritize mood over proof.
4. Scroll cue aesthetics and status-like microcopy appear in places.

## Inconsistent design

1. Sharp zero-radius controls mixed with soft overlay motion language.
2. Nav is a vertical stacked link column on desktop (unusual, hard to scan) vs expected horizontal product nav.
3. Z-index stacking for nested dialogs (panel → project → lightbox) is fragile.
4. Some images use empty `alt=""` in galleries that convey meaning (boxing).

## Accessibility improvements

1. Focus trap missing in modals; background still conceptually present.
2. Carousel dots labeled only with numbers.
3. Contrast of `cream/45`–`cream/50` text on `#0a0a0a` is borderline for body/meta.
4. Marquee name is not pauseable via keyboard and may annoy motion-sensitive users even with reduced-motion partially handled.
5. Form has no validation feedback beyond native required.

## Storytelling opportunities

1. Elevate each project into an on-page case study: Problem → Solution → Architecture → Technologies → Results (from existing detail files).
2. Lead with Selected Projects after a confident, product-style hero.
3. Aggregate technologies into one scannable stack section for recruiters.
4. Keep About/boxing as human proof after engineering proof, not as a modal side quest.
5. Present Experience + Education as a clean Résumé section for quick download-equivalent scanning.
