import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

/**
 * The compiler as one file, and a document that runs it.
 *
 * Self-contained on purpose: TypeScript is a dependency of this package and is
 * bundled in, so what a page publishes is a directory and what it fetches is
 * one script from its own origin. Nothing here is loaded from anywhere else.
 *
 * `iife` because the parser is written as a classic script — it closes over a
 * `module` shim and leaves `ts` on a global — and because a document that may
 * be sandboxed cannot fetch a module script on some hosts.
 */
const here = fileURLToPath(new URL(".", import.meta.url));
const site = new URL("./static/", import.meta.url);

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

const { outputFiles } = await build({
  stdin: {
    contents: `import "./src/entry.js";`,
    resolveDir: here,
    loader: "js",
  },
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2022",
  minify: true,
  write: false,
});
const source = outputFiles[0].text;

/** A name carrying the hash of what is at it, so nothing is ever stale. */
const name = `compiler-${createHash("sha256")
  .update(source, "utf8")
  .digest("hex")
  .slice(0, 16)}.js`;

// No content policy, and that is forced rather than chosen: a page embeds this
// in a frame sandboxed without `allow-same-origin`, which puts it on an opaque
// origin, and `'self'` matches nothing there — a policy naming `'self'` would
// refuse this document its own script. The sandbox is the boundary instead, and
// it is the stronger one: the page that embeds this keeps `default-src 'self'`,
// never evaluates anything, and cannot be reached from in here.
//
// The script is asked for by a relative name, so this directory works wherever
// a page decides to put it.
const document =
  `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
  `<title>backtick — compiler</title>` +
  `<script defer src="./${name}"></script>` +
  `</head><body></body></html>`;

await writeFile(new URL(name, site), source);
await writeFile(new URL("index.html", site), document);
console.log(
  `browser-compiler/static: ${name} (${Math.round(source.length / 1024)} KB)`,
);
