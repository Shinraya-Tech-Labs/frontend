import type { Metadata } from "next";
import { PageIntro, Eyebrow, CollaborationCTA } from "@/components/editorial";
import { QuantumBlochSphere } from "@/components/interactive/QuantumBlochSphere";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";

export const metadata: Metadata = {
  title: "About",
  description:
    "An independent AI research and engineering lab guided by testable questions, open code, and reproducibility.",
  alternates: { canonical: "/about" },
};

export default function About() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    "name": "Shinraya Tech Labs",
    "url": "https://shinraya-tech-labs.github.io",
    "description":
      "An independent AI research and engineering lab exploring how intelligent systems learn, reason, and interact with the world.",
    "sameAs": ["https://github.com/Shinraya-Tech-Labs"],
  };

  return (
    <div className="relative w-full min-h-screen bg-[#090909] text-[#f2eee7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <PageIntro
        category="Lab Identity & Scope"
        title="Independent by design."
        italic="Curious by principle."
        description="Shinraya Tech Labs is an independent AI research and engineering lab exploring how intelligent systems learn, reason, and interact with computational environments."
      />

      {/* Narrative Section */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 relative flex justify-center w-full max-w-[420px] mx-auto lg:mx-0">
            <div className="relative w-full rounded-3xl group">
              <HyperframeBeam radius={24} duration={8} />
              <HyperframeCorners size="text-[13px]" />
              <QuantumBlochSphere className="w-full" />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Eyebrow>Our Purpose</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#f2eee7] leading-[1.12]">
              Closing the distance between an idea{" "}
              <span className="font-serif italic text-[#d6b799] block sm:inline">
                and its evidence.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#aaa69e] font-light leading-relaxed">
              We connect research questions directly with the software systems needed to examine them. Our public work spans reasoning under noisy verifiers, persistent geometric retrieval, small-system quantum simulations, and runtime instrumentation for autonomous AI workflows.
            </p>
            <p className="text-base text-[#aaa69e] font-light leading-relaxed">
              Research Beyond Assumptions is not a marketing motto; it is an experimental requirement. We start with a falsifiable question, build a fair baseline, and let the measurement determine the direction.
            </p>
          </div>

        </div>
      </section>

      {/* Methodological Values Grid */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-[#302e2a]/50">
        <div className="mb-16 max-w-3xl">
          <Eyebrow>Methodological Framework</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#f2eee7] leading-[1.12]">
            How we approach <span className="font-serif italic text-[#d6b799]">empirical inquiry.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#111110] flex flex-col justify-between space-y-6 hover:border-[#d6b799]/40 transition-colors group">
            <HyperframeBeam radius={16} duration={8} />
            <HyperframeCorners size="text-[11px]" />
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                Inquiry
              </span>
              <h3 className="text-2xl font-normal text-[#f2eee7]">
                Questions before claims.
              </h3>
              <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                A plausible mechanism is an invitation to test. Strict baselines, ablation studies, and controlled noise comparisons establish whether an algorithmic variant produces an actual advantage.
              </p>
            </div>
            <div className="pt-4 border-t border-[#302e2a]/50 font-mono text-xs text-[#aaa69e]/60 relative z-10">
              Hypothesis Driven
            </div>
          </div>

          <div className="relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#111110] flex flex-col justify-between space-y-6 hover:border-[#d6b799]/40 transition-colors group">
            <HyperframeBeam radius={16} duration={9} />
            <HyperframeCorners size="text-[11px]" />
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                Transparency
              </span>
              <h3 className="text-2xl font-normal text-[#f2eee7]">
                Work that can be inspected.
              </h3>
              <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                Public repositories make execution packages, checkpoints, and telemetry logs openly available. Negative outcomes and unsupported hypotheses are published with equal prominence.
              </p>
            </div>
            <div className="pt-4 border-t border-[#302e2a]/50 font-mono text-xs text-[#aaa69e]/60 relative z-10">
              Open Code & Data
            </div>
          </div>

          <div className="relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#111110] flex flex-col justify-between space-y-6 hover:border-[#d6b799]/40 transition-colors group">
            <HyperframeBeam radius={16} duration={10} />
            <HyperframeCorners size="text-[11px]" />
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                Verification
              </span>
              <h3 className="text-2xl font-normal text-[#f2eee7]">
                Enough detail to reproduce.
              </h3>
              <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                Configurations, random seeds, software manifests, and evaluation boundaries enable peer researchers to rerun and challenge our findings independently.
              </p>
            </div>
            <div className="pt-4 border-t border-[#302e2a]/50 font-mono text-xs text-[#aaa69e]/60 relative z-10">
              Deterministic Seeds
            </div>
          </div>

        </div>
      </section>

      <CollaborationCTA />
    </div>
  );
}
