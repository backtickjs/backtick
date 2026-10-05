import { cs } from "@backtickjs/core";
import { highlight } from "../highlight.js";
import { codeBg, codeLine, codeMuted, mono, radius } from "./theme.js";

const FRAME =
  `background: ${codeBg}; border: 1px solid ${codeLine};` +
  ` border-radius: ${radius}; overflow: hidden; min-width: 0;` +
  " box-shadow: 0 1px 0 rgba(255,255,255,.04) inset";

const BAR =
  "display: flex; align-items: center; gap: 12px; padding: 12px 16px;" +
  ` border-bottom: 1px solid ${codeLine}`;

const DOTS = "display: flex; gap: 6px";
const DOT =
  "width: 10px; height: 10px; border-radius: 50%; background: #30363d";

const FILE = `font-family: ${mono}; font-size: 12px; color: ${codeMuted}`;

export const PRE =
  "margin: 0; padding: 16px 0; overflow-x: auto;" +
  ` font-family: ${mono}; font-size: 13px; line-height: 1.7`;

export const LINE = "padding: 0 20px; white-space: pre; min-height: 1.7em";

export const ADDED =
  `${LINE}; background: rgba(46, 160, 67, 0.14);` +
  " box-shadow: inset 3px 0 0 #3fb950";

// A file as an editor shows it: its name above, its code coloured below.
export async function Code({
  file,
  source,
  lang = "tsx",
}: {
  file: string;
  source: string;
  lang?: "tsx" | "json" | "bash";
}) {
  const lines = await highlight(source, lang);
  return cs`(
    <div style={$FRAME}>
      <div style={$BAR}>
        <div style={$DOTS}>
          <span style={$DOT} />
          <span style={$DOT} />
          <span style={$DOT} />
        </div>
        <span style={$FILE}>{$file}</span>
      </div>
      <pre style={$PRE}>
        {$lines.map((line) => (
          <div style={line.added ? $ADDED : $LINE}>
            {line.tokens.map((token) => (
              <span style={"color: " + token.color}>{token.text}</span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  )`;
}
