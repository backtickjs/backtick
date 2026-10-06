import { cs } from "@backtickjs/core";
import { highlight, type Line } from "../highlight.js";

// A file as an editor shows it: its name above, its code coloured below. The
// lines come coloured by `highlight`, on the server, so the browser gets spans
// and no highlighter.
export const Code = cs`(props: {
  file: string;
  lines: Line[];
  // A size smaller, for two files side by side.
  compact?: boolean;
}) => (
  <div class="h-full min-w-0 overflow-hidden rounded-[20px] border border-code-line bg-code">
    <p class="border-b border-code-line px-5 py-3 font-mono text-xs text-code-muted">
      {props.file}
    </p>
    <pre
      class={
        "m-0 overflow-x-auto py-4 font-mono leading-[1.6] " +
        (props.compact ? "text-[14px]" : "text-[15px]")
      }
    >
      {props.lines.map((line) => (
        <div class={line.added ? "code-line code-added" : "code-line"}>
          {line.tokens.map((token) => (
            <span style={{ color: token.color }}>{token.text}</span>
          ))}
        </div>
      ))}
    </pre>
  </div>
)`;

// A few characters of code inside prose, coloured as the panels colour it.
export const InlineCode = cs`(props: { line: Line }) => (
  <code class="rounded-md bg-code px-1.5 py-0.5 font-mono text-[0.85em]">
    {props.line.tokens.map((token) => (
      <span style={{ color: token.color }}>{token.text}</span>
    ))}
  </code>
)`;

// `cs`…``, coloured once, for the prose that names client scripts.
export const CLIENT_SCRIPT_SYNTAX = (await highlight("cs`…`", "tsx"))[0]!;
