import { cs } from "@backtickjs/core";
import { InlineCode } from "../components/Code.js";
import { Comparison } from "../components/Comparison.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { Hero } from "../components/Hero.js";
import { HowItWorks } from "../components/HowItWorks.js";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";
import { Setup } from "../components/Setup.js";
import {
  EXPO_COLUMNS,
  EXPO_ROWS,
  NEXT_COLUMNS,
  NEXT_ROWS,
} from "../comparisons.js";

export async function Home() {
  return (
    <Layout>
      <Hero />
      <DeployDemo />

      <Section
        id="how"
        eyebrow="How it works"
        title="Compiled once. Dynamically linked per request."
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
        eyebrow="Server components"
        title="Server components, without the framework."
        lede="The reasons to use them hold: data fetched where it lives, secrets kept on your server, less code on the client. Here is Backtick beside Next.js, where most developers meet them."
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
