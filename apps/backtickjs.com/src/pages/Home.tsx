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
            type-checked and formatted like the rest of your code, then compiled
            at build time. On each request, your server components run and
            decide what the screen shows, and the bundler combines that data
            with the compiled scripts into one JavaScript file.
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
