"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Particles from "@/components/approved/Particles";
import { QuantumBlochSphere } from "@/components/interactive/QuantumBlochSphere";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";
import { discordUrl, discordInviteCode } from "@/lib/site";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.75, delay: 0.1 }
      )
        .fromTo(
          ".hero-heading",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.95 },
          "-=0.45"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.55"
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, y: 18, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-card-col",
          { opacity: 0, x: 40, scale: 0.93 },
          { opacity: 1, x: 0, scale: 1, duration: 1.15, ease: "power4.out" },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[95vh] flex items-center justify-center pt-28 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      
      {/* Interactive WebGL2 Particles Background Layer */}
      <div className="absolute inset-0 pointer-events-auto z-0 opacity-40">
        <Particles
          particleCount={90}
          particleSpread={10}
          speed={0.15}
          particleColors={["#d6b799", "#dd3044", "#ffffff"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          connections={true}
          connectionDistance={95}
          clickBurst={true}
          hoverEffect="repel"
          shape="circle"
          className="w-full h-full"
        />
      </div>

      {/* Cinematic Ambient Backdrop Wash with slow orbital drift */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d6b799]/10 blur-[180px] pointer-events-none rounded-full animate-ambient-drift" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#dd3044]/5 blur-[160px] pointer-events-none rounded-full animate-ambient-drift" />

      {/* Grid container: Artistic Asymmetry */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pointer-events-none">
        
        {/* Left: Wide Typographic Core */}
        <div className="lg:col-span-8 space-y-8 pointer-events-auto">
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#302e2a] bg-[#111110]/90 backdrop-blur-md text-xs font-mono text-[#d6b799] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#d6b799] animate-pulse" />
            Independent AI Research & Computational Systems
          </div>

          {/* Ultra-wide H1 strictly flowing in 2 to 3 lines */}
          <h1 className="hero-heading max-w-5xl text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal tracking-tight text-[#f2eee7] leading-[1.05]">
            Investigating artificial intelligence{" "}
            <span className="font-serif italic text-[#d6b799] block sm:inline">
              beyond assumptions.
            </span>
          </h1>

          <p className="hero-desc max-w-2xl text-base sm:text-xl text-[#aaa69e] font-light leading-relaxed">
            We isolate how intelligent systems reason, learn, and break under genuine stress—retaining negative outcomes, releasing live testbenches, and publishing reproducible experimental trails.
          </p>

          {/* High-Contrast Interactive CTAs */}
          <div className="hero-ctas pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/research"
              style={{ color: "#000000" }}
              className="hero-cta-btn relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d6b799] text-black font-semibold text-sm sm:text-base tracking-normal hover:bg-white transition-all duration-300 shadow-lg shadow-[#d6b799]/15 active:scale-95 cursor-pointer group"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full animate-hyper-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
              />
              <span style={{ color: "#000000" }} className="relative z-10">Explore Research Archive</span>
              <span aria-hidden="true" style={{ color: "#000000" }} className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#454FBF] text-white font-semibold text-sm sm:text-base hover:bg-[#3942A8] transition-all duration-300 shadow-lg shadow-[#454FBF]/25 active:scale-95 cursor-pointer"
            >
              <span>Join Discord ({discordInviteCode})</span>
              <span aria-hidden="true" className="text-lg">↗</span>
            </a>

            <Link
              href="/engineering"
              className="hero-cta-btn inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-transparent text-[#f2eee7] font-medium text-sm sm:text-base tracking-normal hover:border-white/50 hover:bg-white/5 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Engineering Systems
              <span className="text-lg">↗</span>
            </Link>
          </div>
        </div>

        {/* Right: Real Interactive 3D WebGL Bloch Sphere */}
        <div className="hero-card-col lg:col-span-4 relative flex justify-center lg:justify-end pointer-events-auto w-full max-w-[420px] mx-auto lg:mx-0">
          <div className="relative w-full rounded-3xl group">
            <HyperframeBeam radius={24} duration={8} />
            <HyperframeCorners size="text-[13px]" />
            <QuantumBlochSphere className="w-full" />
          </div>
        </div>

      </div>
    </section>
  );
}
