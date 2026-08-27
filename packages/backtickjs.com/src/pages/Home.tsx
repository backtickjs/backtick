import { readFile } from "node:fs/promises";
import { bundler } from "@backtickjs/core";
import { Button } from "../components/Button.js";
import { Caption } from "../components/Caption.js";
import { Code } from "../components/Code.js";
import { Counter } from "../components/Counter.js";
import { Lede } from "../components/Lede.js";
import { Section } from "../components/Section.js";
import { Step, Steps } from "../components/Steps.js";
import { REPO } from "../links.js";

const HERO = "padding: 64px 0 56px";

const HEADLINE =
  "margin: 0; font-size: clamp(38px, 8vw, 60px); line-height: 1.05;" +
  " letter-spacing: -0.035em; font-weight: 700";

const STANDFIRST =
  "margin: 24px 0 0; max-width: 34em; font-size: 19px; color: var(--muted)";

const ACTIONS = "display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px";

const START =
  "git clone " +
  REPO +
  ".git\ncd backtick\npnpm install\npnpm build\n\ncd examples/todo-list\npnpm start";

export async function Home() {
  // The component as it is actually written, read from the file the page
  // shows. A copy pasted into the markup is a copy that drifts.
  const source = await readFile(
    new URL("../../src/components/Counter.tsx", import.meta.url),
    "utf8",
  );

  // The counter on its own, bundled a second time so the page has something to
  // print. The one drawn below is part of this page's bundle; this is the same
  // component compiled by itself, which is what makes it small enough to read.
  const wire = JSON.stringify(await bundler.run(<Counter start={0} />));

  return (
    <>
      <div style={HERO}>
        <h1 style={HEADLINE}>
          {"Deploy to production"}
          <br />
          {"in minutes"}
        </h1>
        <p style={STANDFIRST}>
          Backtick is a TypeScript UI framework that compiles components to
          data. What reaches the client is a bundle it reads, not a script it
          evaluates — so changing what a screen does means serving different
          bytes, with no rebuild and no release to wait for.
        </p>
        <div style={ACTIONS}>
          <Button href={REPO} solid>
            View on GitHub
          </Button>
          <Button href="#start">Get started</Button>
        </div>
      </div>

      <Section title="Try it">
        <Lede>
          The counter below was never sent to your browser as JavaScript. Nor
          was the page around it — not even the stylesheet, because there isn't
          one. Everything here is the bundle, drawn by a single client script.
        </Lede>

        <Counter start={0} />

        <Caption>The component:</Caption>
        <Code source={source.trim()} />

        <Caption>
          {"And the whole of what a client needs for it — " +
            wire.length +
            " bytes of JSON, verbatim:"}
        </Caption>
        <Code source={wire} wrap />
      </Section>

      <Section title="How it works">
        <Steps>
          <Step ordinal="01" title="Write">
            Components are TypeScript and JSX. The code inside a `cs` template
            is the part that runs on the client; everything around it runs on
            your server.
          </Step>
          <Step ordinal="02" title="Bundle">
            `bundler.run` runs the server half and hands back plain data. A `$`
            splices a server value into the script, so the client is given
            results rather than the work behind them.
          </Step>
          <Step ordinal="03" title="Draw">
            The client reads the bundle and draws it. It interprets — it does
            not evaluate — which is why a bundle can be drawn by a client with
            no JavaScript in it at all.
          </Step>
        </Steps>
      </Section>

      <Section title="Start" id="start">
        <Lede>Nothing is on npm yet. The examples run from a clone.</Lede>
        <Code source={START} />
      </Section>
    </>
  );
}
