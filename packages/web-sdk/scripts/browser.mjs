import { build } from "esbuild";

// Minified because every page carries it — 57 KB to 22 KB, 13 to 8 gzipped —
// and unmapped, because nothing serves a `.map` beside it.
await build({
  entryPoints: ["dist/client.js"],
  entryNames: "client",
  outdir: "dist/browser",
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2022",
  minify: true,
});
