"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "REPRODUCIBLE RESEARCH PROTOCOLS",
  "NEGATIVE OUTCOME REPORTING",
  "GEOMETRIC LEARNING & TOPOLOGY",
  "QUANTUM ADVANTAGE SIMULATION",
  "ROBUST REASONING UNDER CORRUPT VERIFIERS",
  "BIOPHYSICAL NEURAL DYNAMICS",
  "HELD-OUT EMPIRICAL VALIDATION",
  "OPEN RUNTIME INSTRUMENTATION",
];

export function Marquee() {
  return (
    <div className="w-full overflow-hidden border-y border-[#302e2a]/60 bg-[#0c0c0b] py-5 select-none">
      <div className="flex w-max animate-marquee space-x-12">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-6 text-xs uppercase tracking-[0.25em] text-[#aaa69e]/80"
          >
            <span>{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#d6b799]/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
