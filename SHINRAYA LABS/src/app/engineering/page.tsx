import AnimatedContent from "@/components/approved/AnimatedContent";
import type { Metadata } from "next";
import { engineering, github, repoUrl } from "@/lib/projects";
import {
  PageIntro,
  ExternalLink,
  CollaborationCTA,
} from "@/components/editorial";
import SpotlightCard from "@/components/approved/SpotlightCard";
export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Open tools for AI observability, developer workflows, distributed orchestration, and experimental software.",
  alternates: { canonical: "/engineering" },
};
const categories = [
  {
    name: "Observe & understand",
    description: "Make the behavior of complex systems inspectable.",
  },
  {
    name: "Build & orchestrate",
    description: "Connect ideas to executable, repeatable workflows.",
  },
  {
    name: "Explore & apply",
    description: "Carry experimental methods into working software.",
  },
];
export default function Engineering() {
  return (
    <>
      <PageIntro
        number="02"
        title="Built to investigate."
        italic="Engineered to be used."
        description="Open implementations that support research and put ideas to work. Organized by the problems they address, with maturity and evidence kept in view."
      />
      <div className="shell">
        {categories.map((category, i) => (
          <section className="engineering-group" key={category.name}>
            <div className="group-title">
              <span className="eyebrow">0{i + 1}</span>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
            <div className="engineering-grid">
              {engineering
                .filter((p) => p.category === category.name)
                .map((p) => (
                  <AnimatedContent key={p.repo} className="motion-card">
                    <SpotlightCard
                      className="engineering-card"
                      spotlightColor="#d6b799"
                      intensity={0.05}
                      borderGlow={0.15}
                      proximity={0}
                      flare={false}
                    >
                      <span className="tag">{p.language}</span>
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                      <p className="project-note">{p.note}</p>
                      <ExternalLink href={repoUrl(p.repo)}>
                        View {p.name}
                      </ExternalLink>
                    </SpotlightCard>
                  </AnimatedContent>
                ))}
            </div>
          </section>
        ))}
        <AnimatedContent className="motion-section">
          <aside className="editorial-note">
            <span className="eyebrow">Repository availability</span>
            <h3>LCI</h3>
            <p>
              A public LCI repository was not found in the organization during
              our 11 October 2026 review. Its scope and implementation status
              are not verified, so no project claims or repository link are
              listed.
            </p>
            <ExternalLink href={github}>Browse the organization</ExternalLink>
          </aside>
        </AnimatedContent>
      </div>
      <CollaborationCTA />
    </>
  );
}
