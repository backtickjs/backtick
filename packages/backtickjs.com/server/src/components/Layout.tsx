import type { HtmlNode } from "@backtickjs/web-sdk";
import type { Children } from "@backtickjs/core";
import { Badge } from "./Badge.js";
import { GitHubMark } from "./GitHubMark.js";
import { Logo } from "./Logo.js";
import { ink, sans } from "../theme.js";

// The outermost thing the bundle draws, so this is where what used to sit on
// `<body>` now lives: type and ink inherit from here to everything on the page.
//
// No background: `color-scheme` in the head has the browser paint the canvas
// for the theme, which covers the body's own margin too — a background here
// would stop 8px short of the edge and show a frame around the page.
// Wide enough for an editor beside what it produces. The prose inside keeps a
// measure of its own — `Lede`, `Note` and `Caption` each cap themselves — so
// what grew here is the room the demo needed and nothing else.
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
  ` font-weight: 500; color: ${ink}`;

// The chrome every page is drawn in. A server component: it runs while
// bundling and never reaches the client, so what it decides is settled in the
// bundle rather than asked again there.
export async function Layout({
  children,
}: {
  // Required, not optional: every page has a body.
  children: Children<HtmlNode>;
}) {
  return (
    <div style={SHELL}>
      <header style={TOP}>
        {/* The badge sits beside the link rather than inside it: it says
            what the project is, not where the mark goes. */}
        <div style={BRAND}>
          <a href="/" style={`display: flex; color: ${ink}`}>
            <Logo />
          </a>
          <Badge>{"ALPHA"}</Badge>
        </div>
        <nav style={NAV}>
          <a href="/docs" style="color: inherit">
            Docs
          </a>
          {/* The mark carries no text, so the link says what it is for anyone
              not looking at it. */}
          <a
            href="https://github.com/trybacktick/backtick"
            aria-label="GitHub"
            style="display: flex; color: inherit"
          >
            <GitHubMark />
          </a>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
