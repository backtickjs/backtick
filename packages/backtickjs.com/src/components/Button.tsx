import type { HtmlNode } from "@backtickjs/web-sdk/jsx-runtime";
import type { Children } from "@backtickjs/core";
import { ink, paper } from "../theme.js";

const BASE =
  "display: inline-block; padding: 11px 20px; border-radius: 999px;" +
  ` border: 1px solid ${ink}; font-size: 15px; font-weight: 500;` +
  " text-decoration: none";

// Filled or outlined, which is the only thing a caller decides — a page with
// two ways of saying the same button is a page with two of everything.
export async function Button({
  href,
  solid,
  children,
}: {
  href: string;
  solid?: boolean;
  children: Children<HtmlNode>;
}) {
  const look =
    solid === true
      ? BASE + `; background: ${ink}; color: ${paper}`
      : BASE + `; color: ${ink}`;

  // Two shapes rather than an `<a>` with nothing to go to: this language has no
  // `undefined`, so a button with no destination is a different element and not
  // a link missing its half. A `<span>` because it is inert on purpose — a
  // `<button>` would take focus and a press, and answer neither.
  return (
    <a href={href} style={look}>
      {children}
    </a>
  );
}
