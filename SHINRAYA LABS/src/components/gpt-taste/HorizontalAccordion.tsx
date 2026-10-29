"use client";

import React, { useState } from "react";
import { repoUrl } from "@/lib/projects";

type SystemItem = {
  name: string;
  repo: string;
  category: string;
  language: string;
  tagline: string;
  detail: string;
  statLabel: string;
  statValue: string;
};

const SYSTEMS: SystemItem[] = [
  {
    name: "RepoPilot",
    repo: "repopilot",
    category: "Autonomous Systems",
    language: "Python",
    tagline: "Autonomous repository modification and loop evaluation.",
    detail:
      "A code-modifying agent that iterates against test feedback, verifies execution boundaries, and checks invariants autonomously.",
    statLabel: "Runtime Architecture",
    statValue: "Execution Loop",
  },
  {
    name: "VEX",
    repo: "VEX",
    category: "Build Infrastructure",
    language: "Rust",
    tagline: "Content-hashed incremental build engine with zero cache misses.",
    detail:
      "Rust-engineered incremental pipeline with cryptographic cache verification, AST dependency graph isolation, and distributed task skipping.",
    statLabel: "Cache Mechanism",
    statValue: "BLAKE3 Tree Hash",
  },
  {
    name: "PulseStack",
    repo: "PulseStack",
    category: "Distributed Telemetry",
    language: "Systems Go",
    tagline: "Deterministic execution replay across multi-agent workflows.",
    detail:
      "Observability bus recording asynchronous message ordering, state transitions, and divergence traces across distributed AI actors.",
    statLabel: "Trace Fidelity",
    statValue: "Full Replay",
  },
  {
    name: "FluxCore",
    repo: "FluxCore",
    category: "Reactive Pipelines",
    language: "Workflow Infrastructure",
    tagline: "Event-driven orchestration for non-deterministic inference graphs.",
    detail:
      "Sub-millisecond event coordinator with automatic backpressure management, graceful model fallbacks, and transactional state reconciliation.",
    statLabel: "Coordination",
    statValue: "Zero-Loss Event Bus",
  },
];

export function HorizontalAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#302e2a]/50">
      <div className="mb-16 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799]" />
          Systems Engineering Arsenal
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#f2eee7] leading-[1.12]">
          Infrastructure built to <span className="font-serif italic text-[#d6b799]">render theory executable.</span>
        </h2>
        <p className="mt-4 text-[#aaa69e] text-base font-light leading-relaxed">
          Research cannot advance without rigorous instrumentation. Hover or select any system vector below to inspect its architecture.
        </p>
      </div>

      {/* Horizontal Accordion Container */}
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[460px] gap-4">
        {SYSTEMS.map((sys, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={sys.name}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-700 cursor-pointer flex flex-col justify-between p-7 lg:p-8 ${
                isActive
                  ? "lg:flex-[3] border-[#d6b799]/50 bg-gradient-to-b from-[#181816] to-[#0f0f0e] shadow-[0_0_50px_-20px_rgba(214,183,153,0.15)]"
                  : "lg:flex-[1] border-[#302e2a] bg-[#111110]/80 hover:border-[#302e2a]/90 hover:bg-[#141413]"
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono tracking-widest text-[#d6b799] uppercase">
                    {sys.category}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#302e2a]/60 text-[#aaa69e]">
                    {sys.language}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-normal text-[#f2eee7] tracking-tight">
                  {sys.name}
                </h3>
              </div>

              {/* Active content reveal */}
              <div
                className={`transition-all duration-500 my-6 ${
                  isActive ? "opacity-100 max-h-60" : "opacity-0 lg:max-h-0 hidden lg:block"
                }`}
              >
                <p className="text-base text-[#f2eee7] font-normal leading-relaxed">
                  {sys.tagline}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-[#aaa69e] font-light leading-relaxed">
                  {sys.detail}
                </p>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#302e2a]/60 font-mono text-xs">
                  <span className="text-[#aaa69e]">{sys.statLabel}</span>
                  <span className="text-[#d6b799] font-medium">{sys.statValue}</span>
                </div>
              </div>

              {/* Footer link */}
              <div className="pt-4 border-t border-[#302e2a]/40 flex items-center justify-between">
                <a
                  href={repoUrl(sys.repo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#d6b799] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Source Repository <span>↗</span>
                </a>
                <span className="text-[11px] font-mono text-[#aaa69e]">GitHub</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
