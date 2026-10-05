import { cs } from "@backtickjs/core";
import { InlineCode } from "../components/Code.js";
import { Comparison } from "../components/Comparison.js";
import { Cta } from "../components/Cta.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { Features } from "../components/Features.js";
import { Hero } from "../components/Hero.js";
import { HowItWorks } from "../components/HowItWorks.js";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";
import { Setup } from "../components/Setup.js";
import { EAS_UPDATE, EXPO_RSC } from "../comparisons.js";

export async function Home() {
  return (
    <Layout>
      <Hero />
      <DeployDemo />

      <Section
        id="how"
        eyebrow="How it works"
        title="Compiled once. Linked per request."
        lede={cs`(
          <>
            Your client scripts {${(<InlineCode source="cs`…`" />)}} are
            compiled at build time. Each request runs your server components,
            then links the compiled client scripts and the user's data into one
            JavaScript file.
          </>
        )`}
      >
        <HowItWorks />
      </Section>

      <Section
        eyebrow="Isn't this EAS Update?"
        title="EAS Update ships your app. Backtick renders your screens."
        lede="Both get JavaScript to the phone without a store release. They work well together: EAS Update for the shell (navigation, auth, native modules), Backtick for the screens that change often or differ per user."
      >
        <Comparison other="EAS Update" rows={EAS_UPDATE} />
      </Section>

      <Section
        eyebrow="Isn't this React Server Components?"
        title="Expo Router compiles client components into the app. Backtick ships them with the screen."
        lede="Expo Router has an experimental preview of React Server Components. Both run components on your server; the difference is where the interactive code lives. With Backtick, a new button with its own state goes live without an app update."
      >
        <Comparison other="Expo Router RSC" rows={EXPO_RSC} />
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
        lede="Your existing app keeps its navigation, auth and native modules. Backtick draws the screens you choose, with the React Native the app already ships. Works with Expo SDK 57, React Native 0.86 and React 19.2."
      >
        <Setup />
      </Section>

      <Cta />
    </Layout>
  );
}
