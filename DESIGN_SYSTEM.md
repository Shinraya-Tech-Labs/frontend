# Logo-led visual system

The supplied asset was inspected before design: `../ASSETS/Shinraya Tech Labs Emblem (1).png`, copied without modification to `assets/logo-original.png` (1254 × 1254 RGB PNG).

It combines a nearly black ground, textured ivory S/torii/mountain forms, a vermilion sun and petals, and fine warm champagne orbital lines. High contrast, delicate lines, and a restrained red focal point guided the site. There is no assumed blue/purple identity or additional palette.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#090909` | Ink-black page ground |
| `--surface` | `#111110` | Quiet card and CTA surface |
| `--surface-raised` | `#171615` | Interactive row feedback |
| `--border` | `#302e2a` | Editorial separators |
| `--text` | `#f2eee7` | Ivory primary text |
| `--muted` | `#aaa69e` | Secondary readable text |
| `--champagne` | `#d6b799` | Serif emphasis, focus rings, links, buttons |
| `--vermilion` | `#dd3044` | Small decorative markers and status rule |
| `--accent-hover` | `#e5cbb2` | Button hover state |

These are restrained visual selections from the asset's color families, not claims of exact corporate color specifications. Vermilion is not used for small body text. Interactive focus is visible and independent of hover.

Typography pairs a system sans-serif with Georgia italic. No font requests, font licenses, or font-loading shifts are introduced. Headings are fluid, body text wraps naturally, and layouts move from columns to a single reading order on narrow screens. UI colors are defined once in `src/app/globals.css` and applied to approved component props/CSS.

`scripts/prepare-brand.mjs` produces optimized WebP derivatives, an emblem-only crop for compact branding/favicons, and a social image containing the original artwork. It does not redraw or recolor the logo. The complete original logo remains visible in the Home and About pages.

Motion uses official React Bits navigation, low-intensity card spotlights, Animated Content scroll reveals, and Fade Content route-entry transitions. Reveals travel 28 px over 650 ms and run once; page entry fades over 320 ms without blur. No autoplay background or disappearing content. Server-rendered content remains visible without JavaScript, keyboard focus reveals content immediately, and reduced motion disables both scroll and route effects. Ordinary links use immediate color feedback.
