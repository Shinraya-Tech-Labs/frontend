"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/approved/Particles";
import TiltedCard from "@/components/approved/TiltedCard";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";
import { discordUrl, discordInviteCode } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center pt-28 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      
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

      {/* Cinematic Ambient Backdrop Wash */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d6b799]/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#dd3044]/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Grid container: Artistic Asymmetry */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pointer-events-none">
        
        {/* Left: Wide Typographic Core */}
        <div className="lg:col-span-8 space-y-8 pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#302e2a] bg-[#111110]/90 backdrop-blur-md text-xs font-mono text-[#d6b799] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#d6b799] animate-pulse" />
            Independent AI Research & Computational Systems
          </div>

          {/* Ultra-wide H1 strictly flowing in 2 to 3 lines */}
          <h1 className="max-w-5xl text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal tracking-tight text-[#f2eee7] leading-[1.05]">
            Investigating artificial intelligence{" "}
            <span className="font-serif italic text-[#d6b799] block sm:inline">
              beyond assumptions.
            </span>
          </h1>

          <p className="max-w-2xl text-base sm:text-xl text-[#aaa69e] font-light leading-relaxed">
            We isolate how intelligent systems reason, learn, and break under genuine stress—retaining negative outcomes, releasing live testbenches, and publishing reproducible experimental trails.
          </p>

          {/* High-Contrast Interactive CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/research"
              style={{ color: "#000000" }}
              className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d6b799] text-black font-semibold text-sm sm:text-base tracking-normal hover:bg-white transition-all duration-300 shadow-lg shadow-[#d6b799]/15 active:scale-95 cursor-pointer group"
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
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#454FBF] text-white font-semibold text-sm sm:text-base hover:bg-[#3942A8] transition-all duration-300 shadow-lg shadow-[#454FBF]/25 active:scale-95 cursor-pointer"
            >
              <span>Join Discord ({discordInviteCode})</span>
              <span aria-hidden="true" className="text-lg">↗</span>
            </a>

            <Link
              href="/engineering"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-transparent text-[#f2eee7] font-medium text-sm sm:text-base tracking-normal hover:border-white/50 hover:bg-white/5 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Engineering Systems
              <span className="text-lg">↗</span>
            </Link>
          </div>
        </div>

        {/* Right: 3D Interactive Tilted Emblem */}
        <div className="lg:col-span-4 relative flex justify-center lg:justify-end pointer-events-auto">
          <TiltedCard
            containerHeight="400px"
            containerWidth="380px"
            imageHeight="400px"
            imageWidth="380px"
            rotateAmplitude={14}
            scaleOnHover={1.04}
            showTooltip={false}
            glare={0.3}
            glareColor="#d6b799"
            className="rounded-3xl cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full h-full rounded-3xl border border-[#302e2a] bg-[#111110] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden">
              <HyperframeBeam radius={24} duration={8} />
              <HyperframeCorners size="text-[13px]" />

              <div className="relative w-full h-[280px] overflow-hidden rounded-2xl bg-[#090909]">
                <Image
                  src="/logo.webp"
                  alt="Shinraya Tech Labs Emblem"
                  fill
                  priority
                  className="object-cover object-center filter contrast-125"
                  sizes="(max-width: 768px) 320px, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-60" />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#f2eee7] bg-[#090909]/90 px-4 py-3 rounded-xl border border-[#302e2a]">
                <span className="tracking-widest">SHINRAYA LABS</span>
                <span className="text-[#d6b799] font-medium">TACTILE 3D CARD</span>
              </div>
            </div>
          </TiltedCard>
        </div>

      </div>
    </section>
  );
}
