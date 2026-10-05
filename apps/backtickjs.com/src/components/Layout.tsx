import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { Badge } from "./Badge.js";
import { GitHubMark } from "./GitHubMark.js";
import { Logo } from "./Logo.js";
import { ink, line, muted, sans } from "./theme.js";

// The outermost thing the bundle draws, so type and ink inherit from here to
// everything on the page.
//
// No background: `color-scheme` in the head has the browser paint the canvas
// for the theme, which covers the body's own margin too — a background here
// would stop 8px short of the edge and show a frame around the page.
const SHELL =
  "max-width: 1200px; margin: 0 auto; padding: 0 24px;" +
  ` box-sizing: border-box; font-family: ${sans}; font-size: 17px;` +
  ` line-height: 1.6; color: ${ink}; -webkit-font-smoothing: antialiased`;

const TOP =
  "display: flex; align-items: center; justify-content: space-between;" +
  " gap: 24px; padding: 28px 0";

// The mark and what qualifies it, kept together so the pair moves as one
// against the nav on the other side of the header.
const BRAND = "display: flex; align-items: center; gap: 10px";

// Ink, and a weight to carry it. The colour alone was not the problem: at 15px
// under `-webkit-font-smoothing: antialiased` a regular weight thins out, and
// beside a 700 headline it reads as switched off however black it is.
const NAV =
  `display: flex; align-items: center; gap: 20px; font-size: 15px;` +
  ` font-weight: 500; color: ${ink}; white-space: nowrap`;

const HOME = `display: flex; color: ${ink}`;

const FOOT =
  "display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px;" +
  ` margin-top: 96px; padding: 28px 0 40px; border-top: 1px solid ${line};` +
  ` font-size: 14px; color: ${muted}`;

// The chrome every page is drawn in.
export async function Layout({ children }: { children: JSX.Element[] }) {
  return cs`(
    <div style={$SHELL}>
      <header style={$TOP}>
        {/* The badge sits beside the link rather than inside it: it says
            what the project is, not where the mark goes. */}
        <div style={$BRAND}>
          <a href="/" style={$HOME}>
            {${(<Logo />)}}
          </a>
          {${(<Badge label="ALPHA" />)}}
        </div>
        <nav style={$NAV}>
          <a
            class="bt-wide"
            href="#how"
            style="color: inherit; text-decoration: none"
          >
            How it works
          </a>
          <a
            href="https://github.com/backtickjs/backtick/tree/main/examples"
            style="color: inherit; text-decoration: none"
          >
            Examples
          </a>
          {/* The mark carries no text, so the link says what it is for anyone
              not looking at it. */}
          <a
            href="https://github.com/backtickjs/backtick"
            aria-label="GitHub"
            style="display: flex; color: inherit"
          >
            {${(<GitHubMark />)}}
          </a>
        </nav>
      </header>

      <main>{$children}</main>

      <footer style={$FOOT}>
        <span>Backtick · MIT licensed</span>
        <a href="https://github.com/backtickjs/backtick" style="color: inherit">
          github.com/backtickjs/backtick
        </a>
      </footer>
    </div>
  )`;
}
