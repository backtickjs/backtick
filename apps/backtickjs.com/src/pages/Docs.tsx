import { cs } from "@backtickjs/core";
import { DocsLayout } from "../components/DocsLayout.js";
import {
  type DocsLink,
  type DocsSection,
  type Heading,
  readPage,
  renderPage,
} from "../docs.js";
import type { Page } from "../pages.js";
import { Why, WHY_HEADINGS, WHY_MARKDOWN } from "./Why.js";

// A docs page: its body Markdown in `content/`, or drawn by a component with
// Markdown of its own for agents.
type Entry = DocsLink & { description: string } & (
    | { file: string }
    | { body: "why" }
  );

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
        path: "/docs/why",
        title: "Why Backtick",
        description:
          "How Backtick compares to shipping screens in the app binary, to Next.js, and to Expo's over-the-air updates and server components.",
        body: "why",
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
    const markdownHeader = `# ${title}\n\n${description}\n\n`;

    if ("file" in entry) {
      const source = await readPage(entry.file);
      const { html, headings } = await renderPage(source);
      return {
        path,
        title: `Backtick · ${title}`,
        description,
        markdown: markdownHeader + source,
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
    }

    const headings: Heading[] = WHY_HEADINGS;
    return {
      path,
      title: `Backtick · ${title}`,
      description,
      markdown: markdownHeader + WHY_MARKDOWN,
      Page: cs`() => (
        <$DocsLayout
          sections={$SECTIONS}
          path={$path}
          title={$title}
          description={$description}
          headings={$headings}
          previous={$previous}
          next={$next}
        >
          <$Why />
        </$DocsLayout>
      )`,
    };
  }),
);
