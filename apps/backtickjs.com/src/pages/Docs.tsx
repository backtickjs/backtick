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
  {
    name: "Learn",
    pages: [
      {
        path: "/docs/server-components",
        title: "Server components",
        description:
          "Functions your server runs for every request: they read your data and return the screen.",
        file: "server-components.md",
      },
      {
        path: "/docs/client-scripts",
        title: "Client scripts",
        description:
          "Code inside cs`…`, written in your server's files and run on the phone.",
        file: "client-scripts.md",
      },
      {
        path: "/docs/splices",
        title: "Splices",
        description:
          "How a value crosses from your server into a client script, and what can cross.",
        file: "splices.md",
      },
      {
        path: "/docs/client-components",
        title: "Client components",
        description:
          "Scripts written as functions that take props: drawn as tags, with state of their own on the phone.",
        file: "client-components.md",
      },
      {
        path: "/docs/composing",
        title: "Composing",
        description:
          "Server components inside client scripts, client components inside server components, and the phone's state handed to your server's layout.",
        file: "composing.md",
      },
      {
        path: "/docs/react-native-apis",
        title: "React Native's APIs",
        description:
          "Every component, API and hook of React Native and React, spliced into scripts with their own names and types.",
        file: "react-native-apis.md",
      },
      {
        path: "/docs/other-packages",
        title: "Using other packages",
        description:
          "Any package your app ships, in a screen: createImport, versions, and the three places a package goes.",
        file: "other-packages.md",
      },
      {
        path: "/docs/type-checking",
        title: "Type checking",
        description:
          "backtick-tsc and the editor check the code inside every script, and every value crossing into it.",
        file: "type-checking.md",
      },
      {
        path: "/docs/how-it-works",
        title: "How it works",
        description:
          "Compiled when your server loads, bundled for each request, run by your app: what each step does.",
        file: "how-it-works.md",
      },
    ],
  },
  {
    name: "Guides",
    pages: [
      {
        path: "/docs/testing",
        title: "Testing screens",
        description:
          "Draw a screen in a test as your app does, tap it, and check what it shows.",
        file: "testing.md",
      },
    ],
  },
  {
    name: "Reference",
    pages: [
      {
        path: "/docs/reference/core",
        title: "@backtickjs/core",
        description:
          "The cs tag, and the types for what crosses from your server to the phone.",
        file: "reference-core.md",
      },
      {
        path: "/docs/reference/bundler",
        title: "@backtickjs/bundler",
        description:
          "Runs your server components and writes the bundle your app draws.",
        file: "reference-bundler.md",
      },
      {
        path: "/docs/reference/react-native-client",
        title: "@backtickjs/react-native-client",
        description: "Runs a bundle in your React Native app.",
        file: "reference-react-native-client.md",
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
