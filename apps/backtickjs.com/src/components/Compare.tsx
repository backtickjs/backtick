import { cs } from "@backtickjs/core";
import { COMPONENT, SCHEMA } from "../samples.js";
import { Code } from "./Code.js";
import { muted } from "./theme.js";

const ROW = "display: flex; flex-wrap: wrap; gap: 20px";
const SIDE =
  "flex: 1 1 420px; min-width: 0; display: grid; gap: 14px; align-content: start";
const HEAD = "margin: 0; font-size: 17px; font-weight: 700";
const TEXT = `margin: 0; font-size: 15px; color: ${muted}`;

export async function Compare() {
  return cs`(
    <div style={$ROW}>
      <div style={$SIDE}>
        <p style={$HEAD}>Server-driven UI, as usually built</p>
        <p style={$TEXT}>
          A schema you invent, a renderer to keep in sync on every platform, and
          an action language that grows until it is a worse JavaScript.
        </p>
        {${(<Code file="reorder-button.json" source={SCHEMA} lang="json" />)}}
      </div>
      <div style={$SIDE}>
        <p style={$HEAD}>Server-driven UI, with Backtick</p>
        <p style={$TEXT}>
          The component model you already ship. Logic is code, it is typed, and
          it runs on the device.
        </p>
        {${(<Code file="ReorderButton.tsx" source={COMPONENT} />)}}
      </div>
    </div>
  )`;
}
