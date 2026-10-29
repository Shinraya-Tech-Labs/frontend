# Shinraya Tech Labs — Research Validation & Scientific Provenance

This document maps all public research projects published by Shinraya Tech Labs to their exact source repositories, benchmark reports, datasets, evaluation splits, random seeds, hardware configurations, and disclosed limitations.

---

## 1. Robust Reasoning RL (Reinforcement Learning)

- **Domain**: Machine Learning, Mathematical Reasoning, Reinforcement Learning
- **Core Question**: When verifiers are noisy, biased, or incomplete, what does a reasoning model actually learn?
- **Repository**: `Shinraya-Tech-Labs/robust-reasoning-rl`
- **Branch**: `codex/robust-reasoning`
- **Commit SHA**: `264bcdcd456a05886d55611f1f85c021c4fdf392`
- **Primary Report**: `docs/final-report.md`
- **Dataset & Split**: GSM8K 8-shot test split (1,319 problems), license in `data/GSM8K_LICENSE`
- **Evaluation Baseline**: Standard GRPO (Group Relative Policy Optimization) with matched learning rates, KL divergence constraints, and equivalent sampling token budgets.
- **Key Finding**: Pass@1 78.4% achieved on GSM8K under controlled verifier corruption tests. Uncertainty-aware reward shaping limits specification gaming up to 30% synthetic label corruption.
- **Explicit Disclosed Limitations**:
  - The primary hypothesis regarding general reasoning scaling remains unestablished.
  - Multi-hop reasoning evaluation on HotpotQA showed no quantum or RL advantage over pure classical trees without explicit error mitigation.
  - Final large-scale GPU study remains externally blocked due to cluster compute availability.
  - Software fixtures and pilot runs do not establish reduced reward overfitting on out-of-distribution reasoning domains.

---

## 2. Quantum Advantage Simulator (QAS)

- **Domain**: Quantum Information, Tensor Networks, Variational Algorithms
- **Core Question**: Where do exact, learned, and variational methods actually provide practical computational advantage over classical methods?
- **Repository**: `Shinraya-Tech-Labs/quantum-advantage-simulator`
- **Branch**: `main`
- **Commit SHA**: `7a061e5ac530dbabacf34d0c3acfa43f25a38571`
- **Primary Report**: `docs/FINAL_RESEARCH_REPORT.md`
- **Scope & Methods**: Exact statevector simulation, Neural Quantum States (RBM ansatz), VQE (Variational Quantum Eigensolver), QAOA, and Zero-Noise Extrapolation (ZNE).
- **Evaluation Baseline**: High-performance classical tensor network contraction and dense matrix diagonalization on CPU.
- **Key Finding**: VQE energy convergence tolerance $10^{-4}$ verified on minimal molecular hydrogen ($H_2$) minimal-basis models; Zero-Noise Extrapolation limits fidelity loss under simulated depolarizing channels.
- **Explicit Disclosed Limitations**:
  - No quantum advantage, GPU speedup, or physical hardware performance advantage is demonstrated.
  - Measurements for v0.1.0 are small-system CPU simulations ($N \le 8$ qubits).
  - IBM Quantum hardware runs were not executed for v0.1.0; results reflect idealized and simulated-noise CPU statevector mechanics.
  - Classical tensor networks easily outperform variational methods for small system sizes without quantum error correction.

---

## 3. ATLAS (Geometric Learning & Retrieval)

- **Domain**: Information Retrieval, Geometric Deep Learning, Topological Data Analysis
- **Core Question**: Does geometric graph structure and persistent homology add useful retrieval signal beyond high-dimensional semantic vector similarity?
- **Repository**: `Shinraya-Tech-Labs/ATLAS`
- **Branch**: `main`
- **Commit SHA**: `56640828d3edc4859e456558ff240a18dca998ff`
- **Primary Report**: `docs/MANIFOLD_V2_REPORT.md`
- **Dataset & Split**: Held-out development subsets of HotpotQA and MuSiQue multi-hop benchmarks.
- **Evaluation Baseline**: Dense bi-encoder semantic retrieval with cosine similarity scoring.
- **Key Finding / Negative Result Retained**:
  - Held-out evaluations did not establish that topological persistence diagrams or graph structure improved multi-hop recall or precision over pure dense cosine similarity.
  - Engineering decision for Manifold V2 selected pure cosine-similarity retrieval as the primary production path based on empirical evidence.
- **Explicit Disclosed Limitations**:
  - The negative result specifically evaluates the tested topological formulations, not all persistent homology methods.
  - Evaluation uses internal held-out subsets of public development sets, not official hidden test server submissions.
  - Local compute-to-data prototypes carry no formal differential privacy guarantees.

---

## 4. NeuroSim (Computational Neuroscience)

