import { Caption } from "../components/Caption.js";
import { Hero } from "../components/Hero.js";
import { Playground } from "../components/Playground.js";
import { Section } from "../components/Section.js";

export async function Home() {
  return (
    <>
      <Hero
        standfirst={
          "Backtick is a server-driven UI framework: your app fetches screens" +
          " and their behavior at runtime. No app to build, no release to wait" +
          " on, no update to install."
        }
      />

      <Section title="Try it" id="try">
        <Playground />

        <Caption>
          What is on the right is not a preview: it is the bytes under the fold,
          drawn by the same client that drew this page — which never compiled
          anything and cannot. Its content policy allows no eval, and the
          compiler is a frame on an origin of its own that answers in JSON.
        </Caption>
      </Section>
    </>
  );
}
