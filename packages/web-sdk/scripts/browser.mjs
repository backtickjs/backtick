import { build } from "esbuild";
import { writeFile } from "node:fs/promises";

// The client, as a browser can load it: `client/browser.js`, which is the
// client with `start()` already called — a page loads one script and is done.
//
// `tsc` emits what Node reads: real modules that name their dependencies —
// `@backtickjs/js-interpreter`, `@backtickjs/jit-bundler/format`. A browser
// can't resolve a bare name, so serving those files means every page carrying
// an import map for a graph it did not write. This is that graph as one file,
// which a page loads with one script tag and no map at all.
//
// The server half is deliberately not bundled: Node resolves those names
// itself, and reading a stack trace is worth more there than a request is.
//
// Named for what it holds: the hash changes when the bytes do, so the URL a
// page loads is one a browser can keep forever without ever asking whether it
// is still current. `metafile` is how the name comes back — esbuild picks it,
// and the manifest is where the server reads it rather than recomputing it.
const result = await build({
  entryPoints: ["dist/client/browser.js"],
  entryNames: "backtick-[hash]",
  outdir: "dist/browser",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  sourcemap: true,
  metafile: true,
});

const client = Object.keys(result.metafile.outputs)
  .map((path) => path.slice("dist/browser/".length))
  .find((name) => name.endsWith(".js"));

if (client === undefined) {
  throw new Error("esbuild wrote no client");
}

await writeFile(
  "dist/browser/manifest.json",
  `${JSON.stringify({ client }, null, 2)}\n`,
);
