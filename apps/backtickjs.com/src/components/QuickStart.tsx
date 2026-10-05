import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";

const COMMAND = "npx create-backtick-app@latest";

// The one command to a running app, with a button that copies it.
export async function QuickStart() {
  return cs`{
    const [copied, setCopied] = $createSignal(false);
    const copy = () => {
      window.navigator.clipboard.writeText($COMMAND).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      });
    };

    return (
      <div class="inline-flex max-w-full items-center gap-3 rounded-xl border border-line bg-wash py-2 pr-2 pl-4 font-mono text-[15px]">
        <span class="overflow-x-auto whitespace-nowrap">
          <span class="text-muted select-none">{"$ "}</span>
          {$COMMAND}
        </span>
        <button
          class="flex-none cursor-pointer rounded-lg border border-line bg-paper px-3 py-1.5 font-sans text-sm font-medium transition hover:border-react/40"
          onclick={copy}
        >
          {copied() ? "Copied" : "Copy"}
        </button>
      </div>
    );
  }`;
}
