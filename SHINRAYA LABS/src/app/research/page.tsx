import AnimatedContent from "@/components/approved/AnimatedContent";
import type { Metadata } from "next";
import { research, repoUrl, reportUrl, verifiedOn } from "@/lib/projects";
import {
  PageIntro,
  ExternalLink,
  CollaborationCTA,
} from "@/components/editorial";
export const metadata: Metadata = {
  title: "Research",
  description:
    "Research questions, implementations, evidence, and limitations across reasoning, retrieval, quantum simulation, and neuroscience.",
  alternates: { canonical: "/research" },
};
export default function Research() {
  return (
    <>
      <PageIntro
        number="01"
        title="Follow the question."
        italic="Keep the evidence."
        description="Four lines of inquiry into learning, computation, and simulation. Each project makes its scope—and the limits of its conclusions—explicit."
      />
      <div className="shell research-jump">
        <span>Explore the work</span>
        {research.map((p) => (
          <a key={p.slug} href={`#${p.slug}`}>
            {p.name} <span aria-hidden="true">↓</span>
          </a>
        ))}
      </div>
      <div className="shell">
        {research.map((p, i) => (
          <AnimatedContent key={p.slug} className="motion-section">
            <article className="research-detail" id={p.slug}>
              <div className="detail-heading">
                <span className="eyebrow">
                  0{i + 1} / {p.field}
                </span>
                <h2>{p.name}</h2>
                <p className="research-question">{p.question}</p>
                <span className="status-label">{p.status}</span>
                <div className="detail-links">
                  <ExternalLink href={repoUrl(p.repo)}>
                    Source on GitHub
                  </ExternalLink>
                  {p.report && (
                    <ExternalLink href={reportUrl(p)}>
                      Read the report
                    </ExternalLink>
                  )}
                </div>
              </div>
              <dl className="evidence-list">
                <div>
                  <dt>Scope</dt>
                  <dd>{p.scope}</dd>
                </div>
                <div>
                  <dt>Evidence</dt>
                  <dd>{p.evidence}</dd>
                </div>
                <div className="evidence-limit">
                  <dt>Limitations</dt>
                  <dd>{p.limitations}</dd>
                </div>
              </dl>
            </article>
          </AnimatedContent>
        ))}
        <p className="source-note">
          Editorial summaries reviewed against public repository documentation
          on {verifiedOn}. Repository-reported evidence has not been
          independently reproduced for this website.
        </p>
      </div>
      <CollaborationCTA />
    </>
  );
}
