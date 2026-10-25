import AnimatedContent from "@/components/approved/AnimatedContent";
import type { Metadata } from "next";
import { github, repoUrl } from "@/lib/projects";
import { PageIntro, Eyebrow, ExternalLink } from "@/components/editorial";
export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Reproduce experiments, improve tooling, document limitations, and collaborate through Shinraya Tech Labs public repositories.",
  alternates: { canonical: "/contribute" },
};
export default function Contribute() {
  return (
    <>
      <PageIntro
        number="05"
        title="Bring your questions."
        italic="Build with us."
        description="You don’t need a big proposal to make a useful contribution. A reproducible issue, a clearer explanation, or an independent replication can move the work forward."
      />
      <AnimatedContent className="motion-section">
        <section className="shell contribution-start">
          <div>
            <Eyebrow>Start with the source</Eyebrow>
            <h2>
              One public place
              <br />
              <em>to begin.</em>
            </h2>
            <p>
              Explore the repositories, read the project&apos;s setup
              instructions, and check existing issues before starting work.
            </p>
            <ExternalLink href={github} className="button">
              Shinraya Tech Labs on GitHub
            </ExternalLink>
          </div>
          <div className="contribution-steps">
            <article>
              <span>01</span>
              <div>
                <h3>Choose a question or tool.</h3>
                <p>
                  Start with the README and its evidence boundaries. Pick a
                  change small enough to review and test.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Discuss the proposed change.</h3>
                <p>
                  Use the relevant repository&apos;s issues to report a problem
                  or explain an idea, including expected behavior and a
                  reproducible example.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Make the work reproducible.</h3>
                <p>
                  Follow project-specific contribution guidance. Include tests,
                  environment details, and documentation where relevant to your
                  pull request.
                </p>
              </div>
            </article>
          </div>
        </section>
      </AnimatedContent>
      <section className="section shell">
        <AnimatedContent className="motion-section">
          <div className="section-heading">
            <div>
              <Eyebrow>Ways to participate</Eyebrow>
              <h2>
                Small contributions.
                <br />
                <em>Real value.</em>
              </h2>
            </div>
          </div>
        </AnimatedContent>
        <AnimatedContent className="motion-section">
          <div className="values-grid">
            <article>
              <span>Research</span>
              <h3>Reproduce an experiment.</h3>
              <p>
                Compare a result against its protocol. Document your
                environment, any deviations, and what you observe.
              </p>
              <ExternalLink href={`${repoUrl("ATLAS")}/issues`}>
                ATLAS issues
              </ExternalLink>
            </article>
            <article>
              <span>Engineering</span>
              <h3>Improve the instrument.</h3>
              <p>
                Investigate an edge case, strengthen a test, or help make
                runtime evidence easier to understand.
              </p>
              <ExternalLink href={`${repoUrl("AgentWatch")}/issues`}>
                AgentWatch issues
              </ExternalLink>
            </article>
            <article>
              <span>Documentation</span>
              <h3>Make the path clearer.</h3>
              <p>
                Clarify setup instructions, surface an unstated assumption, or
                document a limitation others should know.
              </p>
              <ExternalLink
                href={`${repoUrl("quantum-advantage-simulator")}/issues`}
              >
                Simulator issues
              </ExternalLink>
            </article>
          </div>
        </AnimatedContent>
      </section>
      <AnimatedContent className="motion-section">
        <aside className="shell editorial-note">
          <Eyebrow>Contribution guidance</Eyebrow>
          <h3>Follow the project&apos;s own workflow.</h3>
          <p>
            Review the repository&apos;s contribution and license files before
            submitting work. If guidance is missing, open an issue to agree on
            scope first. These links lead to the actual project materials.
          </p>
          <div className="detail-links">
            <ExternalLink
              href={`${repoUrl("AgentWatch")}/blob/main/CONTRIBUTING.md`}
            >
              AgentWatch contribution guidance
            </ExternalLink>
            <ExternalLink
              href={`${repoUrl("quantum-advantage-simulator")}/blob/main/CONTRIBUTING.md`}
            >
              Simulator contribution guidance
            </ExternalLink>
          </div>
        </aside>
      </AnimatedContent>
    </>
  );
}
