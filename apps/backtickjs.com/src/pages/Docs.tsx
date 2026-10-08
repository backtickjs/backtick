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
    ],
  },
  {
    name: "Learn",
    pages: [
      {
        path: "/docs/thinking-in-backtick",
        title: "Thinking in Backtick",
        description:
          "What runs on your server, what runs on the phone, and what crosses between them: server components, splices, client components, and how they compose.",
        file: "thinking-in-backtick.md",
      },
      {
        path: "/docs/react-native-and-packages",
        title: "React Native and packages",
        description:
          "Every component, API and hook of React Native and React, spliced into scripts with their own names and types, and any other package your app ships.",
        file: "react-native-and-packages.md",
      },
      {
        path: "/docs/testing",
        title: "Testing screens",
        description:
          "Draw a screen in a test as your app does, tap it, and check what it shows.",
        file: "testing.md",
      },
      {
        path: "/docs/errors",
        title: "Errors",
        description:
          "Every message Backtick can show you, by who says it, with its fix.",
        file: "errors.md",
      },
    ],
  },
  {
    name: "Advanced",
    pages: [
      {
        path: "/docs/how-it-works",
        title: "How it works",
        description:
          "Compiled when your server loads, checked by TypeScript, bundled for each request, run by your app: what each step does, and the packages that do it.",
        file: "how-it-works.md",
      },
      {
        path: "/docs/scripts-in-depth",
        title: "Scripts in depth",
        description:
          "A script's three shapes, when its code runs, scripts inside data, and what a splice checks.",
        file: "scripts-in-depth.md",
      },
    ],
  },
];

// Where pages that no longer exist went, for links to them.
export const REDIRECTS: Record<string, string> = {
  "/docs/server-components": "/docs/thinking-in-backtick",
  "/docs/client-scripts": "/docs/thinking-in-backtick",
  "/docs/splices": "/docs/thinking-in-backtick",
  "/docs/client-components": "/docs/thinking-in-backtick",
  "/docs/composing": "/docs/thinking-in-backtick",
  "/docs/react-native-apis": "/docs/react-native-and-packages",
  "/docs/other-packages": "/docs/react-native-and-packages",
  "/docs/type-checking": "/docs/how-it-works",
  "/docs/reference/core": "/docs/scripts-in-depth",
  "/docs/reference/bundler": "/docs/how-it-works",
  "/docs/reference/react-native-client": "/docs/how-it-works",
};

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
    const { html, headings } = await renderPage(
      await readPage(entry.file, "html"),
    );
    const source = await readPage(entry.file, "markdown");
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
