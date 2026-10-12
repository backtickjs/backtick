import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";

const PACKAGE = "npx create-backtick-app";
// Shown only where it fits; Copy always copies it.
const VERSION = "@latest";

// The one command to a running app, with a button that copies it.
export const QuickStart = cs`() => {
  const [copied, setCopied] = $createSignal(false);
  const copy = () => {
    window.navigator.clipboard.writeText($PACKAGE + $VERSION).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div class="inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-wash py-1.5 pr-1.5 pl-4 font-mono text-[13px] sm:pl-5 sm:text-[15px]">
      <span class="scrollbar-none overflow-x-auto whitespace-nowrap">
        <span class="text-muted select-none">{"$ "}</span>
        {$PACKAGE}
        <span class="hidden sm:inline">{$VERSION}</span>
      </span>
      <button
        class="flex-none cursor-pointer rounded-full border border-line bg-paper px-3.5 py-2 font-sans text-sm font-medium sm:px-4 transition hover:border-react/40"
        onclick={copy}
        data-umami-event="copy-command"
      >
        {copied() ? "Copied" : "Copy"}
      </button>
    </div>
  );
}`;
