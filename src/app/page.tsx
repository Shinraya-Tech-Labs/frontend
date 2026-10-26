import type { Metadata } from "next";
import { HeroSection } from "@/components/gpt-taste/HeroSection";
import { Marquee } from "@/components/gpt-taste/Marquee";
import { BentoGrid } from "@/components/gpt-taste/BentoGrid";
import { TestbenchSimulator } from "@/components/interactive/TestbenchSimulator";
import { ScrubbingManifesto } from "@/components/gpt-taste/ScrubbingManifesto";
import { PinnedInquiry } from "@/components/gpt-taste/PinnedInquiry";
import { HorizontalAccordion } from "@/components/gpt-taste/HorizontalAccordion";
import { ActionSection } from "@/components/gpt-taste/ActionSection";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#090909] text-[#f2eee7] selection:bg-[#d6b799] selection:text-[#090909]">
      {/* Attention: Interactive WebGL2 Particles + 3D Tilted Card Hero */}
      <HeroSection />

      {/* Infinite Marquee of Research Principles */}
      <Marquee />

      {/* Interest: Mathematically Gapless 12-Column Bento Grid */}
      <BentoGrid />

      {/* Interactive Hands-On Scientific Simulation Testbench */}
      <TestbenchSimulator />

      {/* Desire: Scrubbing Text Reveal with Inline Typography Images */}
      <ScrubbingManifesto />

      {/* Desire: GSAP Pinned Split Inquiry Gallery */}
      <PinnedInquiry />

      {/* Component Arsenal: Systems Engineering Horizontal Accordion */}
      <HorizontalAccordion />

      {/* Action: Massive High-Contrast CTA Section */}
      <ActionSection />
    </div>
  );
}
