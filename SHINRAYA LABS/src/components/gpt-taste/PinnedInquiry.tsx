"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";

export function PinnedInquiry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the left column on desktop screens
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top+=100",
        end: "bottom bottom",
        pin: leftColRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // Scrubbed lift & reveal for right column cards as they scroll in
      const cards = gsap.utils.toArray<HTMLElement>(".pinned-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0.35, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#302e2a]/50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Pinned on Desktop */}
        <div ref={leftColRef} className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799]" />
            Methodological Dissection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#f2eee7] leading-[1.12]">
            Evidence over intuition. <span className="font-serif italic text-[#d6b799]">Every hypothesis tested to failure.</span>
          </h2>
          <p className="text-base text-[#aaa69e] font-light leading-relaxed">
            Standard literature often hides negative outcomes, selectively tunes seeds, and overclaims generalization. Shinraya Tech Labs archives complete runs, unadulterated failure modes, and open benchmarks.
          </p>
          <div className="pt-4">
            <Link
              href="/about"
              style={{ color: "#000000" }}
              className="inline-flex items-center gap-3 text-sm font-semibold text-black bg-[#d6b799] hover:bg-white px-6 py-3 rounded-full transition-colors duration-300"
            >
              <span style={{ color: "#000000" }}>Read Our Lab Principles</span>
              <span aria-hidden="true" style={{ color: "#000000" }}>→</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Dynamic Scrolling Stack */}
        <div className="lg:col-span-7 space-y-8">
          
          <div
            onMouseMove={handleMouseMove}
            className="pinned-card group relative overflow-hidden p-8 md:p-10 rounded-2xl border border-[#302e2a] bg-[#111110] space-y-4 hover:border-[#d6b799]/40 transition-all duration-500"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
              }}
              aria-hidden="true"
            />
            <HyperframeCorners size="text-[10px]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
              Controlled Evaluation
            </span>
            <h3 className="text-2xl font-normal text-[#f2eee7]">
              Isolating Reward Drift Under Corrupted Ground Truth
            </h3>
            <p className="text-[#aaa69e] text-sm leading-relaxed font-light">
              Reinforcement learning with generative reward verifiers degrades quickly when reward models are queried out of distribution. We systematically inject adversarial labels, measuring policy entropy and reward divergence across verified math benchmarks.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#aaa69e]">
              <span>Benchmark: GSM8K Math</span>
              <span>Metric: Pass@1 vs Hack Index</span>
            </div>
          </div>

          <div
            onMouseMove={handleMouseMove}
            className="pinned-card group relative overflow-hidden p-8 md:p-10 rounded-2xl border border-[#302e2a] bg-[#111110] space-y-4 hover:border-[#d6b799]/40 transition-all duration-500"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
              }}
              aria-hidden="true"
            />
            <HyperframeCorners size="text-[10px]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
              Classical Reference Comparison
            </span>
            <h3 className="text-2xl font-normal text-[#f2eee7]">
              Demarcating Genuine Advantage from Optimization Artifacts
            </h3>
            <p className="text-[#aaa69e] text-sm leading-relaxed font-light">
              Quantum algorithms frequently benchmark against unoptimized classical baselines to demonstrate artificial speedups. We pair exact tensor network contractions and state vector references against VQE and QAOA formulations to record the real computational boundary.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#aaa69e]">
              <span>Simulator: Minimal-basis VQE</span>
              <span>Reference: Exact Classical Solver</span>
            </div>
          </div>

          <div
            onMouseMove={handleMouseMove}
            className="pinned-card group relative overflow-hidden p-8 md:p-10 rounded-2xl border border-[#302e2a] bg-[#111110] space-y-4 hover:border-[#d6b799]/40 transition-all duration-500"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit] z-10"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(214, 183, 153, 0.08), transparent 75%)",
              }}
              aria-hidden="true"
            />
            <HyperframeCorners size="text-[10px]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ff6b7a]">
              Negative Outcome Discipline
            </span>
            <h3 className="text-2xl font-normal text-[#f2eee7]">
              Preserving Hypotheses That Failed in Empirical Tests
            </h3>
            <p className="text-[#aaa69e] text-sm leading-relaxed font-light">
              In the ATLAS evaluation, high-dimensional topological invariants and persistent homology failed to surpass direct dense vector embeddings on multi-hop QA tasks. We published the negative findings alongside complete HotpotQA validation runs.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#aaa69e]">
              <span>Dataset: HotpotQA / MuSiQue</span>
              <span>Finding: Cosine Retrieval Wins</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
