import { Hero } from "../components/Hero.js";
import { Playground } from "../components/Playground.js";

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
      <section id="try" style="padding: 28px 0 68px">
        <Playground />
      </section>
    </>
  );
}
