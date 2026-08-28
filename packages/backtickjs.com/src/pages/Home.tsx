import { Hero } from "../components/Hero.js";
import { Playground } from "@backtickjs/playground";
import { COUNTER_EXAMPLE, EXAMPLE } from "../play/examples.js";

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

      {/* No rule and no eyebrow: the track above the columns is both the
          divider and the only thing that reports a compile, so a second line
          here would be the same line drawn twice. */}
      <section id="try" style="padding: 28px 0 40px">
        <Playground name="play" example={EXAMPLE} />
      </section>

      {/* A second one, drawn the same way from the same package. What differs
          between them is the name and the example — everything else on the two
          is the package's, which is the point of being able to see them side by
          side. */}
      <section style="padding: 0 0 68px">
        <Playground name="play-counter" example={COUNTER_EXAMPLE} />
      </section>
    </>
  );
}
