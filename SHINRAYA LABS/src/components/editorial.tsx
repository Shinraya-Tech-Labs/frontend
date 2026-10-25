import AnimatedContent from "@/components/approved/AnimatedContent";
import Link from "next/link";
import SpotlightCard from "./approved/SpotlightCard";
import { github, type ResearchProject } from "@/lib/projects";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="accent-square" aria-hidden="true" />
      {children}
    </p>
  );
}
export function PageIntro({
  number,
  title,
  italic,
  description,
}: {
  number: string;
  title: string;
  italic?: string;
  description: string;
}) {
  return (
    <section className="page-intro shell">
      <Eyebrow>{number} / Shinraya Tech Labs</Eyebrow>
      <h1>
        {title}
        {italic && (
          <>
            <br />
            <em>{italic}</em>
          </>
        )}
      </h1>
      <p className="intro-copy">{description}</p>
    </section>
  );
}
export function ResearchCard({
  project,
  index,
}: {
  project: ResearchProject;
  index: number;
}) {
  return (
    <AnimatedContent className="motion-card">
      <SpotlightCard
        className="research-card"
        spotlightColor="#d6b799"
        intensity={0.06}
        borderGlow={0.15}
        proximity={0}
        flare={false}
      >
        <div className="card-meta">
          <span>0{index + 1} / Research</span>
          <span>{project.resultLabel}</span>
        </div>
        <p className="field-label">{project.field}</p>
        <h3>
          <Link href={`/research#${project.slug}`}>{project.name}</Link>
        </h3>
        <p>{project.summary}</p>
        <Link className="text-link" href={`/research#${project.slug}`}>
          Explore the research <Arrow />
        </Link>
      </SpotlightCard>
    </AnimatedContent>
  );
}
export function CollaborationCTA() {
  return (
    <AnimatedContent className="motion-section">
      <section className="collaboration shell">
        <div>
          <Eyebrow>Built in the open</Eyebrow>
          <h2>
            Good questions deserve
            <br />
            <em>more perspectives.</em>
          </h2>
          <p>
            Reproduce an experiment. Challenge an assumption. Build something
            useful with us.
          </p>
        </div>
        <Link className="button light-button" href="/contribute">
          Contribute to the work <Arrow />
        </Link>
      </section>
    </AnimatedContent>
  );
}
export function ExternalLink({
  href,
  children,
  className = "text-link",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className}>
      {children}
      <Arrow diagonal />
    </a>
  );
}
export function GitHubLink() {
  return <ExternalLink href={github}>Explore GitHub</ExternalLink>;
}
