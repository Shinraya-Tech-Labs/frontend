# Content and evidence provenance

Verified against the public GitHub organization on **11 October 2026**: https://github.com/Shinraya-Tech-Labs.

`research-sources/repos.json` preserves the organization API response. Repository README snapshots are retained beside it. `research-sources/verified-paths.json` records reviewed Git trees and report/contribution file paths. `src/lib/projects.ts` contains the typed editorial metadata used by the application. No runtime GitHub calls, token, stars, fabricated counts, or browser-side API dependency are used.

## Research

| Website project | Actual repository | Content boundary |
| --- | --- | --- |
| Robust Reasoning RL | https://github.com/Shinraya-Tech-Labs/robust-reasoning-rl (default branch `codex/robust-reasoning`) | Framework/pilot complete; final GPU study externally blocked; primary hypothesis unestablished. Actual `docs/final-report.md` path verified. |
| Quantum Advantage Simulator | https://github.com/Shinraya-Tech-Labs/quantum-advantage-simulator | v0.1.0 small-system CPU studies; no demonstrated quantum advantage; CUDA and IBM QPU runs not executed. Actual `docs/FINAL_RESEARCH_REPORT.md` path verified. |
| ATLAS | https://github.com/Shinraya-Tech-Labs/ATLAS | Negative held-out result for tested graph/topology formulations; cosine-only selected. Internal held-out public development subsets, not official hidden-test results. `docs/MANIFOLD_V2_REPORT.md` and `docs/CLAIMS.md` verified. |
| NeuroSim | https://github.com/Shinraya-Tech-Labs/nuerosim | Preserve the actual repository spelling. Question is an editorial framing of README-described neuron/network simulation scope. README architecture and commands are not evidence of biological validation or verified HPC scaling. |

Research reports on the Publications & Results page are identified as repository materials, not peer-reviewed papers. No publication dates, authors, citations, acceptances, or benchmark numbers are invented. The website has not independently rerun these scientific experiments.

## Engineering

Verified public repository names: `AgentWatch`, `repopilot`, `PulseStack`, `VEX`, `FluxCore`, `SentinelCV`, `MEOWCODE`, `mycelium`.

- AgentWatch's v3 README notice takes precedence over its older guardrail marketing copy: v3 is described as passive observation, provenance, comparison, and replay; most analysis capabilities remain experimental.
- MEOWCODE is summarized from its current README as a provider-routing workspace with Next.js, Fastify, and Postgres, without repeating unverified marketing claims.
- MYCELIUM has no organization API description; its summary is derived from the actual README.
- LCI does not appear in the public organization response. Its absence is stated visibly; no URL or functionality is fabricated.
- Engineering summaries describe repository scope. They do not certify production readiness, performance, safety, or reliability.

## Contributions

GitHub organization, repository issues, and actual contribution files are linked. AgentWatch and the simulator have verified `CONTRIBUTING.md` files. No invented email address, contact form, team profile, affiliation, funding, or biography is included.

## Updating content

Review the current public README and relevant report before changing metadata. Preserve negative findings and limitations. Update source snapshots and the review date together. The static site is intentionally stable between reviews; deployments do not silently change research claims in response to repository description edits.
