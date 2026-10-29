import React from "react";
import Link from "next/link";
import SpotlightCard from "./approved/SpotlightCard";
import AnimatedContent from "./approved/AnimatedContent";
import { github, type ResearchProject } from "@/lib/projects";
import { discordUrl } from "@/lib/site";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">{diagonal ? "↗" : "→"}</span>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#d6b799]" aria-hidden="true" />
      {children}
    </div>
  );
}

export function PageIntro({
  category = "Shinraya Tech Labs",
  title,
  italic,
  description,
}: {
  number?: string;
  category?: string;
  title: string;
  italic?: string;
  description: string;
}) {
  return (
    <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d6b799]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="relative z-10 max-w-5xl space-y-6">
        <Eyebrow>{category}</Eyebrow>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#f2eee7] leading-[1.08]">
          {title}{" "}
          {italic && (
            <span className="font-serif italic text-[#d6b799] block sm:inline">
              {italic}
            </span>
          )}
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-[#aaa69e] font-light leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}

export function ResearchCard({
  project,
}: {
  project: ResearchProject;
  index?: number;
}) {
  return (
    <AnimatedContent className="motion-card">
      <SpotlightCard
        className="group relative overflow-hidden rounded-2xl border border-[#302e2a] bg-[#111110] p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#d6b799]/40 hover:shadow-[0_0_35px_-10px_rgba(214,183,153,0.12)] h-full"
        spotlightColor="#d6b799"
        intensity={0.06}
        borderGlow={0.15}
        proximity={0}
        flare={false}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
              {project.field}
            </span>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-[#302e2a]/50 text-[#f2eee7] border border-[#302e2a]">
              {project.resultLabel}
            </span>
          </div>

          <h3 className="text-2xl font-normal tracking-tight text-[#f2eee7] group-hover:text-white transition-colors">
            <Link href={`/research#${project.slug}`}>{project.name}</Link>
          </h3>

          <p className="text-sm text-[#aaa69e] leading-relaxed font-light">
            {project.summary}
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-[#302e2a]/60">
          <Link
            className="inline-flex items-center gap-2 text-xs font-medium text-[#d6b799] group-hover:text-white transition-colors"
            href={`/research#${project.slug}`}
          >
            Explore the research <Arrow />
          </Link>
        </div>
      </SpotlightCard>
    </AnimatedContent>
  );
}

export function CollaborationCTA() {
  return (
    <section className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#302e2a]/50">
      <div className="relative overflow-hidden rounded-3xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] p-8 sm:p-14 lg:p-20 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#d6b799]/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <Eyebrow>Open Verification & Community</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#f2eee7] leading-[1.12]">
            Good questions deserve <span className="font-serif italic text-[#d6b799]">independent reproduction.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#aaa69e] font-light leading-relaxed max-w-2xl">
            Reproduce an experiment, challenge an assumption, or join the discussion with fellow researchers on Discord and GitHub.
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#454FBF] text-white font-semibold text-sm hover:bg-[#3942A8] transition-all duration-300 shadow-lg shadow-[#454FBF]/25"
            >
              Join Discord (UT9uaeY46e) <Arrow diagonal />
            </a>
            <Link
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#d6b799] text-black font-semibold text-sm hover:bg-white transition-all duration-300 shadow-lg shadow-[#d6b799]/10"
              href="/contribute"
            >
              Contribute to the Work <Arrow />
            </Link>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-transparent text-[#f2eee7] font-medium text-sm hover:border-white/50 hover:bg-white/5 transition-all duration-300"
            >
              GitHub Organization <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExternalLink({
  href,
  children,
  className = "text-sm text-[#d6b799] hover:text-white transition-colors inline-flex items-center gap-1.5",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <Arrow diagonal />
    </a>
  );
}

export function GitHubLink() {
  return <ExternalLink href={github}>Explore GitHub</ExternalLink>;
}
