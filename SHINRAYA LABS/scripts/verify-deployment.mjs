import fs from "node:fs";
import { chromium } from "@playwright/test";

const origin = new URL(process.argv[2]).origin;
const routes = [
  "/",
  "/research",
  "/engineering",
  "/publications",
  "/about",
  "/contribute",
  "/sitemap.xml",
  "/robots.txt",
  "/icon.png",
  "/apple-icon.png",
  "/og-image.png",
];
const results = [];
for (const route of routes) {
  const response = await fetch(origin + route, {
    signal: AbortSignal.timeout(30000),
  });
  const contentType = response.headers.get("content-type");
  const record = {
    route,
    status: response.status,
    finalUrl: response.url,
    contentType,
  };
  if (response.status !== 200 || new URL(response.url).origin !== origin)
    throw new Error(`Public route failed: ${JSON.stringify(record)}`);
  if (contentType?.includes("text/html")) {
    const html = await response.text();
    if (!html.includes("Shinraya Tech Labs") || !html.includes('id="main"'))
      throw new Error(`Site content missing: ${route}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    record.canonical = canonical?.[1];
    if (!record.canonical?.startsWith(origin))
      throw new Error(`Wrong canonical: ${record.canonical}`);
  } else if (route === "/sitemap.xml" || route === "/robots.txt") {
    const content = await response.text();
    if (content.includes("localhost") || !content.includes(origin))
      throw new Error(`Wrong origin in ${route}`);
  } else {
    await response.body?.cancel();
  }
  results.push(record);
}
const browser = await chromium.launch({ channel: "chrome", headless: true });
const browserErrors = [];
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 950 } });
  page.on("pageerror", (e) => browserErrors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") browserErrors.push(msg.text());
  });
  await page.goto(origin, { waitUntil: "networkidle" });
  for (const reveal of await page.locator(".rb-reveal").all()) {
    await reveal.scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
  }
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page
    .locator("img")
    .evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error(`Overflow at ${width}`);
  await page.screenshot({
    path: `validation/deployed-home-${width}.png`,
    fullPage: true,
  });
  if (width === 390) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Research", exact: true })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Research", exact: true })
      .click();
  }
  await page.waitForURL(origin + "/research");
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.close();
}
await browser.close();
const report = {
  verifiedAt: new Date().toISOString(),
  origin,
  routes: results,
  browserErrors,
};
fs.writeFileSync("validation/deployment.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (browserErrors.length) process.exitCode = 1;