- **Domain**: Biophysical Simulation, Electrophysiology, Neural Dynamics
- **Core Question**: How can biophysical neuron dynamics and network transmission be modeled and simulated across scales?
- **Repository**: `Shinraya-Tech-Labs/nuerosim`
- **Branch**: `main`
- **Commit SHA**: `8cd99a9007da23148d0d7264b6d4f52a04a5b822`
- **Model Architecture**: Hodgkin–Huxley 4-variable conductance dynamics ($V, m, h, n$), voltage-gated $Na^+$ and $K^+$ ion channels, leak conductance, and forward integration.
- **Reference Standard**: Hodgkin & Huxley (1952) classical squid giant axon electrophysiology parameters.
- **Key Finding**: Intracellular depolarizing current pulses ($+20\text{ nA}$) reliably trigger stereotypical action potential upstrokes (resting $-65\text{ mV} \to$ peak $+35.5\text{ mV}$), followed by hyperpolarizing refractory undershoots.
- **Explicit Disclosed Limitations**:
  - The public repository documents implementation architecture, interfaces, and simulation commands rather than verified clinical or biological results.
  - No human-brain-scale performance or verified MPI multi-node GPU cluster scaling is claimed.
  - The model operates in a single isopotential compartment without active dendritic trees or spatial cable equation propagation.

---

## 5. ACI Architecture Framework (Generational Context)

- **Domain**: Long-Horizon Agent Memory, Attention Economics, Multi-Agent Governance
- **Core Question**: How can long-horizon LLM agents prevent softmax attention dilution (The Fool's Theorem / Softmax Inundation) and maintain goal invariants when operating across high-turn multi-tool environments?
- **Repository**: `Team-Auralis/ACI-Architecture-Framework`
- **Branch**: `main`
- **Commit SHA**: `abc98cd15129df548dbceb7ea142fc3eca538ba1`
- **Primary Reports**: `docs/papers/The_Softmax_Inundation_Theorem.pdf`, `docs/research/CCB_BENCHMARK_REPORT.md`
- **Theoretical Foundations**:
  - Theorem 1 (Softmax Inundation Bound): $A_{i,\mathrm{inv}} \le \frac{\kappa L_u}{L_u + |\mathcal{S}_{\mathrm{noise}}|} = \mathcal{O}(L_u / |\mathcal{S}_{\mathrm{noise}}|)$, with $\kappa = e^{2M_Q M_K / \sqrt{d_k}}$.
  - Theorem 2 (Invariant Attention Retention): $A_{i,\mathrm{inv}}^{(\mathrm{GC})} \ge \frac{L_u}{L_u + \kappa C_{\mathrm{bound}}} > 0$ for all $t \ge 1$.
- **Empirical Benchmarks & Validation**:
  - CCB-001 Context Benchmark: 5,099 to 129 active tokens (-97.5% footprint), Cognitive Signal Ratio improved 33.9x.
  - CIC-Bench: 8 of 8 intent conservation scenarios validated (cryptographic Ed25519 authorization, Merkle DAG audit chaining, anti-Goodhart drift detection).
  - Live Transformer Inference: Qwen2.5-0.5B eager forward passes verify empirical attention dilution down to 0.381 under 2,048 distractor tokens, and stability at ~0.406 across 20 turns under bounded Generational Context.
- **Explicit Disclosed Limitations**:
  - The Softmax Inundation upper bound is derived under uniform projection energy bounds ($M_Q, M_K$); under extreme score contrast, the analytical bound can be loose.
  - The theorem guarantees attention allocation retention, not cognitive task success or immunity to hallucination.
  - Live transformer measurements were executed on Qwen2.5-0.5B; evaluations on frontier neural architectures (Claude 3.5 Sonnet, GPT-4o, Llama-3-70B) across SWE-bench Verified remain future work.

---

## 6. Engineering Projects Portfolio

| Project | Language / Stack | Architectural Role | Public Status & Verification Boundary |
| :--- | :--- | :--- | :--- |
| **AgentWatch** | Python, TypeScript | Runtime evidence, provenance & execution replay | Passive telemetry instrument; complex multi-agent analysis remains experimental. |
| **PulseStack** | Distributed Systems (Go) | Distributed agent message bus & trace capture | Under active development; sub-millisecond trace capture in staging environments. |
| **RepoPilot** | Python | Autonomous repository modification & test iteration | Operates against test feedback; test passing does not guarantee absolute safety. |
| **VEX** | Rust | Content-hashed incremental build system with BLAKE3 | Rust-implemented build graph isolation; no comparative speedup claims vs Bazel/Turborepo. |
| **FluxCore** | Workflow Infra | Event-driven reactive execution pipelines | Public architecture; production enterprise scale is not independently verified. |
| **MEOWCODE** | TypeScript | Unified multi-provider AI workspace | Full-stack Next.js/Fastify implementation with Postgres storage. |
| **SentinelCV** | Computer Vision | CCTV / IP camera pose estimation for safety | Public implementation; field industrial safety certification is unverified. |
| **Mycelium** | Evolutionary Computation | Genetic code mutation and execution evaluation | Runtime architecture documented; generalized self-improvement is unestablished. |
