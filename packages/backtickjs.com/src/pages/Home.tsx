import { readFile } from "node:fs/promises";
import { bundler } from "@backtickjs/core";
import { Code } from "../components/Code.js";
import { Counter } from "../components/Counter.js";
import { REPO } from "../links.js";

export async function Home() {
  // The component as it is actually written, read from the file the page shows.
  // A copy pasted into the markup is a copy that drifts.
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
      <div class="hero">
        <h1>
          {"Deploy to production"}
          <br />
          {"in minutes"}
        </h1>
        <p>
          Backtick is a TypeScript UI framework that compiles components to
          data. What reaches the client is a bundle it reads, not a script it
          evaluates — so changing what a screen does means serving different
          bytes, with no rebuild and no release to wait for.
        </p>
        <div class="actions">
          <a class="button button-solid" href={REPO}>
            View on GitHub
          </a>
          <a class="button" href="#start">
            Get started
          </a>
        </div>
      </div>

      <section>
        <h2>Try it</h2>
        <p class="lede">
          The counter below was never sent to your browser as JavaScript. Nor
          was the page around it: both are bundles, drawn by one client script
          that is the same on every page whatever the page holds.
        </p>

        <Counter start={0} />

        <p class="caption">The component:</p>
        <Code source={source.trim()} />

        <p class="caption">
          {"And the whole of what a client needs for it — " +
            JSON.stringify(wire.length) +
            " bytes of JSON, verbatim:"}
        </p>
        <pre class="wire">
          <code>{wire}</code>
        </pre>
      </section>

      <section>
        <h2>How it works</h2>
        <ol class="steps">
          <li>
            <span class="ordinal">01</span>
            <h3>Write</h3>
            <p>
              Components are TypeScript and JSX. The code inside a{" "}
              <code>cs</code> template is the part that runs on the client;
              everything around it runs on your server.
            </p>
          </li>
          <li>
            <span class="ordinal">02</span>
            <h3>Bundle</h3>
            <p>
              <code>bundler.run</code> runs the server half and hands back plain
              data. A <code>$</code> splices a server value into the script, so
              the client is given results rather than the work behind them.
            </p>
          </li>
          <li>
            <span class="ordinal">03</span>
            <h3>Draw</h3>
            <p>
              The client reads the bundle and draws it. It interprets — it does
              not evaluate — which is why a bundle can be drawn by a client with
              no JavaScript in it at all.
            </p>
          </li>
        </ol>
      </section>

      <section id="start">
        <h2>Start</h2>
        <p class="lede">
          Nothing is on npm yet. The examples run from a clone.
        </p>
        <Code
          source={
            "git clone " +
            REPO +
            ".git\ncd backtick\npnpm install\npnpm build\n\ncd examples/todo-list\npnpm start"
          }
        />
      </section>
    </>
  );
}
