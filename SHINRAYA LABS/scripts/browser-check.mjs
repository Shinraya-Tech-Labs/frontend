import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
fs.mkdirSync("validation", { recursive: true });
const routes = [
  "/",
  "/research",
  "/engineering",
  "/publications",
  "/about",
  "/contribute",
];
const results = [];
const errors = [];
const links = new Set();
for (const viewport of [
  { width: 390, height: 844 },
  { width: 1440, height: 1000 },
  { width: 768, height: 1024 },
  { width: 320, height: 740 },
]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  for (const route of routes) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    if (response.status() !== 200)
      throw new Error(`${route}: ${response.status()}`);
    // Exercise every scroll-triggered reveal before capturing the full page.
    for (const reveal of await page.locator(".rb-reveal").all()) {
      await reveal.scrollIntoViewIfNeeded();
      await page.waitForTimeout(80);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        Promise.all(imgs.map((i) => i.decode().catch(() => {}))),
      );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    if (overflow) errors.push(`Overflow ${route} at ${viewport.width}`);
    const brokenImages = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.src),
      );
    if (brokenImages.length) errors.push(...brokenImages);
    const h1Count = await page.locator("h1").count();
    if (h1Count !== 1) errors.push(`Heading count ${h1Count}: ${route}`);
    const pageLinks = await page
      .locator("a[href]")
      .evaluateAll((els) => els.map((a) => a.getAttribute("href")));
    pageLinks.forEach((l) => links.add(new URL(l, base + route).href));
    const a11y = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const violations = a11y.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => n.target),
    }));
    if (violations.length)
      errors.push(`${route} ${viewport.width}: ${JSON.stringify(violations)}`);
    results.push({
      route,
      width: viewport.width,
      status: response.status(),
      overflow,
      h1Count,
      violations,
    });
    console.log(
      `${viewport.width} ${route}: overflow=${overflow}, accessibility=${violations.length}`,
    );
    if (viewport.width === 1440 || viewport.width === 390)
      await page.screenshot({
        path: `validation/${route === "/" ? "home" : route.slice(1)}-${viewport.width}.png`,
        fullPage: true,
      });
  }
  if (viewport.width <= 768) {
    await page.goto(base);
    const toggle = page.locator(".mobile-menu-button");
    await toggle.click();
    await page.getByRole("button", { name: "Close navigation" }).waitFor();
    if ((await toggle.getAttribute("aria-expanded")) !== "true")
      errors.push("Menu did not expand");
    await page.keyboard.press("Escape");
    if ((await toggle.getAttribute("aria-expanded")) !== "false")
      errors.push("Escape did not close menu");
    if (!(await toggle.evaluate((el) => el === document.activeElement)))
      errors.push("Escape focus not restored");
    await toggle.click();
    await page
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Research", exact: true })
      .click();
    await page.waitForURL(base + "/research");
    if (
      (await page
        .getByRole("button", { name: "Open navigation" })
        .getAttribute("aria-expanded")) !== "false"
    )
      errors.push("Menu did not close on navigation");
  }
  await context.close();
}
const reduced = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const page = await reduced.newPage();
await page.goto(base, { waitUntil: "networkidle" });
if (
  (await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  )) !== "auto"
)
  errors.push("Reduced motion scroll not disabled");
await page.getByRole("button", { name: "Open navigation" }).click();
await page
  .locator("#mobile-navigation")
  .getByRole("link", { name: "About", exact: true })
  .click();
await page.waitForURL(base + "/about");
const reducedA11y = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
if (reducedA11y.violations.length)
  errors.push("Reduced motion accessibility violations");
await reduced.close();
const nojs = await browser.newContext({ javaScriptEnabled: false });
const plain = await nojs.newPage();
await plain.goto(base);
if (!(await plain.locator("h1").textContent()).includes("Assumptions"))
  errors.push("SSR content missing");
await nojs.close();
const linkContext = await browser.newContext();
const lp = await linkContext.newPage();
for (const href of links) {
  if (!href.startsWith(base + "/")) continue;
  const u = new URL(href, base);
  const r = await lp.goto(u.href, { waitUntil: "domcontentloaded" });
  if (r && r.status() !== 200) errors.push(`Broken internal link ${href}`);
  if (
    u.hash &&
    !(await lp.locator(`[id="${decodeURIComponent(u.hash.slice(1))}"]`).count())
  )
    errors.push(`Missing anchor ${href}`);
}
for (const route of [
  "/sitemap.xml",
  "/robots.txt",
  "/icon.png",
  "/apple-icon.png",
  "/og-image.png",
]) {
  const r = await lp.request.get(base + route);
  if (r.status() !== 200) errors.push(`Metadata asset ${route}: ${r.status()}`);
}
const missing = await lp.request.get(base + "/this-page-does-not-exist");
if (missing.status() !== 404) errors.push("Missing page should return 404");
await browser.close();
const report = {
  checkedAt: new Date().toISOString(),
  base,
  results,
  errors,
  links: [...links],
  reducedMotion: true,
  noJavaScriptContent: true,
};
fs.writeFileSync(
  "validation/browser-report.json",
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify({ pages: results.length, errors, links: links.size }, null, 2),
);
if (errors.length) process.exitCode = 1;
