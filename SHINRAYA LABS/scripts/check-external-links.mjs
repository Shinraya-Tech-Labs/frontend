import fs from "node:fs";
const report = JSON.parse(
  fs.readFileSync("validation/browser-report.json", "utf8"),
);
const urls = [...new Set(report.links.filter((u) => u.startsWith("https://")))];
const results = [];
// Sequential public requests keep the organization review gentle on GitHub.
for (const url of urls) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
    results.push({ url, status: response.status, finalUrl: response.url });
    await response.body?.cancel();
  } catch (error) {
    results.push({ url, error: error.message });
  }
}
fs.writeFileSync(
  "validation/external-links.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
if (results.some((r) => r.status !== 200)) process.exitCode = 1;
