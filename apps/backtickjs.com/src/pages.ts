import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";
import type { Client } from "@backtickjs/core";
import { NotFound } from "./pages/NotFound.js";

// Where the site is served, for the addresses search engines and link previews
// need whole.
export const ORIGIN = "https://backtickjs.com";

// The framework's site, where the docs moved.
export const DOCS_ORIGIN = "https://backtickjs.dev";

// A page's whole address, for search engines and link previews.
export function urlOf(path: string): string {
  return ORIGIN + path;
}

// A page: where it lives, ending in a slash, what draws it, and what search
// results and link previews show for it. A page with no path has no address
// of its own, as the one answering for addresses that don't exist.
export type Page = {
  path: string | null;
  Page: Client<() => JSX.Element>;
  title: string;
  description: string;
};

// What the site answers for any address that isn't a page, and what search
// engines are told to leave out.
export const NOT_FOUND: Page = {
  path: null,
  Page: NotFound,
  title: "Backtick · Page not found",
  description: "This page doesn't exist.",
};
