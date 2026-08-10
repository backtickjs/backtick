import { readFileSync } from "node:fs";
import type { Bundle } from "@backtickjs/core";

// What draws, and the call that draws — kept apart, because a document with two
// things to render needs the first once and the second twice.
//
// Carrying the client rather than linking to it means no URL for a page and a
// server to agree on, at the cost of ~13 KB gzipped wherever it goes, never
// cached. Which is exactly why it is its own export: a caller that pays that
// once should not pay it again per mount.

/**
 * The client, as a browser can run it: an IIFE declaring `backtick`, holding
 * `render` and `dom`.
 *
 * Put it in a `<script>` — not a `<script type="module">`, which would keep the
 * global to itself — or serve it as a file. Once per document, however many
 * things that document draws.
 *
 * Needs no escaping on the way in: esbuild writes `<\/script` inside string
 * literals, which is what lets it be inlined verbatim.
 */
export const client: string = readFileSync(
  new URL("./browser/backtick.js", import.meta.url),
  "utf8",
);

export interface RenderOptions {
  /**
   * What to render into, as a selector: `"body"` where a document is the app's
   * own and holds nothing else, `"#main"` where the document was written by
   * someone else and says where this goes.
   *
   * Said rather than defaulted. A document that carries two of these has two
   * different answers, and the one that would be assumed is right for only one
   * of them.
   */
  readonly into: string;
}

/**
 * The call that draws this bundle, as JavaScript. Runs against {@link client},
 * which has to be in scope by the time it does.
 *
 * Safe to put in a `<script>`: the bundle is written with every `<` escaped,
 * which is sound because `JSON.stringify` puts one only inside a string value —
 * not true of JavaScript at large, which is why the client is checked at build
 * rather than escaped here.
 */
export function render(bundle: Bundle, { into }: RenderOptions): string {
  const drawn = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  return (
    `backtick.render(${drawn},backtick.dom,` +
    `document.querySelector(${JSON.stringify(into)}));`
  );
}
