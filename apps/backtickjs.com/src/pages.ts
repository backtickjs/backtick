import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";
import type { Client } from "@backtickjs/core";
import { NotFound } from "./pages/NotFound.js";

// Where the site is served, for the addresses search engines and link previews
// need whole.
export const ORIGIN = "https://backtickjs.com";

// A page's whole address, for search engines and link previews.
export function urlOf(path: string): string {
  return ORIGIN + path;
}

// Where a page's Markdown is served: `/docs/tutorial/` at `/docs/tutorial.md`.
export function markdownPathOf(path: string): string {
  return `${path.slice(0, -1)}.md`;
}

// A page: where it lives, ending in a slash as GitHub Pages serves it, what
// draws it, and what search results and link previews show for it. A page
// with no path has no address of its own, as the one answering for addresses
// that don't exist. A page with Markdown is also served as that, for agents.
// A page with static HTML has it in its document until it's drawn.
export type Page = {
  path: string | null;
  Page: Client<() => JSX.Element>;
  title: string;
  description: string;
  markdown?: string;
  staticHtml?: string;
};

// What GitHub Pages serves for any address that isn't a page, and what search
// engines are told to leave out.
export const NOT_FOUND: Page = {
  path: null,
  Page: NotFound,
  title: "Backtick · Page not found",
  description: "This page doesn't exist.",
};
