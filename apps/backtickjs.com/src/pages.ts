import { Docs } from "./pages/Docs.js";
import { Home } from "./pages/Home.js";
import { Why } from "./pages/Why.js";

// Every page on the site, by path: what the dev server serves and what the
// build writes out.
export const PAGES = [
  {
    path: "/",
    Page: Home,
    title: "Backtick · A delightful programming model for React Native",
  },
  { path: "/docs", Page: Docs, title: "Backtick · Docs" },
  { path: "/why", Page: Why, title: "Backtick · Why Backtick" },
];
