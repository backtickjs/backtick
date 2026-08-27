import type { JSX } from "@backtickjs/web-sdk/jsx-runtime";
import { Home } from "./pages/Home.js";

export interface Page {
  // Also where the file goes: `/` is `index.html`, and a `/guide/` added here
  // would be `guide/index.html` — the name Pages serves the url from.
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly view: JSX.Element;
}

// Every route on the site. A tag here is not run — it is a value describing
// what to run, which `documents.tsx` hands to the bundler one page at a time.
export const pages: readonly Page[] = [
  {
    path: "/",
    title: "Backtick — Deploy to production in minutes",
    description:
      "Backtick is a TypeScript UI framework that compiles components to data. The client reads a bundle instead of evaluating JavaScript, so a UI change ships without a rebuild.",
    view: <Home />,
  },
];
