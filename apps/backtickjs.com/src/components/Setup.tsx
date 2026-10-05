import { cs } from "@backtickjs/core";
import { APP, SERVER } from "../samples.js";
import { Code } from "./Code.js";
import { cyan, mono } from "./theme.js";

const ROW = "display: flex; flex-wrap: wrap; gap: 20px";
const SIDE =
  "flex: 1 1 440px; min-width: 0; display: grid; gap: 12px; align-content: start";
const HEAD = `margin: 0; font-family: ${mono}; font-size: 12px; letter-spacing: 0.08em; color: ${cyan}`;

export async function Setup() {
  return cs`(
    <div style={$ROW}>
      <div style={$SIDE}>
        <p style={$HEAD}>ON YOUR SERVER</p>
        {${(<Code file="server/index.tsx" source={SERVER} />)}}
      </div>
      <div style={$SIDE}>
        <p style={$HEAD}>IN YOUR APP</p>
        {${(<Code file="app/App.tsx" source={APP} />)}}
      </div>
    </div>
  )`;
}
