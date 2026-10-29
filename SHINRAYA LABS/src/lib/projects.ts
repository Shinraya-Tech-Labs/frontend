export const github = "https://github.com/Shinraya-Tech-Labs";
export const verifiedOn = "11 October 2026";

export type ResearchProject = {
  slug: string;
  name: string;
  field: string;
  question: string;
  summary: string;
  scope: string;
  status: string;
  evidence: string;
  limitations: string;
  repo: string;
  branch: string;
  report?: string;
  resultLabel: string;
};

// Editorial summaries of the public READMEs, reviewed 2026-10-11.
// Source snapshots and claim boundaries are retained in research-sources/.
export const research: ResearchProject[] = [
  {
    slug: "robust-reasoning-rl",
    name: "Robust Reasoning RL",
    field: "Reasoning & reinforcement learning",
    question: "When the reward is wrong, what does a reasoning model learn?",
    summary:
      "Studying correctness and reward overfitting when verifiers are noisy, incomplete, biased, or inconsistent.",
    scope:
      "Matched baseline and robust GRPO training, uncertainty-aware reward shaping, controlled verifier corruption, and independent mathematical evaluation.",
    status: "Framework and pilot complete · final GPU study blocked",
    evidence:
      "The repository documents pretrained GRPO training and save/reload runs, independent GSM8K evaluation, model qualification, and a frozen execution package.",
    limitations:
      "The primary hypothesis is unestablished. Pilot runs and software fixtures do not establish improved reasoning or reduced reward overfitting. The final GPU study remains externally blocked.",
    repo: "robust-reasoning-rl",
    branch: "codex/robust-reasoning",
    report: "docs/final-report.md",
    resultLabel: "Pilot & protocol",
  },
  {
    slug: "aci-architecture-framework",
    name: "ACI Architecture Framework",
    field: "Agent memory & attention bounds",
    question: "How can long-horizon agents bound context so tool output stops crowding out the goal?",
    summary:
      "Tiered generational memory and attention-weighted eviction for multi-turn autonomous agents, with formal bounds on softmax dilution.",
    scope:
      "Softmax Inundation Bound, Generational Context (Gen-0/1/2), Attention-Weighted Eviction (AWE), deterministic CCB-001 simulation, and live transformer attention probing on Qwen2.5-0.5B.",
    status: "v0.1.0 reference package · live probe validated",
    evidence:
      "The repository documents formal bounds, 11/11 passing unit tests, -97.5% token compression in CCB-001, 8/8 CIC governance scenarios, and empirical Qwen2.5-0.5B eager forward-pass attention retention.",
    limitations:
      "Softmax inundation bounds assume uniform projection energy bounds; live transformer measurements were performed on 0.5B parameters; SWE-bench verified evaluations on frontier neural models remain in progress.",
    repo: "https://github.com/Team-Auralis/ACI-Architecture-Framework",
    branch: "main",
    report: "docs/papers/The_Softmax_Inundation_Theorem.pdf",
    resultLabel: "Formal bound & probe",
  },
  {
    slug: "quantum-advantage-simulator",
    name: "Quantum Advantage Simulator",
    field: "Quantum & classical computation",
    question: "Where do exact, learned, and variational methods actually help?",
    summary:
      "A shared experimental framework for testing quantum methods against classical references, without assuming an advantage.",
    scope:
      "Exact simulation, neural quantum states, VQE, QAOA, finite-shot noise mitigation, circuit search, and minimal-basis molecular chemistry.",
    status: "v0.1.0 simulator studies released",
    evidence:
      "Released CPU studies preserve configurations, per-seed results, checkpoints, and checksum manifests. Small-system comparisons include failed optimizations and harmful mitigation outcomes.",
    limitations:
      "No quantum advantage, GPU speedup, or hardware performance advantage is demonstrated. CUDA and IBM QPU runs were not executed for v0.1.0; the measurements are small-system CPU simulations.",
    repo: "quantum-advantage-simulator",
    branch: "main",
    report: "docs/FINAL_RESEARCH_REPORT.md",
    resultLabel: "Simulator findings",
  },
  {
    slug: "atlas",
    name: "ATLAS",
    field: "Retrieval & geometric learning",
    question: "Does structure add useful signal beyond semantic similarity?",
    summary:
      "Testing geometry, graph structure, and persistent topology for multi-hop retrieval—and retaining the negative result.",
    scope:
      "Controlled semantic, graph, and topology retrieval comparisons, alongside experimental local matching and compute-to-data prototypes.",
    status: "Evaluated · central hypothesis not supported",
    evidence:
      "Held-out HotpotQA and MuSiQue evaluations did not establish an improvement over semantic retrieval. Validation selected cosine-only retrieval as the primary V2 path.",
    limitations:
      "Evaluation uses internal held-out subsets of public development data, not official hidden-test scores. The result concerns the tested formulations, not all topology methods. Local prototypes have no established privacy guarantee or independent security audit.",
    repo: "ATLAS",
    branch: "main",
    report: "docs/MANIFOLD_V2_REPORT.md",
    resultLabel: "Negative result",
  },
  {
    slug: "neurosim",
    name: "NeuroSim",
    field: "Computational neuroscience",
    question: "How can neuron and network dynamics be explored across scales?",
    summary:
      "An implementation platform connecting biophysical neuron models, network simulation, and scientific visualization.",
    scope:
      "Repository-described Hodgkin–Huxley dynamics, multi-compartment models, synaptic plasticity, network simulation, and Python/C++ visualization and compute paths.",
    status: "Public implementation · scientific validation unverified",
    evidence:
      "The public README describes the architecture, models, interfaces, and simulation commands. These document intended and implemented scope, rather than a measured scientific result.",
    limitations:
      "The reviewed README does not establish biological validation, human-brain-scale performance, or verified MPI/CUDA scaling. No such results are claimed here.",
    repo: "nuerosim",
    branch: "main",
    resultLabel: "Implementation notes",
  },
];

