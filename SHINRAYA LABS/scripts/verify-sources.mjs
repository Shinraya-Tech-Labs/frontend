import fs from "node:fs";
const repos = JSON.parse(
  fs.readFileSync("research-sources/repos.json", "utf8"),
);
const relevant = [
  "ATLAS",
  "quantum-advantage-simulator",
  "robust-reasoning-rl",
  "nuerosim",
  "AgentWatch",
];
const results = await Promise.all(
  repos
    .filter((r) => relevant.includes(r.name))
    .map(async (r) => {
      const url = `https://api.github.com/repos/${r.full_name}/git/trees/${encodeURIComponent(r.default_branch)}?recursive=1`;
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`${res.status}: ${url}`);
      const d = await res.json();
      const paths = d.tree.map((f) => f.path);
      const records = {
        repo: r.name,
        branch: r.default_branch,
        sha: d.sha,
        truncated: d.truncated,
        paths: paths.filter((p) =>
          /CONTRIBUT|final.report|MANIFOLD_V2_REPORT|FINAL_RESEARCH_REPORT|CLAIMS|LICENSE|USER_GUIDE|LATEST.md/i.test(
            p,
          ),
        ),
      };
      console.log(records);
      return records;
    }),
);
fs.writeFileSync(
  "research-sources/verified-paths.json",
  JSON.stringify(results, null, 2),
);
