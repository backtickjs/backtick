import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";
import { REPO } from "../links.js";
import { Logo } from "./Logo.js";
import { ink, line, muted, sans } from "../theme.js";

// The outermost thing the bundle draws, so this is where what used to sit on
// `<body>` now lives: type and ink inherit from here to everything on the page.
//
// No background: `color-scheme` in the head has the browser paint the canvas
// for the theme, which covers the body's own margin too — a background here
// would stop 8px short of the edge and show a frame around the page.
const SHELL =
  "max-width: 820px; margin: 0 auto; padding: 0 24px;" +
  ` box-sizing: border-box; font-family: ${sans}; font-size: 17px;` +
  ` line-height: 1.6; color: ${ink}; -webkit-font-smoothing: antialiased`;

const TOP =
  "display: flex; align-items: center; justify-content: space-between;" +
  " gap: 24px; padding: 28px 0";

const NAV = `display: flex; gap: 20px; font-size: 15px; color: ${muted}`;

const FOOT =
  "display: flex; flex-wrap: wrap; justify-content: space-between;" +
  " gap: 8px 20px; padding: 40px 0 64px;" +
  ` border-top: 1px solid ${line}; font-size: 14px; color: ${muted}`;

// The chrome every page is drawn in. A server component: it runs while
// bundling and never reaches the client, so what it decides is settled in the
// bundle rather than asked again there.
export async function Layout({
  children,
}: {
  // Required, not optional: every page has a body, and `FragmentProps` says
  // `children?` because a fragment may hold nothing.
  children: NonNullable<FragmentProps["children"]>;
}) {
  return (
    <div style={SHELL}>
      <header style={TOP}>
        <a href="/" style={`display: flex; color: ${ink}`}>
          <Logo />
        </a>
        <nav style={NAV}>
          <a href={REPO} style="color: inherit">
            GitHub
          </a>
        </nav>
      </header>

      <main>{children}</main>

      <footer style={FOOT}>
        <span>Built with Backtick. This page is one bundle.</span>
        <a href={REPO} style="color: inherit">
          github.com/trybacktick/backtick
        </a>
      </footer>
    </div>
  );
}
