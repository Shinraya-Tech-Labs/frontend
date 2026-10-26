"use client";

import React from "react";
import Link from "next/link";
import { github } from "@/lib/projects";
import { discordUrl } from "@/lib/site";

export function ActionSection() {
  return (
    <section className="relative w-full py-36 md:py-48 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#302e2a]/60">
      <div className="relative overflow-hidden rounded-3xl border border-[#302e2a] bg-gradient-to-b from-[#171615] to-[#0d0d0c] p-10 sm:p-16 lg:p-24 shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#d6b799]/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#dd3044]/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799]" />
            Open Collaboration & Community
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f2eee7] leading-[1.08]">
            Good questions deserve <span className="font-serif italic text-[#d6b799]">independent reproduction.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#aaa69e] font-light leading-relaxed max-w-2xl">
            Clone our experimental repositories, challenge our evaluations, or join our Discord community to discuss AI research and systems engineering directly.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5865F2] text-white font-medium text-sm sm:text-base hover:bg-[#4752C4] transition-all duration-300 shadow-xl shadow-[#5865F2]/20 active:scale-95"
            >
              Join Discord (UT9uaeY46e)
              <span>↗</span>
            </a>

            <Link
              href="/contribute"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d6b799] text-[#090909] font-medium text-sm sm:text-base hover:bg-white transition-all duration-300 shadow-xl shadow-[#d6b799]/15 active:scale-95"
            >
              Contribute to the Work
              <span>→</span>
            </Link>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-transparent text-[#f2eee7] font-medium text-sm sm:text-base hover:border-white/50 hover:bg-white/5 transition-all duration-300 active:scale-95"
            >
              GitHub Organization
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
