import { Cta } from "../components/Cta.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { EasUpdate } from "../components/EasUpdate.js";
import { Features } from "../components/Features.js";
import { Flow } from "../components/Flow.js";
import { Hero } from "../components/Hero.js";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";
import { Setup } from "../components/Setup.js";

export async function Home() {
  return (
    <Layout>
      <Hero />
      <DeployDemo />

      <Section
        id="how"
        eyebrow="How it works"
        title="Your server writes the screen. The phone runs it."
        lede="Backtick splits a screen where React Server Components do: what needs your data runs on the server, what needs the user's finger runs on the device. One file, one language, both sides typed."
      >
        <Flow />
      </Section>

      <Section
        eyebrow="Isn't this EAS Update?"
        title="EAS Update ships your app. Backtick renders your screens."
        lede="Both get JavaScript to the phone without a store release. They work well together: EAS Update for the shell (navigation, auth, native modules), Backtick for the screens that change often or differ per user."
      >
        <EasUpdate />
      </Section>

      <Section
        eyebrow="It's just React Native"
        title="Everything you already know, delivered at runtime."
        lede="Not a lookalike widget set. The same components, hooks and styles, checked by the same types."
      >
        <Features />
      </Section>

      <Section
        eyebrow="Setup"
        title="One route on the server. One component in the app."
        lede="Your existing app keeps its navigation, auth and native modules. Backtick draws the screens you choose, with the React Native the app already ships."
      >
        <Setup />
      </Section>

      <Cta />
    </Layout>
  );
}
