import { cs } from "@backtickjs/core";
import type { JSX } from "solid-js";
import { Logo } from "./Logo.js";

// The chrome every page is drawn in.
export const Layout = cs`(props: { children: JSX.Element }) => (
  <div class="mx-auto box-border max-w-[1200px] px-6 text-[17px] leading-relaxed">
    <header class="flex items-center justify-between gap-6 py-7">
      {/* The logo carries no text, so its link says what it is for anyone
          not looking at it. */}
      <a href="/" aria-label="Backtick" class="flex text-ink">
        <$Logo />
      </a>
      <nav class="flex items-center gap-5 whitespace-nowrap text-[15px] font-medium">
        <a href="/download/" class="no-underline">
          Download
        </a>
        <a href="/support/" class="no-underline">
          Support
        </a>
      </nav>
    </header>

    <main>{props.children}</main>

    <footer class="mt-24 flex flex-wrap justify-between gap-4 border-t border-line pt-7 pb-10 text-sm text-muted">
      <span>Backtick</span>
      <nav class="flex flex-wrap gap-x-5 gap-y-2">
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/support/">Support</a>
        <a href="mailto:support@backtickjs.com">support@backtickjs.com</a>
        {/* The framework Backtick apps are made with, for developers. */}
        <a href="https://backtickjs.dev">For developers</a>
      </nav>
    </footer>
  </div>
)`;
