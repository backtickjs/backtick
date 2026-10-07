import { readFile } from "node:fs/promises";
import { diffLines } from "diff";
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
// (Prettier leaves a blank line inside) is that file, from
// `content/examples/`, shown under its name within the example:
// `server/Home.tsx`. The examples are type-checked and tested, so what a page
// shows works. With `diff=` naming another file, as the tutorial's previous
// step, the lines that differ from it are marked.
const INCLUDE = /^```(\w+) file=(\S+)(?: diff=(\S+))?\n\s*```$/gm;

// A page's Markdown with every example written out, as the site renders it
// and as agents read it.
export async function readPage(file: string): Promise<string> {
  const source = await readFile(new URL(file, CONTENT), "utf8");
  const includes = await Promise.all(
    [...source.matchAll(INCLUDE)].map(async ([, lang, path, before]) => {
      const code = (await readExample(path!)).trimEnd();
      const title = path!.split("/").slice(1).join("/");
      const added =
        before === undefined
          ? ""
          : ` added="${addedLines((await readExample(before)).trimEnd(), code)}"`;
      return `\`\`\`${lang} title="${title}"${added}\n${code}\n\`\`\``;
    }),
  );
  let index = 0;
  return source.replace(INCLUDE, () => includes[index++]!);
}

function readExample(path: string): Promise<string> {
  return readFile(new URL(`examples/${path}`, CONTENT), "utf8");
}

// The lines of `after` that aren't in `before`, numbered from 1, as ranges:
// `3-5,9`.
function addedLines(before: string, after: string): string {
  const ranges: string[] = [];
  let line = 1;
  for (const part of diffLines(before + "\n", after + "\n")) {
    if (part.removed) {
      continue;
    }
    const count = part.count ?? 0;
    if (part.added) {
      ranges.push(count === 1 ? `${line}` : `${line}-${line + count - 1}`);
    }
    line += count;
  }
  return ranges.join(",");
}

// The line numbers an `added="…"` names.
function parseAdded(info: string): Set<number> {
  const lines = new Set<number>();
  for (const range of /added="([^"]*)"/.exec(info)?.[1]?.split(",") ?? []) {
    const [first, last = first] = range.split("-").map(Number);
    for (let line = first!; line <= last!; line++) {
      lines.add(line);
    }
  }
  return lines;
}

// The languages a fence may name, as the highlighter knows them; `text` is
// shown uncoloured.
const LANGS = {
  tsx: "tsx",
  ts: "tsx",
  js: "tsx",
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
  const added = parseAdded(info);
  const code = content.replace(/\n$/, "");

  let spans: string[];
  if (lang === "text") {
    spans = code.split("\n").map(escape);
  } else if (lang in LANGS) {
    spans = (await highlight(code, LANGS[lang as keyof typeof LANGS])).map(
      (line) =>
        line.tokens
          .map(
            (token) =>
              `<span style="color:${token.color}">${escape(token.text)}</span>`,
          )
          .join(""),
    );
  } else {
    throw new Error(`A fence names "${lang}", which the docs don't colour.`);
  }
  const lines = spans
    .map(
      (line, index) =>
        `<div class="${added.has(index + 1) ? "code-line code-added" : "code-line"}">${line}</div>`,
    )
    .join("");

  const name =
    title === undefined
      ? ""
      : `<div class="border-b border-code-line px-5 py-3 font-mono text-xs text-code-muted">${escape(title)}</div>`;
  return `<div class="my-6 overflow-hidden rounded-2xl border border-code-line bg-code text-code-ink">${name}<pre class="m-0 overflow-x-auto py-4 font-mono text-[14px] leading-[1.6]">${lines}</pre></div>`;
}

function escape(text: string): string {
  return markdown.utils.escapeHtml(text);
}

// A docs page as static HTML: its article where `DocsLayout` draws it, with
// room for the header and sidebar, so little moves when the page is drawn.
export function staticArticle(
  title: string,
  description: string,
  html: string,
): string {
  return `<div class="mx-auto box-border max-w-[1200px] px-6 pt-[80px] text-[17px] leading-relaxed"><div class="grid grid-cols-[minmax(0,1fr)] gap-10 pt-4 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_190px]"><div class="max-lg:hidden"></div><article class="min-w-0"><h1 class="text-[clamp(32px,5vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">${escape(title)}</h1><p class="mt-4 text-lg text-muted">${escape(description)}</p><div class="docs-prose">${html}</div></article></div></div>`;
}
