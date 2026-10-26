# Shinraya Tech Labs

Complete six-page Next.js App Router website, built around the supplied original logo. TypeScript, Tailwind CSS, and locally integrated official React Bits components. No database or GitHub token required.

## Local development

Node.js 22.x and npm are required (the Vercel runtime is pinned to the tested major).

```powershell
cd "D:\Shinraya Tech Labs\SHINRAYA LABS"
npm ci
npm run dev
```

Open http://localhost:3000. All content and metadata render on the server; the approved navigation, card, scroll-reveal, and route-entry animation components run on the client. Fonts are system fonts. Branding uses optimized local images. Scroll and transition effects use official React Bits Animated Content and Fade Content with reduced-motion support.

## Checks and production

```powershell
npm run lint
npm run typecheck
npm run build
npm run start
```

Build prerenders `/`, `/research`, `/engineering`, `/publications`, and `/about`, `/contribute`, along with metadata endpoints and a custom 404. The production server defaults to port 3000.

Browser validation uses the installed Google Chrome channel:

```powershell
node scripts/browser-check.mjs
```

Run it against a running production server; set `TEST_BASE_URL` to use another origin. The script checks all routes at desktop, tablet, and phone sizes; runs axe accessibility checks; verifies menu navigation, Escape/focus, reduced motion, internal links/anchors, images, metadata assets, SSR content, console errors, and 404 behavior. It writes screenshots and a JSON report to `validation/`. Install Google Chrome locally, or change the documented Playwright channel to an available browser for your environment.

## Deploy to Vercel

1. Commit the website source and lockfile to your Git repository. Do not commit `node_modules` or `.next`.
2. Import that repository into Vercel. If the repository root is the parent workspace, set **Root Directory** to `SHINRAYA LABS`; if this folder itself is the repository root, leave it as `.`.
3. Use the **Next.js** framework preset, Node 22+, install command `npm ci`, and build command `npm run build`. Keep the default Next.js output setting.
4. Set `SITE_URL` to the actual HTTPS public origin, such as the Vercel deployment's production domain or your configured custom domain. Do not use an invented domain. If unset, the app uses `VERCEL_PROJECT_PRODUCTION_URL` on Vercel and `http://localhost:3000` locally.
5. Deploy. Verify the six routes, `/sitemap.xml`, `/robots.txt`, the favicon, and the social preview on the deployed origin. Rebuild after changing `SITE_URL` because metadata is generated at build time.

Production deployed on 11 October 2026: **https://shinraya-tech-labs.vercel.app**. Vercel project: `sreerevanths-projects/shinraya-tech-labs`. The local directory is linked via the ignored `.vercel/` configuration. Publish future changes from this folder with `npx vercel deploy --prod --yes`. All six public routes, metadata endpoints, images, and desktop/mobile navigation were checked without authentication; see `validation/deployment.json`. The deployment uses Vercel's production hostname for canonical and sitemap URLs. No custom domain or analytics were configured.

## Source map

- `src/app/`: route pages, global design tokens, metadata endpoints, icons.
- `src/components/approved/`: source-derived React Bits components and their CSS.
- `src/lib/projects.ts`: typed and reviewed research/engineering metadata.
- `assets/logo-original.png`: unchanged supplied brand asset.
- `public/`: optimized brand and social images.
- `COMPONENT_SOURCES.md`: every third-party visual component, installation, adaptations, and license.
- `CONTENT_SOURCES.md`: verified repositories, claims, limitations, and review process.
- `DESIGN_SYSTEM.md`: inspected logo, palette, typography, and motion decisions.
- `VALIDATION.md`: checks performed and remaining limitations.
- `licenses/REACT-BITS.txt`: required upstream license notice.

`scripts/prepare-brand.mjs` regenerates image derivatives. `scripts/integrate-components.mjs` reproduces local adaptations from the retained upstream source snapshots; review it before changing approved components. Dependencies are pinned and the lockfile is included with the source.

## Content policy

Project evidence is summarized from public repository materials reviewed on 11 October 2026. No live popularity counters or invented achievements are displayed. ATLAS's negative result, the blocked final RL study, and QAS's lack of demonstrated quantum advantage remain explicit. NeuroSim scientific validation and LCI's repository are unverified. Repository reports are not described as peer-reviewed publications.

## License notes

React Bits is licensed MIT + Commons Clause, not unrestricted MIT. Preserve `licenses/REACT-BITS.txt` with this source and follow the component redistribution restrictions. Other dependency licenses remain their own. No ownership or license for the supplied brand artwork is inferred beyond its authorized use in this website.
