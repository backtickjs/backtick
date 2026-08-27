import type { JSX } from "@backtickjs/web-sdk/jsx-runtime";
import { Home } from "./pages/Home.js";

export interface Page {
  // Also where the file goes: `/` is `index.html`, and a `/guide/` added here
  // would be `guide/index.html` — the name Pages serves the url from.
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly view: JSX.Element;
  // A script beside the bundle, for a page that needs one. Only the playground
  // does, and only until a script can read what a reader typed.
  readonly script?: "play";
}

export const pages: readonly Page[] = [
  {
    path: "/",
    title: "Backtick — Ship today. Not next release.",
    description:
      "A server-driven UI framework: your app fetches screens and their" +
      " behavior at runtime, so changing one costs a deploy rather than a" +
      " release.",
    view: <Home />,
    script: "play",
  },
];
