import { cs } from "@backtickjs/core";
import { InlineCode } from "../components/Code.js";
import { Comparison } from "../components/Comparison.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { Hero } from "../components/Hero.js";
import { HowItWorks } from "../components/HowItWorks.js";
import { Layout } from "../components/Layout.js";
import { Questions } from "../components/Questions.js";
import { Section } from "../components/Section.js";
import { Setup } from "../components/Setup.js";
import {
  EXPO_COLUMNS,
  EXPO_ROWS,
  MODEL_COLUMNS,
  MODEL_ROWS,
  NEXT_COLUMNS,
  NEXT_ROWS,
} from "../comparisons.js";

export async function Home() {
  return (
    <Layout>
      <Hero />

      <Section
        eyebrow="The idea"
        title="React Native, with the web's deploy model."
        lede={cs`(
          <>
            On the web, you deploy and users have the change the next time they
            load the page. A native app carries its screens in the binary, so
            every change waits for a store release. Backtick serves screens from
            your server, the way the web does.{" "}
            <a href="/why" class="font-medium text-react">
              Where the idea comes from →
            </a>
          </>
        )`}
      >
        <Comparison columns={MODEL_COLUMNS} rows={MODEL_ROWS} />
      </Section>

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

      <Section
        eyebrow="Server components"
        title="No API layer. No split files."
        lede="The server renders each screen where its data lives, so there's no endpoint to build, nothing overfetched and no client cache to keep in sync. Unlike Next.js, the client code sits in the same file, and every $ that crosses is type-checked."
      >
        <Comparison columns={NEXT_COLUMNS} rows={NEXT_ROWS} />
      </Section>

      <Section
        eyebrow="Compared"
        title="Isn't this EAS Update, or Expo's server components?"
        lede="All three get code to the phone without a store release. Only Backtick ships each screen per request, client components included."
      >
        <Comparison columns={EXPO_COLUMNS} rows={EXPO_ROWS} />
      </Section>

      <Section eyebrow="Questions" title="What you're probably wondering.">
        <Questions />
      </Section>

      <Section
        eyebrow="Setup"
        title={cs`(
          <>
            One route on the server.
            <br />
            One component in your app.
          </>
        )`}
        lede="Your existing app keeps its navigation, auth and native modules. Backtick draws the screens you choose, with the React Native your app already ships. Works with Expo SDK 57, React Native 0.86 and React 19.2."
      >
        <Setup />
      </Section>
    </Layout>
  );
}
