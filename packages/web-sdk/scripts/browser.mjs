import { build } from "esbuild";

// The client, as a browser can load it.
//
// It starts nothing on its own: what a page carries is a script that imports
// `mount` from here and calls it, which is what `embedInDocument` writes. So
// this is the client's own module, bundled — not a variant with a decision
// already made.
//
// `tsc` emits what Node reads: real modules that name their dependencies —
// `@backtickjs/js-interpreter`, `solid-js`. A browser can't resolve a bare
// name, so serving those files means every page carrying an import map for a
// graph it did not write. This is that graph as one file, which a page loads
// with one script tag and no map at all.
//
// The server half is deliberately not bundled: Node resolves those names
// itself, and reading a stack trace is worth more there than a request is.
//
// One name, and it is the name a page writes: `/backtick.js`. Nothing reads
// this file back to learn what it was called, and nothing rewrites a page to
// point at a different name — the served URL and the written URL are the same
// string.
await build({
  entryPoints: ["dist/client/index.js"],
  entryNames: "backtick",
  outdir: "dist/browser",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  sourcemap: true,
});
