import { Button } from "../components/Button.js";
import { Code } from "../components/Code.js";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";
import { APP, SERVER, WRITTEN } from "../samples.js";

// The screen from the home page, whole, as a file.
const HOME = WRITTEN.map((part) => part.code).join("\n");

export async function Docs() {
  return (
    <Layout>
      <Section
        eyebrow="Docs · 1 · Write a screen"
        title="Three files to a server-driven screen."
        lede="A server component on your server, a route that bundles it per request, and one component in your app that draws it."
      >
        <Code file="server/Home.tsx" source={HOME} />
      </Section>

      <Section
        eyebrow="2 · Serve it"
        title="One route bundles the screen per request."
        lede="The app sends the versions of React and React Native it was built with. The bundler builds a screen those versions can run."
      >
        <Code file="server/index.tsx" source={SERVER} />
      </Section>

      <Section
        eyebrow="3 · Draw it"
        title="One component in your app."
        lede="It fetches the screen and runs it with your app's own React and React Native. Wrap it in an error boundary, as you would any component that can fail."
      >
        <Code file="app/App.tsx" source={APP} />
      </Section>

      <Section
        eyebrow="Next"
        title="See it running."
        lede="The examples run a server and an Expo app side by side. Change the server and watch the phone redraw."
      >
        <Button
          href="https://github.com/backtickjs/backtick/tree/main/examples"
          solid
          label="See the examples →"
        />
      </Section>
    </Layout>
  );
}
