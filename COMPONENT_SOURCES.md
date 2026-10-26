# Component provenance

Reviewed 11 October 2026. Visual interactions are sourced exclusively from React Bits. No shadcn/ui components, registry CLI, icon library, or other UI kit is installed. Next.js, React, Tailwind CSS, and GSAP provide the framework, styling, and approved component runtime.

## Integrated components

| Component | Official documentation | Official implementation | Installation | Usage |
| --- | --- | --- | --- | --- |
| React Bits Pill Nav | https://reactbits.dev/components/pill-nav | [TypeScript source](https://github.com/DavidHDev/react-bits/blob/26cf51f7874aeb31aa9eb463648f3221865dbc11/src/ts-default/Components/PillNav/PillNav.tsx), [CSS](https://github.com/DavidHDev/react-bits/blob/26cf51f7874aeb31aa9eb463648f3221865dbc11/src/ts-default/Components/PillNav/PillNav.css) | Download official TS/CSS; adapt locally with `node scripts/integrate-components.mjs`; `npm install gsap` (version pinned in package.json/lockfile) | Shared header across all pages; desktop hover/focus and mobile menu |
| React Bits Spotlight Card | https://reactbits.dev/components/spotlight-card | [TypeScript source](https://github.com/DavidHDev/react-bits/blob/26cf51f7874aeb31aa9eb463648f3221865dbc11/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx), [CSS](https://github.com/DavidHDev/react-bits/blob/26cf51f7874aeb31aa9eb463648f3221865dbc11/src/ts-default/Components/SpotlightCard/SpotlightCard.css) | Download official TS/CSS; adapt locally using the same integration script; React only | Home research cards and Engineering project cards |

Unmodified downloaded sources are retained in `research-sources/`; integrated sources live in `src/components/approved/`. `research-sources/commit.json` records the upstream revision. `scripts/integrate-components.mjs` makes the adaptations reproducible.

### Adaptations

- Pill Nav: replace React Router with Next.js Link; replace raw image with Next.js Image; retain the source's circle/timeline/menu interactions. Use the original emblem crop and plain brand text. Disable the spinning-logo effect and initial entrance animation. Adapt spacing, colors, corner radii, typography, and mobile breakpoint. Add `aria-current`, expanded/control state, inert closed menu, keyboard focus interactions, Escape dismissal with focus return, correct close-on-navigation behavior, tween cleanup, and zero-duration reduced-motion handling. Remove menu widget roles so ordinary navigation retains normal Tab behavior.
- Spotlight Card: retain the documented implementation and props. Use low-intensity champagne light, no ambient motion, no flare, no nearby-card activation, and flat brand surfaces. Move the settings ref update into its effect to satisfy current React lint rules. Skip pointer effects under reduced motion; CSS also hides effect layers if the preference changes during a session.
- Ordinary editorial layouts, headings, tables, rows, CTA links, footer links, and semantic content are application integration code, as permitted by the brief. They contain no invented animated components. Arrow glyphs are text, not an icon component library.
- Hero background is the solid brand background with the original logo asset. No shader, particle system, or animated background is added.

## License and attribution

React Bits' retrieved license is **MIT + Commons Clause License Condition v1.0**, copyright © 2026 David Haz. The full notice is preserved in `licenses/REACT-BITS.txt`; the GitHub license API response is retained in `research-sources/license.json`. It permits use as part of an application, website, or product, including commercial use, but restricts sale/sublicensing/redistribution of the components themselves. Keep the notice with copies of this site's source. This is not unqualified MIT licensing. No visible on-page credit is required by the retrieved license text.

GSAP is the dependency required by the official Pill Nav implementation. Its copyright/license header is preserved in the npm package (`node_modules/gsap/gsap-core.js`); the [Standard No Charge License](https://gsap.com/community/standard-license/) permits website use and restricts competing visual animation builders. This website is a permitted use. Dependencies are not relicensed by this project. The original logo belongs to its owner; no new logo or replacement branding was generated.

## Candidate evaluation

- [React Bits component index](https://reactbits.dev/get-started/index): inspected; Pill Nav and Spotlight Card selected for consistent, bounded interaction.
- [Blur Text](https://reactbits.dev/text-animations/blur-text): documentation and actual source inspected, but omitted to keep the main heading visible without JavaScript and avoid an additional motion runtime.
- Split Text / Decrypted Text / Scroll Reveal: unnecessary for this editorial design; no snippets imported. Animated Content was added in the motion update below.
- Dark Veil / Dot Grid: omitted because the logo is already the visual focal point and the hero does not benefit from another effect.
- [Aceternity components](https://ui.aceternity.com/components) and [Spotlight](https://ui.aceternity.com/components/spotlight): inspected; omitted to avoid overlapping illumination effects.
- [Animata components](https://animata.design/components): reviewed as a candidate source. No Animata implementation is installed, so no Animata license is incorporated.

## Added scroll and navigation-entry motion

| Component | Official documentation and implementation | Installation | Usage |
| --- | --- | --- | --- |
| React Bits Animated Content | [Docs](https://reactbits.dev/animations/animated-content), [official TS source](https://github.com/DavidHDev/react-bits/blob/26cf51f7874aeb31aa9eb463648f3221865dbc11/src/ts-default/Animations/AnimatedContent/AnimatedContent.tsx) | Official file copied locally; reproducible adaptations in `scripts/integrate-motion.mjs`; existing GSAP + ScrollTrigger dependency | Scroll reveals for section headings, research/engineering cards, research evidence entries, publication and project rows, philosophy, and collaboration sections across all six pages |
| React Bits Fade Content | [Docs](https://reactbits.dev/animations/fade-content), [official TS source](https://github.com/DavidHDev/react-bits/blob/26cf51f7874aeb31aa9eb463648f3221865dbc11/src/ts-default/Animations/FadeContent/FadeContent.tsx) | Same source-copy workflow and existing GSAP dependency | `src/app/template.tsx`: 320 ms entry transition on App Router navigation |

These additions supersede the initial decision to omit Animated Content. Four approved visual components are now shipped. Original motion files and the upstream revision are retained in `research-sources/`; the same React Bits license applies. No new animation library is added.

Adaptations preserve the official GSAP timeline and ScrollTrigger implementation. Scroll travel is reduced to 28 px over 650 ms, with no exit/disappearance effects. The route fade starts at 35% opacity, uses no blur, and does not delay navigation. The main hero heading is not individually hidden or split. Both components render visible server-side HTML, use `gsap.matchMedia` to skip/revert motion under reduced motion (including preference changes), reveal immediately when a descendant receives keyboard focus, clean up on unmount, and clear temporary styles after completion. No custom animation engine or invented transition component is used.
