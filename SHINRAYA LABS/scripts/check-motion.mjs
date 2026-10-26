import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
const origin = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(origin, { waitUntil: "networkidle" });
const reveal = page.locator(".motion-card").first();
await expect(reveal).toHaveCSS("opacity", "0");
await reveal.scrollIntoViewIfNeeded();
await expect(reveal).toHaveCSS("opacity", "1");
await expect(reveal).toHaveCSS("transform", "none");
const focusReveal = page.locator(".motion-card").last();
await focusReveal.getByRole("link").first().focus();
await expect(focusReveal).toHaveCSS("opacity", "1");
await page.evaluate(() => {
  window.__fadeSamples = [];
  new MutationObserver((records) => {
    for (const record of records) {
      const el = record.target;
      if (el instanceof HTMLElement && el.classList.contains("rb-fade"))
        window.__fadeSamples.push(getComputedStyle(el).opacity);
    }
  }).observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["style"],
  });
});
await page
  .getByRole("navigation", { name: "Primary" })
  .getByRole("link", { name: "About", exact: true })
  .click();
await page.waitForURL(origin + "/about");
await expect(page.locator(".route-entry")).toHaveCSS("opacity", "1");
const samples = await page.evaluate(() => window.__fadeSamples);
if (!samples.some((n) => Number(n) < 1))
  throw new Error("Route entry fade did not run");
await page.emulateMedia({ reducedMotion: "reduce" });
await expect(page.locator(".rb-reveal").first()).toHaveCSS("opacity", "1");
await expect(page.locator(".rb-reveal").first()).toHaveCSS("transform", "none");
const reduced = await browser.newContext({
  reducedMotion: "reduce",
  viewport: { width: 390, height: 844 },
});
const rp = await reduced.newPage();
await rp.goto(origin, { waitUntil: "networkidle" });
for (const el of await rp.locator(".rb-reveal,.rb-fade").all()) {
  await expect(el).toHaveCSS("opacity", "1");
  await expect(el).toHaveCSS("transform", "none");
}
const nojs = await browser.newContext({ javaScriptEnabled: false });
const np = await nojs.newPage();
await np.goto(origin);
for (const el of await np.locator(".rb-reveal,.rb-fade").all())
  await expect(el).toHaveCSS("visibility", "visible");
await browser.close();
const report = {
  origin,
  scrollReveal: true,
  routeEntryFade: true,
  keyboardReveal: true,
  liveReducedMotion: true,
  reducedMotion: true,
  noJavaScriptVisible: true,
  errors,
};
fs.writeFileSync(
  "validation/motion-report.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
