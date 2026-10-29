import type { Metadata } from "next";
import { research, reportUrl, repoUrl } from "@/lib/projects";
import { PageIntro, ExternalLink, Eyebrow, CollaborationCTA } from "@/components/editorial";
import { HyperframeBeam } from "@/components/hyperframes/HyperframeBeam";
import { HyperframeCorners } from "@/components/hyperframes/HyperframeCorners";

export const metadata: Metadata = {
  title: "Publications & Open Results",
  description:
    "Open research reports, experimental findings, and technical notes with explicit evidence boundaries and negative outcomes preserved.",
  alternates: { canonical: "/publications" },
};

export default function Publications() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shinraya Tech Labs Publications Archive",
    "description":
      "Direct technical documentation and open research reports covering reasoning robustness, quantum benchmarks, and negative retrieval results.",
  };

  return (
    <div className="relative w-full min-h-screen bg-[#090909] text-[#f2eee7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageIntro
        category="Evidence Archive"
        title="The record of the work."
        italic="Including what didn't work."
        description="Open research reports, empirical findings, and software notes. These are repository-hosted materials; no peer-reviewed journal or conference acceptance is claimed."
      />

      {/* Publications Ledger */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
        <div className="space-y-6">
          {research.map((p) => {
            const isNegative = p.resultLabel.toLowerCase().includes("negative");
            return (
              <article
                key={p.slug}
                className="group relative overflow-hidden p-8 sm:p-10 rounded-2xl border border-[#302e2a] bg-[#111110] transition-all duration-500 hover:border-[#d6b799]/40 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
              >
                <HyperframeBeam radius={16} duration={8} />
                <HyperframeCorners size="text-[11px]" />

                <div className="space-y-3 lg:w-1/3 relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-mono rounded-full border ${
                        isNegative
                          ? "bg-[#dd3044]/10 text-[#dd3044] border-[#dd3044]/30"
                          : "bg-[#302e2a]/50 text-[#d6b799] border-[#302e2a]"
                      }`}
                    >
                      {p.resultLabel}
                    </span>
                    <span className="text-xs font-mono text-[#aaa69e]/60">
                      {p.report ? "Research Report" : "Technical Specification"}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-normal text-[#f2eee7] tracking-tight">
                    {p.name}
                  </h2>
                  <p className="text-xs font-mono text-[#aaa69e] uppercase tracking-wider">
                    {p.field}
                  </p>
                </div>

                <div className="space-y-3 lg:w-1/2 relative z-10">
                  <p className="text-sm text-[#f2eee7] font-light leading-relaxed">
                    {p.evidence}
                  </p>
                  <p className="text-xs text-[#aaa69e] font-light italic leading-relaxed border-l-2 border-[#302e2a] pl-3">
                    Boundary: {p.limitations}
                  </p>
                </div>

                <div className="shrink-0 flex items-center lg:justify-end relative z-10">
                  <ExternalLink
                    href={reportUrl(p)}
                    className="px-5 py-2.5 rounded-full border border-white/20 bg-[#171615] hover:bg-[#d6b799] hover:text-[#090909] hover:border-[#d6b799] text-xs font-medium text-[#f2eee7] transition-all duration-300"
                  >
                    Read Document
                  </ExternalLink>
                </div>
              </article>
            );
          })}
        </div>

        {/* Evidence Methodology Context */}
        <div className="group relative overflow-hidden p-8 sm:p-12 rounded-3xl border border-[#302e2a] bg-gradient-to-b from-[#141413] to-[#0c0c0b] space-y-6">
          <HyperframeBeam radius={24} duration={9} />
          <HyperframeCorners size="text-[13px]" />
          <div className="relative z-10 space-y-6">
            <Eyebrow>Evidence Interpretation Protocol</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#f2eee7] tracking-tight">
              Context is an inseparable part of the measurement.
            </h2>
            <p className="text-sm sm:text-base text-[#aaa69e] font-light leading-relaxed max-w-3xl">
              Benchmarks are informative only when accompanied by their training budgets, random seed sets, exact parameter configurations, and variance bounds. Our linked reports document these parameters in full.
            </p>
            <div className="pt-2">
              <ExternalLink href={`${repoUrl("ATLAS")}/blob/main/docs/CLAIMS.md`}>
                Inspect the ATLAS Claims & Boundary Specification
              </ExternalLink>
            </div>
          </div>
        </div>
      </section>

      <CollaborationCTA />
    </div>
  );
}
