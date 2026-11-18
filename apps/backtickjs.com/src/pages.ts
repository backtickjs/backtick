import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";
import type { Client } from "@backtickjs/core";
import { NotFound } from "./pages/NotFound.js";

// Where the site is served, for the addresses search engines and link previews
// need whole.
export const ORIGIN = "https://backtickjs.com";

// Where each phone installs Backtick from: the App Store, and Google Play once
// the app is there. Without an Android link, the home page says it's coming.
export const IPHONE: string =
  "https://apps.apple.com/us/app/backtick-make-apps-with-ai/id6830867621";
export const ANDROID: string | undefined = undefined;

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
  // What search engines read about the page as data (schema.org JSON-LD),
  // beyond its title and description.
  structuredData?: object;
  // An image the page shows first, fetched before the page's script draws it.
  preloadImage?: string;
};

// The image link previews show for every page: the home page's hero.
export const PREVIEW_IMAGE = {
  url: urlOf("/og.jpg"),
  width: 1200,
  height: 630,
  alt: "Build React Native apps with AI: a Claude chat building a game, and the game running in Backtick",
};

// What the site answers for any address that isn't a page, and what search
// engines are told to leave out.
export const NOT_FOUND: Page = {
  path: null,
  Page: NotFound,
  title: "Backtick · Page not found",
  description: "This page doesn't exist.",
};
