"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrubbingManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".scrub-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const manifestoText =
    "We investigate how computational systems reason, adapt, and decompose under genuine stress. Rather than accepting optimistic benchmarks or polished vendor summaries, our research isolates fundamental algorithmic limits, measures verifiable failure rates, and open-sources every artifact so anyone can verify our conclusions directly.";

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-36 md:py-52 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      <div className="space-y-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799]" />
          Statement of Inquiry
        </div>

        {/* Heading with Inline Typography Images */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#f2eee7] leading-[1.2]">
          We dismantle
          <span
            className="inline-block w-20 sm:w-28 h-8 sm:h-12 rounded-full align-middle bg-cover bg-center mx-3 border border-[#d6b799]/40 shadow-inner"
            style={{
              backgroundImage: "url('/logo.webp')",
              filter: "contrast(1.2) brightness(0.9)",
            }}
            aria-hidden="true"
          />
          intelligence to its computational foundations,
          <span
            className="inline-block w-20 sm:w-28 h-8 sm:h-12 rounded-full align-middle bg-cover bg-center mx-3 border border-[#d6b799]/40 shadow-inner"
            style={{
              backgroundImage: "url('/logo.webp')",
              filter: "contrast(1.3) grayscale(0.5)",
            }}
            aria-hidden="true"
          />
          leaving no assumption unchallenged.
        </h2>

        {/* Accessible full text for screen readers and audit tools */}
        <p className="sr-only">{manifestoText}</p>

        {/* Scrubbing Visual Paragraph */}
        <p
          ref={textRef}
          aria-hidden="true"
          className="text-xl sm:text-2xl md:text-3xl font-light text-[#f2eee7] leading-relaxed tracking-tight max-w-5xl"
        >
          {manifestoText.split(" ").map((word, i) => (
            <span key={i} className="scrub-word inline-block mr-[0.28em] transition-opacity">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
