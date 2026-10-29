import type { Metadata } from "next";
import { github, repoUrl } from "@/lib/projects";
import { PageIntro, Eyebrow, ExternalLink, CollaborationCTA } from "@/components/editorial";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";

export const metadata: Metadata = {
  title: "Contribute & Collaborate",
  description:
    "Reproduce experiments, audit models, improve runtime instrumentation, and contribute to open science with Shinraya Tech Labs.",
  alternates: { canonical: "/contribute" },
};

export default function Contribute() {
  return (
    <div className="relative w-full min-h-screen bg-[#090909] text-[#f2eee7]">
      <PageIntro
        category="Open Collaboration"
        title="Bring your questions."
        italic="Build with us."
        description="You do not need a formal academic proposal to make an impactful contribution. An independent reproduction run, an edge-case bug report, or a clearer limitation note moves the entire science forward."
      />

      {/* Getting Started Pipeline */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
        <div className="group relative overflow-hidden p-8 sm:p-12 lg:p-16 rounded-3xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] space-y-12">
          <HyperframeBeam radius={24} duration={9} />
          <HyperframeCorners size="text-[13px]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#302e2a]/60">
            <div className="space-y-3">
              <Eyebrow>Contribution Pipeline</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-normal text-[#f2eee7] tracking-tight">
                One open source workflow to begin.
              </h2>
              <p className="text-base text-[#aaa69e] font-light max-w-xl">
                Start with a repository README, check the evidence boundaries, and propose small, easily testable changes.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#d6b799] text-[#090909] font-medium text-sm hover:bg-white transition-all duration-300 shadow-lg shadow-[#d6b799]/10"
              >
                GitHub Organization <span>↗</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                Stage 1
              </span>
              <h3 className="text-xl font-normal text-[#f2eee7]">
                Choose an experimental vector.
              </h3>
              <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                Review a project README and its stated limitations. Identify a specific question, boundary condition, or test failure small enough to isolate.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                Stage 2
              </span>
              <h3 className="text-xl font-normal text-[#f2eee7]">
                Discuss before implementing.
              </h3>
              <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                Open an issue in the target repository to align on scope. Share expected results, hardware constraints, and baseline comparison plans.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                Stage 3
              </span>
              <h3 className="text-xl font-normal text-[#f2eee7]">
                Submit reproducible artifacts.
              </h3>
              <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                Follow repository contribution rules. Include test suites, random seeds, environment lockfiles, and clear documentation with your pull request.
              </p>
            </div>
          </div>
        </div>

        {/* Ways to Participate */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
              Engagement Vectors
            </span>
            <h2 className="text-3xl font-normal text-[#f2eee7] tracking-tight">
              Small contributions. Real empirical value.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#111110] flex flex-col justify-between space-y-6 hover:border-[#d6b799]/40 transition-colors">
              <HyperframeBeam radius={16} duration={8} />
              <HyperframeCorners size="text-[11px]" />
              <div className="space-y-3 relative z-10">
                <span className="text-xs font-mono text-[#d6b799] uppercase tracking-wider">
                  Empirical Science
                </span>
                <h3 className="text-2xl font-normal text-[#f2eee7]">
                  Reproduce an experiment.
                </h3>
                <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                  Rerun an evaluation protocol on your own hardware. Record hardware discrepancies, seed variance, and whether conclusions hold.
                </p>
              </div>
              <div className="pt-4 border-t border-[#302e2a]/50 relative z-10">
                <ExternalLink href={`${repoUrl("ATLAS")}/issues`}>
                  ATLAS Issue Tracker
                </ExternalLink>
              </div>
            </div>

            <div className="group relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#111110] flex flex-col justify-between space-y-6 hover:border-[#d6b799]/40 transition-colors">
              <HyperframeBeam radius={16} duration={9} />
              <HyperframeCorners size="text-[11px]" />
              <div className="space-y-3 relative z-10">
                <span className="text-xs font-mono text-[#d6b799] uppercase tracking-wider">
                  Software Infrastructure
                </span>
                <h3 className="text-2xl font-normal text-[#f2eee7]">
                  Strengthen the tools.
                </h3>
                <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                  Refactor runtime tracing, increase test coverage, or benchmark execution replay performance in AgentWatch and PulseStack.
                </p>
              </div>
              <div className="pt-4 border-t border-[#302e2a]/50 relative z-10">
                <ExternalLink href={`${repoUrl("AgentWatch")}/issues`}>
                  AgentWatch Issue Tracker
                </ExternalLink>
              </div>
            </div>

            <div className="group relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#111110] flex flex-col justify-between space-y-6 hover:border-[#d6b799]/40 transition-colors">
              <HyperframeBeam radius={16} duration={10} />
              <HyperframeCorners size="text-[11px]" />
              <div className="space-y-3 relative z-10">
                <span className="text-xs font-mono text-[#d6b799] uppercase tracking-wider">
                  Documentation & Auditing
                </span>
                <h3 className="text-2xl font-normal text-[#f2eee7]">
                  Clarify the protocols.
                </h3>
                <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                  Document hidden assumptions, clarify setup requirements, or point out unverified claims in our specifications.
                </p>
              </div>
              <div className="pt-4 border-t border-[#302e2a]/50 relative z-10">
                <ExternalLink href={`${repoUrl("quantum-advantage-simulator")}/issues`}>
                  Simulator Issue Tracker
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Guidelines Box */}
        <div className="relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#141413]/60 space-y-4">
          <HyperframeCorners size="text-[11px]" />
          <Eyebrow>Project-Specific Guidelines</Eyebrow>
          <h3 className="text-xl font-normal text-[#f2eee7]">
            Review repository guidance before opening pull requests.
          </h3>
          <p className="text-sm text-[#aaa69e] font-light leading-relaxed max-w-3xl">
            Each project maintains distinct licensing, typing, and testing fixtures. Please consult the dedicated contribution documents below:
          </p>
          <div className="pt-2 flex flex-wrap gap-6 text-sm">
            <ExternalLink href={`${repoUrl("AgentWatch")}/blob/main/CONTRIBUTING.md`}>
              AgentWatch Contributing Guide
            </ExternalLink>
            <ExternalLink href={`${repoUrl("quantum-advantage-simulator")}/blob/main/CONTRIBUTING.md`}>
              Quantum Simulator Contributing Guide
            </ExternalLink>
          </div>
        </div>
      </section>

      <CollaborationCTA />
    </div>
  );
}
