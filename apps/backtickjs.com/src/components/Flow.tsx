import { cs } from "@backtickjs/core";
import { cyan, line, mono, muted, radius, wash } from "./theme.js";

const ROW = "display: flex; flex-wrap: wrap; gap: 14px; align-items: stretch";

const CARD =
  `flex: 1 1 260px; padding: 26px; border-radius: ${radius};` +
  ` background: ${wash}; border: 1px solid ${line}`;

const STEP = `margin: 0; font-family: ${mono}; font-size: 12px; color: ${cyan}`;
const NAME =
  "margin: 10px 0 8px; font-size: 21px; font-weight: 700; letter-spacing: -0.02em";
const TEXT = `margin: 0; font-size: 15.5px; color: ${muted}`;

const CHIP =
  "display: inline-block; margin-top: 18px; padding: 5px 10px; border-radius: 8px;" +
  ` font-family: ${mono}; font-size: 12.5px; background: #0d1117; color: #e6edf3`;

const ARROW = `align-self: center; font-size: 22px; color: ${muted}`;

type Stage = { step: string; name: string; text: string; chip: string };

const STAGES: Stage[] = [
  {
    step: "01 · YOUR SERVER",
    name: "Server components",
    text:
      "Async functions that run per request. Query the database, read a flag," +
      " call the CMS, check who is asking. Keys and queries never leave.",
    chip: "async function Home()",
  },
  {
    step: "02 · THE WIRE",
    name: "A JavaScript bundle",
    text:
      "Built for the exact React and React Native versions your app shipped" +
      " with. Serve it from any route; cache it, version it, roll it back.",
    chip: "bundler.build({ input, external })",
  },
  {
    step: "03 · THE PHONE",
    name: "Client components",
    text:
      "Run on the device with real hooks and real state, and render as" +
      " native views. A tap never waits on the network unless you ask it to.",
    chip: "cs`(props) => …`",
  },
];

export async function Flow() {
  return cs`(
    <div style={$ROW}>
      {$STAGES.map((stage, index) => (
        <>
          {index > 0 && (
            <span class="bt-arrow" style={$ARROW}>
              →
            </span>
          )}
          <div style={$CARD}>
            <p style={$STEP}>{stage.step}</p>
            <p style={$NAME}>{stage.name}</p>
            <p style={$TEXT}>{stage.text}</p>
            <code style={$CHIP}>{stage.chip}</code>
          </div>
        </>
      ))}
    </div>
  )`;
}
