import fs from "node:fs";
import ts from "typescript";

for (const name of ["AnimatedContent", "FadeContent"]) {
  let source = fs.readFileSync(`research-sources/${name}.tsx`, "utf8");
  source = source.replace(
    "    if (!el) return;",
    `    if (!el) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {`,
  );
  source = source.replace(
    "    return () => {\n      st.kill();",
    `    const revealFocusedContent = () => { tl.totalProgress(1); };
    el.addEventListener('focusin', revealFocusedContent);
    return () => {
      el.removeEventListener('focusin', revealFocusedContent);
      st.kill();`,
  );
  source = source.replace(
    "      onComplete: () => {\n        if (onComplete)",
    `      onComplete: () => {
        if (disappearAfter <= 0) gsap.set(el, { clearProps: 'transform,opacity,visibility,filter,willChange' });
        if (onComplete)`,
  );
  source = source.replace(
    /    };\n  }, \[/,
    `    };
    });
    return () => media.revert();
  }, [`,
  );
  source = source.replace(
    "style={{ visibility: 'hidden', ...style }}",
    "style={style}",
  );
  source = source.replace(
    "className={className}",
    `className={\`rb-${name === "AnimatedContent" ? "reveal" : "fade"} \${className}\`}`,
  );
  if (name === "AnimatedContent") {
    source = source
      .replace("distance = 100", "distance = 28")
      .replace("duration = 0.8", "duration = 0.65")
      .replace("threshold = 0.1", "threshold = 0.06");
    source = source.replace(
      "      tl.kill();",
      "      tl.kill();\n      gsap.killTweensOf(el);",
    );
  } else {
    source = source.replace(
      "  }, []);",
      "  }, [container, blur, duration, ease, delay, threshold, initialOpacity, disappearAfter, disappearDuration, disappearEase, onComplete, onDisappearanceComplete]);",
    );
  }
  fs.writeFileSync(`src/components/approved/${name}.tsx`, source);
}

// Wrap existing semantic content without replacing it. Animation itself stays
// in the official React Bits component; these are ordinary integration wrappers.
const classes = new Set([
  "section-heading",
  "research-detail",
  "project-row",
  "publication-row",
  "values-grid",
  "editorial-note",
  "collaboration",
  "about-story",
  "contribution-start",
  "principles",
]);
const files = [
  "src/components/editorial.tsx",
  ...[
    "",
    "research/",
    "engineering/",
    "publications/",
    "about/",
    "contribute/",
  ].map((p) => `src/app/${p}page.tsx`),
];
for (const file of files) {
  let source = fs.readFileSync(file, "utf8");
  if (source.includes("approved/AnimatedContent")) continue;
  const tree = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const edits = [];
  const visit = (node) => {
    if (ts.isJsxElement(node)) {
      const opening = node.openingElement;
      const classAttr = opening.attributes.properties.find(
        (a) => ts.isJsxAttribute(a) && a.name.getText(tree) === "className",
      );
      const className =
        classAttr?.initializer && ts.isStringLiteral(classAttr.initializer)
          ? classAttr.initializer.text
          : "";
      const isCard = opening.tagName.getText(tree) === "SpotlightCard";
      if (isCard || className.split(" ").some((c) => classes.has(c))) {
        const keyAttr = opening.attributes.properties.find(
          (a) => ts.isJsxAttribute(a) && a.name.getText(tree) === "key",
        );
        const key = keyAttr ? ` ${keyAttr.getText(tree)}` : "";
        if (keyAttr)
          edits.push({
            start: keyAttr.getStart(tree),
            end: keyAttr.end,
            text: "",
          });
        edits.push({
          start: node.getStart(tree),
          end: node.getStart(tree),
          text: `<AnimatedContent${key} className="${isCard ? "motion-card" : "motion-section"}">`,
        });
        edits.push({
          start: node.end,
          end: node.end,
          text: "</AnimatedContent>",
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  for (const e of edits.sort((a, b) => b.start - a.start))
    source = source.slice(0, e.start) + e.text + source.slice(e.end);
  if (edits.length)
    source =
      'import AnimatedContent from "@/components/approved/AnimatedContent";\n' +
      source;
  fs.writeFileSync(file, source);
}
