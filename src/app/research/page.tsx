import type { Metadata } from "next";
import { research, repoUrl, reportUrl, verifiedOn } from "@/lib/projects";
import { PageIntro, ExternalLink, CollaborationCTA } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Research Programs",
  description:
    "Experimental protocols, scope, measured evidence, and explicit limitations across reasoning, retrieval, quantum simulation, and computational neuroscience.",
  alternates: { canonical: "/research" },
};

export default function Research() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shinraya Tech Labs Research Directory",
    "description":
      "Independent experimental research across reasoning under imperfect rewards, geometric retrieval, quantum simulation, and biophysical neurodynamics.",
    "hasPart": research.map((p) => ({
      "@type": "ScholarlyArticle",
      "name": p.name,
      "headline": p.question,
      "description": p.summary,
      "sameAs": repoUrl(p.repo),
    })),
  };

  return (
    <div className="relative w-full min-h-screen bg-[#090909] text-[#f2eee7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageIntro
        category="Empirical Research Programs"
        title="Follow the question."
        italic="Keep the evidence."
        description="Four independent lines of inquiry into machine reasoning, quantum boundaries, geometric representations, and biophysical networks. Each project makes its scope and limitations explicit."
      />

      {/* Jump Anchor Bar */}
      <div className="w-full border-y border-[#302e2a]/60 bg-[#111110]/80 backdrop-blur-md sticky top-[72px] z-30 py-4 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono">
          <span className="text-[#aaa69e]/70 uppercase tracking-widest">
            Jump to Program:
          </span>
          {research.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="px-3 py-1.5 rounded-full border border-[#302e2a] bg-[#141413] text-[#f2eee7] hover:border-[#d6b799] hover:text-[#d6b799] transition-colors"
            >
              {p.name} ↓
            </a>
          ))}
        </div>
      </div>

      {/* Research Programs List */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
        {research.map((p) => (
          <article
            key={p.slug}
            id={p.slug}
            className="scroll-mt-36 p-8 sm:p-12 rounded-3xl border border-[#302e2a] bg-[#111110] transition-all duration-500 hover:border-[#d6b799]/40 hover:shadow-[0_0_40px_-15px_rgba(214,183,153,0.12)] space-y-8"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#302e2a]/60">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d6b799]">
                  {p.field}
                </span>
                <h2 className="text-3xl sm:text-4xl font-normal text-[#f2eee7] tracking-tight">
                  {p.name}
                </h2>
                <p className="text-lg sm:text-xl font-light text-[#d6b799]/90 italic font-serif">
                  &ldquo;{p.question}&rdquo;
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <span className="px-3 py-1 text-xs rounded-full bg-[#302e2a]/50 text-[#f2eee7] border border-[#302e2a] font-mono">
                  {p.status}
                </span>
                <div className="flex items-center gap-4 text-xs font-medium pt-2">
                  <ExternalLink href={repoUrl(p.repo)}>
                    Source Code
                  </ExternalLink>
                  {p.report && (
                    <ExternalLink href={reportUrl(p)}>
                      Research Report
                    </ExternalLink>
                  )}
                </div>
              </div>
            </div>

            {/* Structured Evidence Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-[#0c0c0b] border border-[#302e2a]/60 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#aaa69e]">
                  Scope & Methods
                </span>
                <p className="text-sm text-[#f2eee7] font-light leading-relaxed">
                  {p.scope}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c0c0b] border border-[#302e2a]/60 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#aaa69e]">
                  Observed Evidence
                </span>
                <p className="text-sm text-[#f2eee7] font-light leading-relaxed">
                  {p.evidence}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c0c0b] border border-[#dd3044]/30 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#dd3044]">
                  Limitations & Boundaries
                </span>
                <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
                  {p.limitations}
                </p>
              </div>
            </div>
          </article>
        ))}

        <div className="p-6 rounded-2xl border border-[#302e2a]/50 bg-[#141413]/50 text-xs font-mono text-[#aaa69e] text-center max-w-3xl mx-auto">
          Editorial summaries reviewed against public repository documentation on {verifiedOn}. Independent reproductions are welcome through our issue trackers.
        </div>
      </section>

      <CollaborationCTA />
    </div>
  );
}