export type EngineeringProject = {
  name: string;
  repo: string;
  category: string;
  description: string;
  note: string;
  language: string;
};
export const engineering: EngineeringProject[] = [
  {
    name: "AgentWatch",
    repo: "AgentWatch",
    category: "Observe & understand",
    description:
      "Runtime evidence, provenance, comparison, and replay for AI-native systems.",
    note: "The v3 README describes a passive instrument; most analysis capabilities remain experimental.",
    language: "Python",
  },
  {
    name: "PulseStack",
    repo: "PulseStack",
    category: "Observe & understand",
    description:
      "Observability and execution replay for distributed AI workflows and agents.",
    note: "The repository identifies the platform as under active development.",
    language: "Distributed systems",
  },
  {
    name: "RepoPilot",
    repo: "repopilot",
    category: "Build & orchestrate",
    description:
      "A repository agent that edits code, runs tests, and iterates on execution feedback.",
    note: "Test success is part of the workflow; it is not a guarantee of correctness or safety.",
    language: "Python",
  },
  {
    name: "VEX",
    repo: "VEX",
    category: "Build & orchestrate",
    description:
      "Content-hashed incremental builds with task skipping and a shared remote cache.",
    note: "A Rust implementation. No comparative performance claim is made here.",
    language: "Rust",
  },
  {
    name: "FluxCore",
    repo: "FluxCore",
    category: "Build & orchestrate",
    description:
      "Event-driven orchestration for reactive pipelines, services, and automation.",
    note: "Public implementation and architecture; production scale is not independently verified.",
    language: "Workflow infrastructure",
  },
  {
    name: "MEOWCODE",
    repo: "MEOWCODE",
    category: "Explore & apply",
    description:
      "A unified AI workspace that routes requests across configured providers.",
    note: "The README describes a Next.js frontend, Fastify API, and Postgres-backed deployment.",
    language: "TypeScript",
  },
  {
    name: "MYCELIUM",
    repo: "mycelium",
    category: "Explore & apply",
    description:
      "An evolutionary runtime for generating, mutating, and evaluating executable software.",
    note: "Architecture and runtime are documented; generalized self-improvement is not established.",
    language: "Evolutionary computation",
  },
  {
    name: "SentinelCV",
    repo: "SentinelCV",
    category: "Explore & apply",
    description:
      "Computer vision for fall detection and safety monitoring with CCTV and IP cameras.",
    note: "A public implementation; field reliability and safety certification are not verified.",
    language: "Computer vision",
  },
];

export const repoUrl = (repo: string) =>
  repo.startsWith("http") ? repo : `${github}/${repo}`;

export const reportUrl = (p: ResearchProject) => {
  const base = repoUrl(p.repo);
  return p.report
    ? `${base}/blob/${p.branch}/${p.report}`
    : `${base}#readme`;
};
