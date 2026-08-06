# STEP 5 - Emil Kowalski animation review

| Before | After | Why |
| --- | --- | --- |
| Infinite name marquee on hero | Removed | Constant motion for a first-time branding moment becomes noise; brand now static and confident |
| Overlay panel scale-from-almost-zero feel (`scale(0.985)`) | Lightbox enters at `scale(0.97)` + opacity, 280ms ease-out | Physical appearance; nothing should pop from zero |
| Scroll reveals at 550–750ms | Reveal at 450ms with `cubic-bezier(0.23, 1, 0.32, 1)` | Marketing reveals can breathe, but UI should still feel snappy |
| `transition: all` patterns in old drawers | Property-specific transitions (`transform`, `opacity`, colors) | Avoid accidental layout animation cost |
| No press feedback on CTAs | `scale(0.98)` at 160ms on `:active` | Buttons must feel tactile |
| Nested modal choreography everywhere | On-page case studies; lightbox only for images | Occasional animation budget reserved for rare image focus |
| Auto-playing photo marquee (boxing) | Static responsive gallery with lightbox | Continuous marquees compete with content; user controls inspection |

Kept on purpose:
- Hero entrance stagger (once per visit)
- Section reveal on scroll (storytelling hierarchy)
- Media hover scale 1.02 (feedback that images are interactive)
- Image crossfade ~700ms (media, not chrome)
- `prefers-reduced-motion` disables transforms
