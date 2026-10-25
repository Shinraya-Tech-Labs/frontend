import AnimatedContent from "@/components/approved/AnimatedContent";
import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, Eyebrow, CollaborationCTA } from "@/components/editorial";
export const metadata: Metadata = {
  title: "About",
  description:
    "An independent AI research and engineering lab guided by testable questions, open code, and reproducibility.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <PageIntro
        number="04"
        title="Independent by design."
        italic="Curious by principle."
        description="Shinraya Tech Labs is an independent AI research and engineering lab exploring how intelligent systems learn, reason, and interact with the world."
      />
      <AnimatedContent className="motion-section">
        <section className="shell about-story">
          <div className="about-art">
            <Image
              src="/logo.webp"
              alt="The original Shinraya Tech Labs emblem"
              width={1254}
              height={1254}
              sizes="(max-width: 700px) 90vw, 40vw"
            />
          </div>
          <div>
            <Eyebrow>Our purpose</Eyebrow>
            <h2>
              Close the distance
              <br />
              between an idea
              <br />
              <em>and its evidence.</em>
            </h2>
            <p>
              We connect research questions with the engineering needed to
              examine them. Our public work spans reasoning under imperfect
              rewards, geometric retrieval, quantum simulation, computational
              neuroscience, and tools for AI systems.
            </p>
            <p>
              Research Beyond Assumptions is a working principle: start with
              curiosity, build a fair test, and let the result change the
              direction.
            </p>
          </div>
        </section>
      </AnimatedContent>
      <section className="section shell about-values">
        <Eyebrow>How we approach the work</Eyebrow>
        <AnimatedContent className="motion-section">
          <div className="values-grid">
            <article>
              <span>01 / Inquiry</span>
              <h3>Questions before claims.</h3>
              <p>
                A plausible mechanism is a reason to investigate. Clear
                baselines and controlled comparisons help establish whether it
                actually helps.
              </p>
            </article>
            <article>
              <span>02 / Openness</span>
              <h3>Work that can be inspected.</h3>
              <p>
                Public repositories make methods and implementations available
                for scrutiny. A negative result can be a useful contribution.
              </p>
            </article>
            <article>
              <span>03 / Reproducibility</span>
              <h3>Enough detail to try again.</h3>
              <p>
                Configurations, evaluation protocols, and evidence boundaries
                make a result easier to interpret and reproduce. Documentation
                should distinguish completed work from planned work.
              </p>
            </article>
          </div>
        </AnimatedContent>
      </section>
      <CollaborationCTA />
    </>
  );
}
