import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import type { Client } from "@backtickjs/core";
import { Docs } from "./pages/Docs.js";
import { Home } from "./pages/Home.js";

// A page: where it lives, what draws it, and what search results and link
// previews show for it.
export type Page = {
  path: string;
  Page: Client<() => JSX.Element>;
  title: string;
  description: string;
};

// Every page on the site: what the dev server serves and what the build writes
// out.
export const PAGES: Page[] = [
  {
    path: "/",
    Page: Home,
    title: "Backtick · A delightful programming model for React Native",
    description:
      "A delightful programming model for React Native. Build your app in" +
      " React and TypeScript, with your data, logic and UI in one place," +
      " type-checked end to end.",
  },
  {
    path: "/docs",
    Page: Docs,
    title: "Backtick · Docs",
    description:
      "Create a React Native app with a Backtick server in one command, then" +
      " write a screen, serve it per request and draw it in your app.",
  },
];
