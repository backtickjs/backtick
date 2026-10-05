import { cs } from "@backtickjs/core";
import { highlight } from "../highlight.js";

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
    <div class="min-w-0 overflow-hidden rounded-[20px] border border-code-line bg-code">
      <div class="flex items-center gap-3 border-b border-code-line px-4 py-3">
        <div class="flex gap-1.5">
          <span class="size-2.5 rounded-full bg-[#3c3c3c]" />
          <span class="size-2.5 rounded-full bg-[#3c3c3c]" />
          <span class="size-2.5 rounded-full bg-[#3c3c3c]" />
        </div>
        <span class="font-mono text-xs text-code-muted">{$file}</span>
      </div>
      <pre class="m-0 overflow-x-auto py-4 font-mono text-[13px] leading-[1.7]">
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
