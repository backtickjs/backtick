import { ORIGIN, PAGES } from "./pages.js";

// What agents read: each page with Markdown at its path and `.md`, an index
// of them at `/llms.txt`, and all of them at `/llms-full.txt`, as
// llmstxt.org describes.
const DOCS = PAGES.filter((page) => page.markdown !== undefined);

export const TEXT_FILES: { path: string; text: string }[] = [
  ...DOCS.map((page) => ({ path: `${page.path}.md`, text: page.markdown! })),
  {
    path: "/llms.txt",
    text: `# Backtick

> Server-driven UI for React Native: screens written as React server components with inline client code, bundled per request on your server and run by your app. Type-checked end to end.

## Docs

${DOCS.map(
  (page) =>
    `- [${page.markdown!.split("\n")[0]!.replace(/^# /, "")}](${ORIGIN}${page.path}.md): ${page.description}`,
).join("\n")}
`,
  },
  {
    path: "/llms-full.txt",
    text:
      DOCS.map((page) => page.markdown!.trimEnd()).join("\n\n---\n\n") + "\n",
  },
];
