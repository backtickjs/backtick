import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";

const COMMAND = "npx create-backtick-app@latest";

// The one command to a running app, with a button that copies it.
export const QuickStart = cs`() => {
  const [copied, setCopied] = $createSignal(false);
  const copy = () => {
    window.navigator.clipboard.writeText($COMMAND).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div class="inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-wash py-1.5 pr-1.5 pl-5 font-mono text-[15px]">
      <span class="overflow-x-auto whitespace-nowrap">
        <span class="text-muted select-none">{"$ "}</span>
        {$COMMAND}
      </span>
      <button
        class="flex-none cursor-pointer rounded-full border border-line bg-paper px-4 py-2 font-sans text-sm font-medium transition hover:border-react/40"
        onclick={copy}
        data-umami-event="copy-command"
      >
        {copied() ? "Copied" : "Copy"}
      </button>
    </div>
  );
}`;
