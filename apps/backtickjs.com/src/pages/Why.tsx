import { cs } from "@backtickjs/core";
import { Code } from "../components/Code.js";
import { Comparison } from "../components/Comparison.js";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";
import { XHP_COLUMNS, XHP_ROWS } from "../comparisons.js";
import { highlight } from "../highlight.js";
import { BACKTICK_REORDER, XHP_CLIENT, XHP_SERVER } from "../samples.js";

// The samples, coloured once, when the server starts.
const XHP_SERVER_LINES = await highlight(XHP_SERVER, "hack");
const XHP_CLIENT_LINES = await highlight(XHP_CLIENT, "tsx");
const BACKTICK_REORDER_LINES = await highlight(BACKTICK_REORDER, "tsx");

export const Why = cs`() => (
  <$Layout>
    <$Section
      eyebrow="Why Backtick"
      title="XHP had the right model."
      lede="Facebook built its pages with XHP: the server rendered the UI right where the data lived. There was no API layer between them, nothing was overfetched, and there was no query cache to keep in sync. React grew out of bringing XHP's ideas to JavaScript, and server components are React heading back to the server."
    />

    <$Section
      eyebrow="The catch"
      title="And the wrong scripting story."
      lede="Interactivity lived in a separate file. The server asked for a behaviour by name and passed it JSON; the client registered a function under that name. Nothing checked that the two agreed, so a renamed field broke in production, and the JavaScript shipped on its own schedule."
    >
      {/* The server's half and the client's, joined only by a name. */}
      <div class="grid gap-5 xl:grid-cols-2">
        <$Code file="Reorder.hack" lines={$XHP_SERVER_LINES} compact />
        <$Code file="reorder-button.js" lines={$XHP_CLIENT_LINES} compact />
      </div>
    </$Section>

    <$Section
      eyebrow="Backtick"
      title="Keep the model. Fix the scripting."
      lede="The client code sits in the server component that uses it. The script is the join, and every $ is a value crossing to it, type-checked on both sides. It ships with the screen, from the same deploy."
    >
      <$Code file="server/Reorder.tsx" lines={$BACKTICK_REORDER_LINES} />
    </$Section>

    <$Section eyebrow="Side by side" title="Same model, new scripting.">
      <$Comparison columns={$XHP_COLUMNS} rows={$XHP_ROWS} />
    </$Section>

    <$Section
      eyebrow="Why React Native"
      title="Native apps need it most."
      lede="A web page at least loads fresh code with each visit. A native app carries every screen in its binary and fetches its data through an API built for it, so each change waits for a store release. Backtick serves screens from your server, the way XHP served pages, and they run on the React Native your app already ships."
    />
  </$Layout>
)`;
