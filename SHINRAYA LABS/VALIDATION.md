# Validation and handoff

Completed **11 October 2026** on Windows, Node.js 22.23.0, with installed Google Chrome against the Next.js production server.

## Results

### Motion update

Official React Bits Animated Content and Fade Content were added on 11 October 2026. `scripts/check-motion.mjs` confirms scroll-triggered opacity/position transitions, page-entry fade on client navigation, immediate keyboard-focus reveal, live preference changes, reduced-motion behavior, and visible content without JavaScript. Results are recorded in `validation/motion-report.json`. The responsive suite now scrolls through the reveal targets before taking screenshots. The original layout and content are preserved.

| Check | Result | Evidence |
| --- | --- | --- |
| ESLint | Pass, no warnings or errors | `validation/lint.log` |
| TypeScript | Pass | `validation/typecheck.log` |
| Production build | Pass; all six pages prerendered | `validation/build.log` |
| Responsive route checks | 24/24 pass: six routes × 1440, 768, 390, and 320 px | `validation/browser-report.json` |
| Horizontal overflow | None at tested widths | Browser report |
| axe WCAG A/AA checks | Zero violations on all 24 route/viewport combinations | Browser report |
| Console / uncaught errors | None during route checks | Browser report |
| Internal navigation and anchors | All pass, including research anchors and skip links | Browser report |
| External destinations | All 23 public GitHub URLs returned HTTP 200 | `validation/external-links.json` |
| Navigation interactions | Mobile opening, rapid toggle, Escape dismissal, focus return, and close-on-route-change pass | Browser check script/report |
| Reduced motion | Instant menu behavior and non-animated scrolling checked; spotlight effects disabled | Browser check script/report |
| No-JavaScript content | Main content present in server-rendered HTML | Browser report |
| Metadata and errors | Sitemap, robots, icons, and social image return 200; missing route returns 404 | Browser report |
| Production dependency audit | 0 known vulnerabilities | `validation/audit-production.json` |

All six desktop page screenshots were visually inspected, along with the mobile Home layout. Desktop and phone screenshots for every page are saved under `validation/`. The source is formatted and the original asset is preserved.

## Simulated mobile performance

Final Lighthouse run on the production Home page, using its default simulated mobile throttling:

| Category / metric | Result |
| --- | --- |
| Performance | 96 / 100 |
| Accessibility | 100 / 100 |
| Best practices | 100 / 100 |
| SEO | 100 / 100 |
| First Contentful Paint | 0.9 s |
| Largest Contentful Paint | 2.6 s |
| Total Blocking Time | 100 ms |
| Cumulative Layout Shift | 0 |

Full evidence: `validation/lighthouse-mobile.json`. No run warnings. The supplemental visible-label/accessible-name audit also passes. These are local lab measurements, not deployed-site or real-device guarantees. Lighthouse still identifies ordinary framework unused/legacy JavaScript and image/render-path optimization opportunities; the scores above are the observed results, not a claim of perfect performance.

Reproduce (production server must be running, with Chrome installed):

```powershell
node scripts/browser-check.mjs
node scripts/check-external-links.mjs
npm exec --yes --package=lighthouse -- lighthouse http://127.0.0.1:3000 --output=json --output-path=validation/lighthouse-mobile.json --quiet --chrome-flags=--headless --only-categories=performance,accessibility,best-practices,seo
```

## Fixes made during validation

- Adapted the official Spotlight Card settings ref update for current React lint rules.
- Added navigation cleanup and accessible state/keyboard behavior.
- Cancelled old menu tweens before rapid reopening, preventing a stale closing animation from hiding the open menu.
- Corrected a 320 px headline overflow by making the minimum heading size responsive.
- Added explicit whitespace to the compact brand link's text so its visible label matches its accessible name.
- Added high fetch priority for the original hero image.

## Remaining limitations

1. **Deployment:** production is live at https://shinraya-tech-labs.vercel.app as of 11 October 2026. All six routes and five metadata/image endpoints returned HTTP 200 without authentication. Canonical URLs, robots, and sitemap use the production domain; desktop/mobile browser checks found no console errors or overflow. Evidence: `validation/deployment.json` and `validation/deployed-home-*.png`. No custom domain is configured.
2. **Content:** LCI has no verified public organization repository. NeuroSim's scientific validation is unverified. The website accurately reports repository evidence but does not independently reproduce scientific experiments. Content is a dated static editorial snapshot, not a live research feed.
3. **Dependency tooling:** the full npm audit reports five high-severity entries in the development-only lint dependency chain (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`). They trace to the same braces stack-exhaustion advisory, [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). The audit's proposed automatic fix downgrades the Next lint configuration across major versions, so it was not blindly applied. The production dependency audit is clean. Recheck when the upstream tooling ships a compatible fix.
4. **Coverage:** automated checks use desktop Chrome with emulated viewport sizes. The deployed origin was additionally checked at desktop and mobile sizes. Physical devices, Safari, Firefox, and assistive-technology sessions were not tested. Automated accessibility audits supplement, rather than replace, those checks.
5. **Reduced/no scripting:** content is server-rendered and remains visible when scripts do not run. The approved mobile header interaction needs JavaScript; ordinary footer navigation remains available without it. Scroll and route motion are progressive enhancements, skipped for reduced-motion preferences.

The temporary production preview server was used for validation. Start your own local session with `npm run dev` (or `npm run start` for the already-built production output).
