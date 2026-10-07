import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import type { Client } from "@backtickjs/core";
import { DOCS_PAGES } from "./pages/Docs.js";
import { Home } from "./pages/Home.js";
import { NotFound } from "./pages/NotFound.js";

// Where the site is served, for the addresses search engines and link previews
// need whole.
export const ORIGIN = "https://backtickjs.com";

// A page's address, as GitHub Pages serves it: every page but the root ends in
// a slash.
export function urlOf(path: string): string {
  return ORIGIN + (path === "/" ? "/" : `${path}/`);
}

// A page: where it lives, what draws it, and what search results and link
// previews show for it. A page with no path has no address of its own, as the
// one answering for addresses that don't exist. A page with Markdown is also
// served as that, at its path and `.md`, for agents. A page with static HTML
// has it in its document until it's drawn.
export type Page = {
  path: string | null;
  Page: Client<() => JSX.Element>;
  title: string;
  description: string;
  markdown?: string;
  staticHtml?: string;
};

// Every page on the site: what the dev server serves and what the build writes
// out.
export const PAGES: (Page & { path: string })[] = [
  {
    path: "/",
    Page: Home,
    title: "Backtick · A delightful programming model for React Native",
    description:
      "A delightful programming model for React Native. Build your app in" +
      " React and TypeScript, with your data, logic and UI in one place," +
      " type-checked end to end.",
  },
  ...DOCS_PAGES,
];

// What GitHub Pages serves for any address that isn't a page, and what search
// engines are told to leave out.
export const NOT_FOUND: Page = {
  path: null,
  Page: NotFound,
  title: "Backtick · Page not found",
  description: "This page doesn't exist.",
};
