import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { DocsLink, DocsSection, Heading } from "../docs.js";
import { Layout } from "./Layout.js";

// Every docs page, by section, the one open marked.
const DocsNav = cs`(props: { sections: DocsSection[]; path: string }) => (
  <nav class="grid gap-7 text-[15px]">
    {props.sections.map((section) => (
      <div>
        <p class="mb-2 font-mono text-xs tracking-[0.12em] text-muted uppercase">
          {section.name}
        </p>
        <ul class="grid gap-0.5">
          {section.pages.map((page) => (
            <li>
              <a
                href={page.path}
                class={
                  "block rounded-lg px-3 py-1.5 no-underline " +
                  (page.path === props.path
                    ? "bg-wash font-medium text-react"
                    : "text-ink hover:bg-wash")
                }
              >
                {page.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
)`;

// The page's Markdown, as agents read it, copied whole.
const CopyMarkdown = cs`(props: { path: string }) => {
  const [copied, setCopied] = $createSignal(false);
  const copy = async () => {
    const text = await (await window.fetch(props.path)).text();
    await window.navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      class="cursor-pointer rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-medium transition hover:border-react/40"
      onclick={copy}
      data-umami-event="copy-markdown"
    >
      {copied() ? "Copied" : "Copy as Markdown"}
    </button>
  );
}`;

// A docs page: the sections beside it, its headings after it on wide
// screens, and the pages before and after it below. Its body is Markdown
// rendered to HTML on the server.
export const DocsLayout = cs`(props: {
  sections: DocsSection[];
  path: string;
  title: string;
  description: string;
  headings: Heading[];
  previous: DocsLink | null;
  next: DocsLink | null;
  html: string;
}) => (
  <$Layout>
    <div class="grid grid-cols-[minmax(0,1fr)] gap-10 pt-4 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_190px]">
      <aside class="max-lg:hidden">
        <div class="sticky top-6">
          <$DocsNav sections={props.sections} path={props.path} />
        </div>
      </aside>
      <details class="rounded-xl border border-line lg:hidden">
        <summary class="cursor-pointer px-4 py-3 font-medium">Menu</summary>
        <div class="px-1 pb-4">
          <$DocsNav sections={props.sections} path={props.path} />
        </div>
      </details>

      <article class="min-w-0">
        <h1 class="text-[clamp(32px,5vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
          {props.title}
        </h1>
        <p class="mt-4 text-lg text-muted">{props.description}</p>
        <div class="docs-prose" innerHTML={props.html} />

        <nav class="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {props.previous === null ? (
            <span />
          ) : (
            <a
              href={props.previous.path}
              class="rounded-2xl border border-line px-5 py-4 no-underline hover:border-react/40"
            >
              <span class="block text-sm text-muted">Previous</span>
              <span class="font-medium">{props.previous.title}</span>
            </a>
          )}
          {props.next === null ? null : (
            <a
              href={props.next.path}
              class="rounded-2xl border border-line px-5 py-4 text-right no-underline hover:border-react/40"
            >
              <span class="block text-sm text-muted">Next</span>
              <span class="font-medium">{props.next.title}</span>
            </a>
          )}
        </nav>
      </article>

      <aside class="max-xl:hidden">
        <div class="sticky top-6 grid gap-6 text-sm">
          {props.headings.length === 0 ? null : (
            <div>
              <p class="mb-2 font-mono text-xs tracking-[0.12em] text-muted uppercase">
                On this page
              </p>
              <ul class="grid gap-1.5">
                {props.headings.map((heading) => (
                  <li>
                    <a
                      href={"#" + heading.id}
                      class="text-muted no-underline hover:text-ink"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <$CopyMarkdown path={props.path + ".md"} />
          </div>
        </div>
      </aside>
    </div>
  </$Layout>
)`;
