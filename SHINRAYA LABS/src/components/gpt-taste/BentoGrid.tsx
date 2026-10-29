"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";
import { HyperframeCounter } from "@/components/hyperframes/HyperframeCounter";

export function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-header > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".bento-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid-container",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-32 md:py-44 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d6b799]/5 blur-[160px] pointer-events-none rounded-full animate-ambient-drift" />

      <div className="bento-header mb-20 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799]" />
          Empirical Research Grid
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#f2eee7] leading-[1.1]">
          Investigating systems where <span className="font-serif italic text-[#d6b799]">outcomes remain unvarnished.</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[#aaa69e] max-w-2xl font-light leading-relaxed">
          Each program starts with a falsifiable hypothesis. We evaluate baselines against noisy real-world conditions and retain every negative result.
        </p>
      </div>

      {/* Gapless Bento Grid: 12 Columns, grid-flow-dense */}
      <div className="bento-grid-container grid grid-cols-1 md:grid-cols-12 grid-flow-dense gap-6">
        
        {/* Card 1: Robust Reasoning RL - 7 cols, 2 rows */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card group relative col-span-12 md:col-span-7 md:row-span-2 overflow-hidden rounded-2xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] p-8 md:p-10 flex flex-col justify-between transition-all duration-700 hover:border-[#d6b799]/40 hover:shadow-[0_0_50px_-15px_rgba(214,183,153,0.15)]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
            style={{
              background:
                "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
            }}
            aria-hidden="true"
          />
          <HyperframeBeam radius={16} duration={8} />
          <HyperframeCorners />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#aaa69e]">
                Reasoning & Reinforcement Learning
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-[#302e2a]/50 text-[#d6b799] border border-[#302e2a]">
                Pilot Complete
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#f2eee7] group-hover:text-white transition-colors">
              Robust Reasoning RL
            </h3>
            <p className="mt-4 text-[#aaa69e] text-sm sm:text-base leading-relaxed font-light">
              When verifiers are corrupted, biased, or noisy, what does a reasoning model actually learn? We isolate reward hacking by measuring uncertainty-aware reward shaping against GSM8K baselines.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-[#090909]/80 border border-[#302e2a]/60 font-mono text-xs text-[#aaa69e] space-y-2">
              <div className="flex justify-between border-b border-[#302e2a]/40 pb-2">
                <span className="text-[#f2eee7]">Target Hypothesis</span>
                <span>Uncertainty-penalized GRPO</span>
              </div>
              <div className="flex justify-between border-b border-[#302e2a]/40 pb-2">
                <span className="text-[#f2eee7]">GSM8K Baseline Pass@1</span>
                <span className="text-[#d6b799] font-medium"><HyperframeCounter value={78.4} decimals={1} suffix="%" /></span>
              </div>
              <div className="flex justify-between border-b border-[#302e2a]/40 pb-2">
                <span className="text-[#f2eee7]">Noise Corruption Tolerance</span>
                <span className="text-[#ff6b7a] font-medium"><HyperframeCounter value={30} suffix="%" /> Adversarial</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f2eee7]">Evidence Package</span>
                <span>Frozen Seeds & Checkpoints</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10 flex items-center justify-between border-t border-[#302e2a]/60 mt-8">
            <Link
              href="/research#robust-reasoning-rl"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#f2eee7] group-hover:text-[#d6b799] transition-colors"
            >
              Examine Experimental Protocol
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <span className="text-xs font-mono text-[#aaa69e]">codex/robust-reasoning</span>
          </div>

          {/* Background image texture */}
          <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
            <Image
              src="/logo.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover object-right-bottom scale-110 group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b]/80 to-transparent" />
          </div>
        </div>

        {/* Card 2: Quantum Advantage Simulator - 5 cols, 1 row */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card group relative col-span-12 md:col-span-5 md:row-span-1 overflow-hidden rounded-2xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] p-8 flex flex-col justify-between transition-all duration-700 hover:border-[#d6b799]/40 hover:shadow-[0_0_40px_-15px_rgba(214,183,153,0.12)]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
            style={{
              background:
                "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
            }}
            aria-hidden="true"
          />
          <HyperframeCorners />
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#aaa69e]">
                Quantum Computation
              </span>
              <span className="px-2.5 py-0.5 text-xs rounded-full bg-[#302e2a]/50 text-[#d6b799] border border-[#302e2a]">
                v0.1.0 Release
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#f2eee7] group-hover:text-white transition-colors">
              Quantum Advantage Simulator
            </h3>
            <p className="mt-3 text-[#aaa69e] text-xs sm:text-sm leading-relaxed font-light">
              Testing neural quantum states, VQE, and QAOA against exact classical references without presuming an asymptotic advantage.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-mono">
              <span className="text-[#aaa69e]">Fidelity: <span className="text-[#d6b799] font-medium"><HyperframeCounter value={0.982} decimals={3} /></span></span>
              <span className="text-[#302e2a]">|</span>
              <span className="text-[#aaa69e]">Circuit: <span className="text-[#f2eee7] font-medium"><HyperframeCounter value={8} suffix=" Qubits" /></span></span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#302e2a]/60 flex items-center justify-between">
            <Link
              href="/research#quantum-advantage-simulator"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#f2eee7] group-hover:text-[#d6b799] transition-colors"
            >
              View Benchmark Data <span>→</span>
            </Link>
            <span className="text-xs font-mono text-[#aaa69e]">Exact Reference</span>
          </div>
        </div>

        {/* Card 3: ATLAS Geometric Retrieval - 5 cols, 1 row */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card group relative col-span-12 md:col-span-5 md:row-span-1 overflow-hidden rounded-2xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] p-8 flex flex-col justify-between transition-all duration-700 hover:border-[#d6b799]/40 hover:shadow-[0_0_40px_-15px_rgba(214,183,153,0.12)]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
            style={{
              background:
                "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
            }}
            aria-hidden="true"
          />
          <HyperframeCorners />
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#aaa69e]">
                Geometric Learning
              </span>
              <span className="px-2.5 py-0.5 text-xs rounded-full bg-[#ff6b7a]/15 text-[#ff6b7a] border border-[#ff6b7a]/30">
                Negative Result Retained
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#f2eee7] group-hover:text-white transition-colors">
              ATLAS Manifold Engine
            </h3>
            <p className="mt-3 text-[#aaa69e] text-xs sm:text-sm leading-relaxed font-light">
              Evaluating persistent topology for multi-hop retrieval. Evaluated on HotpotQA; graph manifolds failed to outperform direct cosine similarity.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-mono">
              <span className="text-[#aaa69e]">HotpotQA Gain: <span className="text-[#ff6b7a] font-medium"><HyperframeCounter value={0.0} decimals={1} suffix="%" /></span></span>
              <span className="text-[#302e2a]">|</span>
              <span className="text-[#aaa69e]">Hypothesis: <span className="text-[#ff6b7a]">Refuted</span></span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#302e2a]/60 flex items-center justify-between">
            <Link
              href="/research#atlas"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#f2eee7] group-hover:text-[#d6b799] transition-colors"
            >
              Read Negative Report <span>→</span>
            </Link>
            <span className="text-xs font-mono text-[#aaa69e]">HotpotQA Audit</span>
          </div>
        </div>

        {/* Card 4: NeuroSim - 6 cols, 1 row */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card group relative col-span-12 md:col-span-6 md:row-span-1 overflow-hidden rounded-2xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] p-8 flex flex-col justify-between transition-all duration-700 hover:border-[#d6b799]/40"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
            style={{
              background:
                "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
            }}
            aria-hidden="true"
          />
          <HyperframeCorners />
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#aaa69e]">
                Computational Neuroscience
              </span>
              <span className="px-2.5 py-0.5 text-xs rounded-full bg-[#302e2a]/50 text-[#aaa69e] border border-[#302e2a]">
                Biophysical Modeling
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#f2eee7] group-hover:text-white transition-colors">
              NeuroSim Dynamics Platform
            </h3>
            <p className="mt-3 text-[#aaa69e] text-xs sm:text-sm leading-relaxed font-light">
              Multi-compartment Hodgkin–Huxley dynamics connected directly with continuous-time synaptic plasticity and scientific visualization engines.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-mono">
              <span className="text-[#aaa69e]">Resting Vm: <span className="text-[#d6b799] font-medium"><HyperframeCounter value={65} prefix="-" suffix=" mV" /></span></span>
              <span className="text-[#302e2a]">|</span>
              <span className="text-[#aaa69e]">Channels: <span className="text-[#f2eee7] font-medium">Na+ / K+</span></span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#302e2a]/60 flex items-center justify-between">
            <Link
              href="/research#neurosim"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#f2eee7] group-hover:text-[#d6b799] transition-colors"
            >
              Inspect Model Spec <span>→</span>
            </Link>
            <span className="text-xs font-mono text-[#aaa69e]">Python / C++</span>
          </div>
        </div>

        {/* Card 5: AgentWatch - 6 cols, 1 row */}
        <div
          onMouseMove={handleMouseMove}
          className="bento-card group relative col-span-12 md:col-span-6 md:row-span-1 overflow-hidden rounded-2xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] p-8 flex flex-col justify-between transition-all duration-700 hover:border-[#d6b799]/40"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
            style={{
              background:
                "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
            }}
            aria-hidden="true"
          />
          <HyperframeCorners />
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#aaa69e]">
                Autonomous Observability
              </span>
              <span className="px-2.5 py-0.5 text-xs rounded-full bg-[#302e2a]/50 text-[#d6b799] border border-[#302e2a]">
                Telemetry Suite
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#f2eee7] group-hover:text-white transition-colors">
              AgentWatch Instrumentation
            </h3>
            <p className="mt-3 text-[#aaa69e] text-xs sm:text-sm leading-relaxed font-light">
              Full-fidelity provenance, execution replay, and state divergence tracing for autonomous AI-native development workflows.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-mono">
              <span className="text-[#aaa69e]">Replay Determinism: <span className="text-[#d6b799] font-medium"><HyperframeCounter value={100} suffix="%" /></span></span>
              <span className="text-[#302e2a]">|</span>
              <span className="text-[#aaa69e]">Divergence: <span className="text-[#d6b799] font-medium">0 drift</span></span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#302e2a]/60 flex items-center justify-between">
            <Link
              href="/engineering"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#f2eee7] group-hover:text-[#d6b799] transition-colors"
            >
              Explore Observability Tools <span>→</span>
            </Link>
            <span className="text-xs font-mono text-[#aaa69e]">v3 Runtime</span>
          </div>
        </div>

      </div>
    </section>
  );
}
