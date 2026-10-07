import { cs } from "@backtickjs/core";
import { DocsLayout } from "../components/DocsLayout.js";
import {
  type DocsLink,
  type DocsSection,
  readPage,
  renderPage,
  staticArticle,
} from "../docs.js";
import type { Page } from "../pages.js";

// A docs page, its body Markdown in `content/`.
type Entry = DocsLink & { description: string; file: string };

// The sidebar, in reading order.
const ENTRIES: { name: string; pages: Entry[] }[] = [
  {
    name: "Get started",
    pages: [
      {
        path: "/docs",
        title: "Quick start",
        description:
          "Create a React Native app with a Backtick server in one command, then write a screen, serve it per request and draw it in your app.",
        file: "quick-start.md",
      },
      {
        path: "/docs/tutorial",
        title: "Tutorial",
        description:
          "Build a coffee-ordering screen in five steps: a menu from your server, an order kept on the phone, sent back, and remembered for next time.",
        file: "tutorial.md",
      },
      {
        path: "/docs/thinking-in-backtick",
        title: "Thinking in Backtick",
        description:
          "What runs on your server, what runs on the phone, and what crosses between them.",
        file: "thinking-in-backtick.md",
      },
    ],
  },
];

const SECTIONS: DocsSection[] = ENTRIES.map((section) => ({
  name: section.name,
  pages: section.pages.map(({ path, title }) => ({ path, title })),
}));

const ORDER = SECTIONS.flatMap((section) => section.pages);

export const DOCS_PAGES: (Page & { path: string })[] = await Promise.all(
  ENTRIES.flatMap((section) => section.pages).map(async (entry, index) => {
    const { path, title, description } = entry;
    const previous = ORDER[index - 1] ?? null;
    const next = ORDER[index + 1] ?? null;
    const source = await readPage(entry.file);
    const { html, headings } = await renderPage(source);
    return {
      path,
      title: `Backtick · ${title}`,
      description,
      markdown: `# ${title}\n\n${description}\n\n${source}`,
      staticHtml: staticArticle(title, description, html),
      Page: cs`() => (
        <$DocsLayout
          sections={$SECTIONS}
          path={$path}
          title={$title}
          description={$description}
          headings={$headings}
          previous={$previous}
          next={$next}
          html={$html}
        />
      )`,
    };
  }),
);
