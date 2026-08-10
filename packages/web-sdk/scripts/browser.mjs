import { build } from "esbuild";

// The client, as a page can carry it.
//
// `tsc` emits what Node reads: real modules that name their dependencies —
// `@backtickjs/js-interpreter`, `solid-js`. A browser can't resolve a bare
// name, so this is that whole graph as one file.
//
// Never served, and never fetched: `toHtml` reads this file and writes it into
// the page, so a document arrives with the client already in it. Nothing has to
// agree on a URL for it, which is the whole reason it is built this way.
//
// An IIFE under a global, not a module, for two reasons. A page that carries
// its client carries the call that draws too, and a second `<script>` can only
// reach the first one's exports through a global. And two tags rather than one
// keeps this script's bytes the same on every page, so a hash of it is worth
// pinning in a content policy — a single tag would change with every bundle.
//
// No source map: nothing serves a `.map` beside this any more, and the comment
// pointing at one would only send a browser looking for a file that isn't
// there. Debugging the client is done from `dist/client` instead.
//
// The server half is deliberately not bundled: Node resolves those names
// itself, and reading a stack trace is worth more there than a request is.
await build({
  entryPoints: ["dist/client/index.js"],
  entryNames: "backtick",
  outdir: "dist/browser",
  bundle: true,
  format: "iife",
  globalName: "backtick",
  platform: "browser",
  target: "es2022",
});
