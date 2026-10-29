import type { Metadata } from "next";
import { engineering, github, repoUrl } from "@/lib/projects";
import { PageIntro, ExternalLink, CollaborationCTA, Eyebrow } from "@/components/editorial";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";
import { QuantumManifold3D } from "@/components/interactive/QuantumManifold3D";

export const metadata: Metadata = {
  title: "Engineering Systems",
  description:
    "Open tools for AI observability, autonomous developer workflows, distributed orchestration, and experimental software systems.",
  alternates: { canonical: "/engineering" },
};

const categories = [
  {
    name: "Observe & Understand",
    description: "Make the execution state and divergence of complex AI workflows inspectable.",
  },
  {
    name: "Build & Orchestrate",
    description: "Connect empirical research questions to reproducible, high-throughput software pipelines.",
  },
  {
    name: "Explore & Apply",
    description: "Carry experimental algorithms into working developer software and sensory runtimes.",
  },
];

export default function Engineering() {
  return (
    <div className="relative w-full min-h-screen bg-[#090909] text-[#f2eee7]">
      <PageIntro
        category="Software Systems & Tooling"
        title="Built to investigate."
        italic="Engineered to be used."
        description="Open software implementations that support empirical inquiry and put research methods to work. Organized by operational domain, with implementation maturity clearly documented."
      />

      <div className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-24">
        {categories.map((category) => (
          <section key={category.name} className="space-y-8">
            <div className="space-y-2 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                Architecture Domain
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#f2eee7] tracking-tight">
                {category.name}
              </h2>
              <p className="text-sm sm:text-base text-[#aaa69e] font-light">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engineering
                .filter((p) => p.category.toLowerCase() === category.name.toLowerCase())
                .map((p) => (
                  <div
                    key={p.repo}
                    className="group relative overflow-hidden p-7 rounded-2xl border border-[#302e2a] bg-[#111110] flex flex-col justify-between space-y-6 hover:border-[#d6b799]/40 hover:shadow-[0_0_30px_-10px_rgba(214,183,153,0.1)] transition-all duration-500"
                  >
                    <HyperframeBeam radius={16} duration={8} />
                    <HyperframeCorners size="text-[11px]" />
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#302e2a]/50 text-[#d6b799] border border-[#302e2a]">
                          {p.language}
                        </span>
                        <span className="text-xs font-mono text-[#aaa69e]/60">Public Repo</span>
                      </div>

                      <h3 className="text-2xl font-normal text-[#f2eee7] tracking-tight">
                        {p.name}
                      </h3>

                      <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                        {p.description}
                      </p>

                      <div className="p-3 rounded-xl bg-[#090909]/80 border border-[#302e2a]/50 text-xs text-[#aaa69e] font-mono leading-relaxed">
                        {p.note}
                      </div>

                      {p.name === "PulseStack" && (
                        <div className="pt-2">
                          <QuantumManifold3D className="w-full" />
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#302e2a]/60 relative z-10">
                      <ExternalLink href={repoUrl(p.repo)}>
                        Source Code Repository
                      </ExternalLink>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}

        {/* Verification transparency note */}
        <div className="relative overflow-hidden p-8 rounded-2xl border border-[#302e2a] bg-[#141413]/60 space-y-4 max-w-4xl">
          <HyperframeCorners size="text-[11px]" />
          <Eyebrow>Repository Availability Notice</Eyebrow>
          <h3 className="text-xl font-normal text-[#f2eee7]">
            LCI (Lifecycle Integration)
          </h3>
          <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
            A public LCI repository was not found in the organization during our 11 October 2026 review. Its scope and implementation status remain unverified; therefore, no unsubstantiated claims or repository targets are published.
          </p>
          <div className="pt-2">
            <ExternalLink href={github}>
              Browse GitHub Organization
            </ExternalLink>
          </div>
        </div>
      </div>

      <CollaborationCTA />
    </div>
  );
}
