import { ORIGIN } from "./pages.js";
import { DOCS_PAGES } from "./pages/Docs.js";

// What agents read, as llmstxt.org describes: an index of the docs, served
// at `/llms.txt`, and all of them at `/llms-full.txt`. Each page's Markdown
// is served at its path and `.md`.
export const LLMS_TXT = `# Backtick

> Fully server-driven React Native. Write every screen in React, on your server: layout, data and behaviour. Changes ship with your next deploy, not your next app store release.

## Docs

${DOCS_PAGES.map(
  (page) =>
    `- [${page.markdown.split("\n")[0]!.replace(/^# /, "")}](${ORIGIN}${page.path}.md): ${page.description}`,
).join("\n")}
`;

export const LLMS_FULL_TXT =
  DOCS_PAGES.map((page) => page.markdown.trimEnd()).join("\n\n---\n\n") + "\n";
