import { cs } from "@backtickjs/core";
import { InlineCode } from "../components/Code.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { Hero } from "../components/Hero.js";
import { HowItWorks } from "../components/HowItWorks.js";
import { Layout } from "../components/Layout.js";
import { Questions } from "../components/Questions.js";
import { Section } from "../components/Section.js";

export async function Home() {
  return (
    <Layout>
      <Hero />

      <DeployDemo />

      <Section
        id="how"
        eyebrow="How it works"
        title="Compiled once. Bundled per request."
        lede={cs`(
          <>
            Your client scripts {${(<InlineCode source="cs`…`" />)}} are
            compiled at build time. Each request runs your server components,
            then bundles the compiled scripts with the user's data into one
            JavaScript file.
          </>
        )`}
      >
        <HowItWorks />
      </Section>

      <Section eyebrow="Questions" title="What you're probably wondering.">
        <Questions />
      </Section>
    </Layout>
  );
}
