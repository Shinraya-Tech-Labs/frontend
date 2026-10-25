import AnimatedContent from "@/components/approved/AnimatedContent";
import type { Metadata } from "next";
import { research, reportUrl, repoUrl } from "@/lib/projects";
import { PageIntro, ExternalLink, Eyebrow } from "@/components/editorial";
export const metadata: Metadata = {
  title: "Publications & Results",
  description:
    "Open research reports, experimental findings, and technical notes, with explicit evidence boundaries.",
  alternates: { canonical: "/publications" },
};
export default function Publications() {
  return (
    <>
      <PageIntro
        number="03"
        title="The record of the work."
        italic="Including what didn’t work."
        description="Research reports, experimental findings, and implementation notes. These are repository-hosted materials; no peer-reviewed publication or conference acceptance is claimed."
      />
      <section className="shell publications">
        <div className="publication-labels">
          <span>Material / Project</span>
          <span>Finding & evidence boundary</span>
          <span>Read</span>
        </div>
        {research.map((p, i) => (
          <AnimatedContent key={p.slug} className="motion-section">
            <article className="publication-row">
              <div>
                <span className="eyebrow">
                  0{i + 1} / {p.resultLabel}
                </span>
                <h2>{p.name}</h2>
                <span className="tag">
                  {p.report ? "Research report" : "Technical documentation"}
                </span>
              </div>
              <div>
                <p>{p.evidence}</p>
                <p className="publication-limit">{p.limitations}</p>
              </div>
              <ExternalLink href={reportUrl(p)} className="publication-link">
                <span className="sr-only">
                  Read {p.name} {p.report ? "report" : "documentation"}
                </span>
              </ExternalLink>
            </article>
          </AnimatedContent>
        ))}
      </section>
      <section className="section shell results-notes">
        <div>
          <Eyebrow>Reading the evidence</Eyebrow>
          <h2>
            Context is part
            <br />
            <em>of the result.</em>
          </h2>
        </div>
        <div>
          <p>
            Benchmarks are meaningful only with their datasets, configurations,
            comparison budgets, and uncertainty. The linked reports retain those
            details. This index does not turn a pilot, implementation, or point
            estimate into a broader claim.
          </p>
          <ExternalLink href={`${repoUrl("ATLAS")}/blob/main/docs/CLAIMS.md`}>
            An example: ATLAS claims & limits
          </ExternalLink>
        </div>
      </section>
    </>
  );
}
