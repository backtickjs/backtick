import { build } from "esbuild";

// The client, as a browser can load it.
//
// `tsc` emits what Node reads: real modules that name their dependencies —
// `@backtickjs/js-interpreter`, `@backtickjs/jit-bundler/format`. A browser
// can't resolve a bare name, so serving those files means every page carrying
// an import map for a graph it did not write. This is that graph as one file,
// which a page loads with one script tag and no map at all.
//
// The server half is deliberately not bundled: Node resolves those names
// itself, and reading a stack trace is worth more there than a request is.
await build({
  entryPoints: ["dist/client/index.js"],
  outfile: "dist/browser/client.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  sourcemap: true,
});
