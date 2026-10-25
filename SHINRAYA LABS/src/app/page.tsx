import AnimatedContent from "@/components/approved/AnimatedContent";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { research, engineering, repoUrl } from "@/lib/projects";
import {
  Arrow,
  Eyebrow,
  ResearchCard,
  CollaborationCTA,
  ExternalLink,
} from "@/components/editorial";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <Eyebrow>Independent AI research & engineering</Eyebrow>
          <h1>
            Research
            <br />
            Beyond
            <br />
            <em>Assumptions.</em>
          </h1>
          <p>
            We investigate how intelligent systems reason, learn, and behave—and
            build the tools to find out.
          </p>
          <div className="hero-actions">
            <Link href="/research" className="button">
              Explore our research <Arrow />
            </Link>
            <Link href="/engineering" className="text-link">
              See what we build <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/logo.webp"
            alt="Shinraya Tech Labs original emblem: an ivory S, torii gate, mountain, and vermilion sun"
            width={1254}
            height={1254}
            priority
            fetchPriority="high"
            sizes="(max-width: 700px) 95vw, 50vw"
          />
          <div className="art-caption">
            <span>SHINRAYA TECH LABS</span>
            <span>Inquiry without shortcuts.</span>
          </div>
        </div>
      </section>
      <div className="research-index shell">
        <span className="index-label">Our fields of inquiry</span>
        <span>Reasoning & learning</span>
        <span>Quantum computation</span>
        <span>Scientific simulation</span>
        <span>Reliable AI systems</span>
      </div>
      <section className="section shell">
        <AnimatedContent className="motion-section">
          <div className="section-heading">
            <div>
              <Eyebrow>01 / Research</Eyebrow>
              <h2>
                Questions first.
                <br />
                <em>Evidence always.</em>
              </h2>
            </div>
            <div>
              <p>
                From imperfect rewards to geometric retrieval, our work starts
                with a testable question. The outcome stays open.
              </p>
              <Link href="/research" className="text-link">
                All research <Arrow />
              </Link>
            </div>
          </div>
        </AnimatedContent>
        <div className="research-grid">
          {research.map((project, index) => (
            <ResearchCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="engineering-section">
        <div className="section shell">
          <AnimatedContent className="motion-section">
            <div className="section-heading">
              <div>
                <Eyebrow>02 / Engineering</Eyebrow>
                <h2>
                  Ideas need
                  <br />
                  <em>working systems.</em>
                </h2>
              </div>
              <div>
                <p>
                  Instrumentation, developer tools, and experimental runtimes.
                  Engineering that makes the next question possible.
                </p>
                <Link href="/engineering" className="text-link">
                  Explore engineering <Arrow />
                </Link>
              </div>
            </div>
          </AnimatedContent>
          <div className="project-rows">
            {[engineering[0], engineering[2], engineering[3]].map((p, i) => (
              <AnimatedContent key={p.repo} className="motion-section">
                <article className="project-row">
                  <span className="row-number">0{i + 1}</span>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <span className="tag">{p.language}</span>
                  <ExternalLink href={repoUrl(p.repo)} className="row-link">
                    <span className="sr-only">{p.name} on GitHub</span>
                  </ExternalLink>
                </article>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>
      <section className="section philosophy shell">
        <div>
          <Eyebrow>03 / Our approach</Eyebrow>
          <h2>
            An assumption is
            <br />
            <em>a place to begin.</em>
            <br />
            Not a place to stop.
          </h2>
          <Link href="/about" className="text-link">
            Meet the lab&apos;s philosophy <Arrow />
          </Link>
        </div>
        <AnimatedContent className="motion-section">
          <div className="principles">
            <article>
              <span>01</span>
              <div>
                <h3>Make it testable.</h3>
                <p>
                  Turn an interesting idea into a question with controls,
                  baselines, and a way to be wrong.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Keep the whole result.</h3>
                <p>
                  Negative outcomes and unfinished studies belong alongside
                  positive findings.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Leave a reproducible trail.</h3>
                <p>
                  Share the code, methods, configurations, and boundaries that
                  make evidence useful.
                </p>
              </div>
            </article>
          </div>
        </AnimatedContent>
      </section>
      <CollaborationCTA />
    </>
  );
}
