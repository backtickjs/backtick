import { cs } from "@backtickjs/core";
import { RUN } from "../samples.js";
import { Button } from "./Button.js";
import { Code } from "./Code.js";
import { gradient, line, muted } from "./theme.js";

const BAND =
  "margin-top: 112px; padding: clamp(28px, 6vw, 64px); border-radius: 32px;" +
  ` border: 1px solid ${line}; position: relative; overflow: hidden;` +
  " background: radial-gradient(120% 120% at 0% 0%, rgba(97,218,251,.14), transparent 50%)," +
  " radial-gradient(120% 120% at 100% 100%, rgba(167,139,250,.18), transparent 50%)";

const TITLE =
  "margin: 0; max-width: 14em; font-size: clamp(32px, 5vw, 52px);" +
  " line-height: 1.05; letter-spacing: -0.04em; font-weight: 800";

const SHINE =
  `background: ${gradient}; -webkit-background-clip: text; background-clip: text;` +
  " color: transparent";

const TEXT = `margin: 18px 0 28px; max-width: 34em; font-size: 18px; color: ${muted}`;

const ACTIONS = "display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px";

export async function Cta() {
  return cs`(
    <section style={$BAND}>
      <h2 style={$TITLE}>
        {"Your next screen doesn't need "}
        <span style={$SHINE}>a release.</span>
      </h2>
      <p style={$TEXT}>
        Run the example server and the Expo app side by side, then change the
        server and watch the phone redraw.
      </p>
      {${(<Code file="terminal" source={RUN} lang="bash" />)}}
      <div style={$ACTIONS}>
        {
          ${(
            <Button
              href="https://github.com/backtickjs/backtick"
              solid
              label="Star on GitHub"
            />
          )}
        }
        {
          ${(
            <Button
              href="https://github.com/backtickjs/backtick/tree/main/examples/react-native-app"
              label="Read the app example"
            />
          )}
        }
      </div>
    </section>
  )`;
}
