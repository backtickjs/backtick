import { cs } from "@backtickjs/core";
import { Code } from "../components/Code.js";
import { Comparison } from "../components/Comparison.js";
import { Layout } from "../components/Layout.js";
import { QuickStart } from "../components/QuickStart.js";
import { Section } from "../components/Section.js";
import {
  EXPO_COLUMNS,
  EXPO_ROWS,
  MODEL_COLUMNS,
  MODEL_ROWS,
  NEXT_COLUMNS,
  NEXT_ROWS,
} from "../comparisons.js";
import { highlight } from "../highlight.js";
import { APP, SERVER, WRITTEN } from "../samples.js";

// The screen from the home page, whole, as a file, and the setup beside it,
// coloured once, when the server starts.
const HOME_LINES = await highlight(
  WRITTEN.map((part) => part.code).join("\n"),
  "tsx",
);
const SERVER_LINES = await highlight(SERVER, "tsx");
const APP_LINES = await highlight(APP, "tsx");

export const Docs = cs`() => (
  <$Layout>
    <$Section
      eyebrow="Docs · Quick start"
      title="One command to a running app."
      lede="Pick React Native, and it creates an Expo app with a Backtick server beside it. Then run npm run ios, android or web, and edit server/Home.tsx to change the screen. The steps below are what it sets up."
    >
      <$QuickStart />
    </$Section>

    <$Section
      eyebrow="1 · Write a screen"
      title="Three files to a server-driven screen."
      lede="A server component on your server, a route that bundles it per request, and one component in your app that draws it."
    >
      <$Code file="server/Home.tsx" lines={$HOME_LINES} />
    </$Section>

    <$Section
      eyebrow="2 · Serve it"
      title="One route bundles the screen per request."
      lede="The app sends the versions of React and React Native it was built with. The bundler builds a screen those versions can run."
    >
      <$Code file="server/index.tsx" lines={$SERVER_LINES} />
    </$Section>

    <$Section
      eyebrow="3 · Draw it"
      title="One component in your app."
      lede="It fetches the screen and runs it with your app's own React and React Native. It suspends while the screen loads, so a Suspense boundary shows your fallback, and an error boundary catches a screen that can't load."
    >
      <$Code file="app/App.tsx" lines={$APP_LINES} />
    </$Section>

    <$Section
      eyebrow="The idea"
      title="React Native, with the web's deploy model."
      lede={
        <>
          On the web, you deploy and users have the change the next time they
          load the page. A native app carries its screens in the binary, so
          every change waits for a store release. Backtick serves screens from
          your server, the way the web does.{" "}
          <a href="/why" class="font-medium text-react">
            Where the idea comes from →
          </a>
        </>
      }
    >
      <$Comparison columns={$MODEL_COLUMNS} rows={$MODEL_ROWS} />
    </$Section>

    <$Section
      eyebrow="Server components"
      title="No API layer. No split files."
      lede="The server renders each screen where its data lives, so there's no endpoint to build, nothing overfetched and no query cache to keep in sync. Unlike Next.js, the client code sits in the same file, and every $ that crosses is type-checked."
    >
      <$Comparison columns={$NEXT_COLUMNS} rows={$NEXT_ROWS} />
    </$Section>

    <$Section
      eyebrow="Compared"
      title="Isn't this EAS Update, or Expo's server components?"
      lede="All three get code to the phone without a store release. Only Backtick ships each screen per request, client components included."
    >
      <$Comparison columns={$EXPO_COLUMNS} rows={$EXPO_ROWS} />
    </$Section>
  </$Layout>
)`;
