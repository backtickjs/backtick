import { cs } from "@backtickjs/core";
import type { JSX } from "solid-js";
import { Logo } from "./Logo.js";

// The chrome every page is drawn in: the logo above, every other page below.
// At least a screen tall, so a short page's content can center in it and the
// footer sits at the bottom.
export const Layout = cs`(props: { children: JSX.Element }) => (
  <div class="mx-auto box-border flex min-h-svh max-w-[1200px] flex-col px-6 text-[17px] leading-relaxed">
    <header class="py-7">
      {/* The logo carries no text, so its link says what it is for anyone
          not looking at it. */}
      <a href="/" aria-label="Backtick" class="inline-flex text-ink">
        <$Logo />
      </a>
    </header>

    <main class="flex flex-1 flex-col">{props.children}</main>

    <footer class="mt-8 border-t border-line pt-7 pb-10 text-sm text-muted">
      <nav class="flex flex-wrap justify-between gap-x-5 gap-y-2">
        {/* The framework Backtick apps are made with, for developers. */}
        <a href="https://backtickjs.dev">backtickjs.dev</a>
        <span class="flex flex-wrap gap-x-5 gap-y-2">
          <a href="/support/">Support</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </span>
      </nav>
    </footer>
  </div>
)`;
