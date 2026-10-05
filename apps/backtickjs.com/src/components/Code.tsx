import { cs } from "@backtickjs/core";
import { highlight } from "../highlight.js";

// A file as an editor shows it: its name above, its code coloured below.
export async function Code({
  file,
  source,
  lang = "tsx",
  compact = false,
}: {
  file: string;
  source: string;
  lang?: "tsx" | "json" | "bash";
  // A size smaller, for two files side by side.
  compact?: boolean;
}) {
  const lines = await highlight(source, lang);
  // Written out whole, so the stylesheet generator finds both.
  const size = compact ? "text-[14px]" : "text-[15px]";
  return cs`(
    <div class="h-full min-w-0 overflow-hidden rounded-[20px] border border-code-line bg-code">
      <p class="border-b border-code-line px-5 py-3 font-mono text-xs text-code-muted">
        {$file}
      </p>
      <pre class={"m-0 overflow-x-auto py-4 font-mono leading-[1.6] " + $size}>
        {$lines.map((line) => (
          <div class={line.added ? "code-line code-added" : "code-line"}>
            {line.tokens.map((token) => (
              <span style={{ color: token.color }}>{token.text}</span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  )`;
}

// A few characters of code inside prose, coloured as the panels colour it.
export async function InlineCode({ source }: { source: string }) {
  const [line] = await highlight(source, "tsx");
  return cs`(
    <code class="rounded-md bg-code px-1.5 py-0.5 font-mono text-[0.85em]">
      {$line!.tokens.map((token) => (
        <span style={{ color: token.color }}>{token.text}</span>
      ))}
    </code>
  )`;
}
