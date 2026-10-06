import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { GitHubMark } from "./GitHubMark.js";
import { Logo } from "./Logo.js";

// The chrome every page is drawn in.
export async function Layout({ children }: { children: JSX.Element[] }) {
  return cs`(
    <div class="mx-auto box-border max-w-[1200px] px-6 text-[17px] leading-relaxed">
      <header class="flex items-center justify-between gap-6 py-7">
        <a href="/" class="flex text-ink">
          {${(<Logo />)}}
        </a>
        <nav class="flex items-center gap-5 whitespace-nowrap text-[15px] font-medium">
          <a href="/why" class="no-underline">
            Why
          </a>
          <a href="/docs" class="no-underline">
            Docs
          </a>
          {/* The mark carries no text, so the link says what it is for anyone
              not looking at it. */}
          <a
            href="https://github.com/backtickjs/backtick"
            aria-label="GitHub"
            class="flex"
          >
            {${(<GitHubMark />)}}
          </a>
        </nav>
      </header>

      <main>{$children}</main>

      <footer class="mt-24 flex flex-wrap justify-between gap-4 border-t border-line pt-7 pb-10 text-sm text-muted">
        <span>Backtick · MIT licensed</span>
        <a href="https://github.com/backtickjs/backtick">
          github.com/backtickjs/backtick
        </a>
      </footer>
    </div>
  )`;
}
