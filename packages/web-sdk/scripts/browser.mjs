import { build } from "esbuild";

// The client as one file a page can carry: `page.ts` reads this and writes it
// into the document, so it is never served and nothing has to agree on a URL
// for it. Bundled because `tsc` emits modules naming `solid-js` and
// `@backtickjs/js-interpreter`, which a browser can't resolve.
//
// An IIFE under a global, not a module: the page's second script reaches
// `render` and `dom` through it. Two tags rather than one keeps these bytes
// identical on every page, so a hash of them is worth pinning in a policy.
//
// Minified because every page carries it — 57 KB to 22 KB, 13 to 8 gzipped —
// and unmapped, because nothing serves a `.map` beside it.
await build({
  entryPoints: ["dist/client.js"],
  entryNames: "backtick",
  outdir: "dist/browser",
  bundle: true,
  format: "iife",
  globalName: "backtick",
  platform: "browser",
  target: "es2022",
  minify: true,
});
