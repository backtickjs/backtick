import { readFile } from "node:fs/promises";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import { highlight } from "./highlight.js";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type DocsLink = { title: string; path: string };
export type DocsSection = { name: string; pages: DocsLink[] };
export type Heading = { id: string; text: string };

const CONTENT = new URL("../content/", import.meta.url);

// A fence naming an example file and nothing else, as
//
//     ```tsx file=quick-start/server/Home.tsx
//     ```
//
// (Prettier leaves a blank line inside) is that file, from `content/examples/`, shown under its name within the
// example: `server/Home.tsx`. The examples are type-checked, so what a page
// shows compiles.
const INCLUDE = /^```(\w+) file=(\S+)\n\s*```$/gm;

// A page's Markdown with every example written out, as the site renders it
// and as agents read it.
export async function readPage(file: string): Promise<string> {
  const source = await readFile(new URL(file, CONTENT), "utf8");
  const includes = await Promise.all(
    [...source.matchAll(INCLUDE)].map(async ([, lang, path]) => {
      const code = await readFile(new URL(`examples/${path}`, CONTENT), "utf8");
      const title = path!.split("/").slice(1).join("/");
      return `\`\`\`${lang} title="${title}"\n${code.trimEnd()}\n\`\`\``;
    }),
  );
  let index = 0;
  return source.replace(INCLUDE, () => includes[index++]!);
}

// The languages a fence may name, as the highlighter knows them; `text` is
// shown uncoloured.
const LANGS = {
  tsx: "tsx",
  ts: "tsx",
  json: "json",
  jsonc: "json",
  sh: "bash",
  bash: "bash",
} as const;

const markdown = new MarkdownIt();

// Markdown as the page's HTML, and its second-level headings, which "On this
// page" lists.
export async function renderPage(
  source: string,
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const md = new MarkdownIt().use(anchor, {
    level: [2, 3],
    callback: (token, { slug, title }) => {
      if (token.tag === "h2") {
        headings.push({ id: slug, text: title });
      }
    },
  });
  const tokens = md.parse(source, {});

  // Coloured before rendering, which is synchronous.
  const fences = new Map<unknown, string>();
  for (const token of tokens) {
    if (token.type === "fence") {
      fences.set(token, await renderFence(token.info, token.content));
    }
  }
  md.renderer.rules.fence = (tokens, index) => fences.get(tokens[index])!;
  return { html: md.renderer.render(tokens, md.options, {}), headings };
}

// A fence as the site's code panels draw one: its file's name above, if it
// has one, and its lines coloured as the editor colours them.
async function renderFence(info: string, content: string): Promise<string> {
  const [lang = "text"] = info.split(/\s+/);
  const title = /title="([^"]+)"/.exec(info)?.[1];
  const code = content.replace(/\n$/, "");

  let lines: string;
  if (lang === "text") {
    lines = code
      .split("\n")
      .map((line) => `<div class="code-line">${escape(line)}</div>`)
      .join("");
  } else if (lang in LANGS) {
    lines = (await highlight(code, LANGS[lang as keyof typeof LANGS]))
      .map(
        (line) =>
          `<div class="code-line">${line.tokens
            .map(
              (token) =>
                `<span style="color:${token.color}">${escape(token.text)}</span>`,
            )
            .join("")}</div>`,
      )
      .join("");
  } else {
    throw new Error(`A fence names "${lang}", which the docs don't colour.`);
  }

  const name =
    title === undefined
      ? ""
      : `<div class="border-b border-code-line px-5 py-3 font-mono text-xs text-code-muted">${escape(title)}</div>`;
  return `<div class="my-6 overflow-hidden rounded-2xl border border-code-line bg-code text-code-ink">${name}<pre class="m-0 overflow-x-auto py-4 font-mono text-[14px] leading-[1.6]">${lines}</pre></div>`;
}

function escape(text: string): string {
  return markdown.utils.escapeHtml(text);
}
