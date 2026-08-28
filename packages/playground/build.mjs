import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

/**
 * The playground's own files, built once when this package is built.
 *
 * They do not depend on what any example says, so there is nothing here for a
 * page to configure and nothing for it to call: a page copies `static/` and
 * draws the component, and the component knows these names because this wrote
 * them next door in `static.ts`.
 *
 * Plain ESM outside `src`, the way `web-client`'s build script is — `src` is
 * what it bundles.
 */

// Where a page serves these from. Fixed rather than configurable: the
// component writes this url into the page and the page copies `static/` to
// match it, and two places agreeing on one string is what makes a component
// that needs no wiring possible at all.
const PUBLIC = "/playground/";
const FRAME = `${PUBLIC}compile/`;

const here = fileURLToPath(new URL(".", import.meta.url));

/**
 * The parser, from a CDN rather than from here.
 *
 * Pinned to the version this package builds against, so what compiles a
 * reader's source is what the repository compiled its own. `.min.js` is not a
 * file TypeScript ships — jsDelivr makes it on request — which is why it is
 * that CDN by name and not a choice between equals: unpkg answers 404 for this
 * path. The minified answer is 950 KB over the wire where the file in the
 * package is 1600 KB.
 *
 * No `integrity`, and that is a trade rather than an oversight: the bytes are
 * made by the CDN, so a hash for them can only be got by fetching one, and a
 * build that reaches the network to build is worse than this. The frame that
 * loads it is sandboxed onto an origin of its own and reaches nothing of the
 * page's.
 */
const TYPESCRIPT_URL = `https://cdn.jsdelivr.net/npm/typescript@${
  createRequire(import.meta.url)("typescript/package.json").version
}/lib/typescript.min.js`;

/** A name carrying the hash of what is at it, so nothing is ever stale. */
function named(name, source) {
  const hash = createHash("sha256").update(source, "utf8").digest("hex");
  return { name: `${name}-${hash.slice(0, 16)}.js`, source };
}

async function bundled(contents, options = {}) {
  const { outputFiles } = await build({
    stdin: { contents, resolveDir: here, loader: "js" },
    bundle: true,
    format: "iife",
    platform: "browser",
    target: "es2022",
    minify: true,
    write: false,
    ...options,
  });
  return outputFiles[0].text;
}

const site = new URL("./static/", import.meta.url);
await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

// One classic script holding the compiler and everything it imports. `iife`
// rather than `esm` because the frame is sandboxed onto an opaque origin, where
// a module script is a cross-origin fetch and a classic script is not — and a
// static host sends no header that would let the first one through.
const compiler = named(
  "compiler",
  await bundled(`import "./src/compile/entry.js";`),
);

// The playground's own wiring, which is a script on a page rather than part of
// its bundle — see `src/editor/entry.ts` for why, and the repository's
// `docs/browser-playground.md` for what closes it.
const editor = named(
  "editor",
  await bundled(`import "./src/editor/entry.js";`, {
    define: { BACKTICK_FRAME_URL: JSON.stringify(FRAME) },
  }),
);

// No content policy on this document, and that is a finding rather than an
// oversight: a frame carrying `sandbox` without `allow-same-origin` runs on an
// opaque origin, where `'self'` matches nothing — a `default-src 'self'` here
// would refuse this document its own scripts. The sandbox is the boundary. The
// page that embeds it keeps its own policy, and never evaluates anything.
const frame =
  `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
  `<title>backtick — compiler</title>` +
  // The parser first and both deferred, because deferred scripts run in the
  // order a document writes them: the one below reads `ts` off the global and
  // is written to assume it is already there.
  `<script defer src="${TYPESCRIPT_URL}"></script>` +
  `<script defer src="${PUBLIC}${compiler.name}"></script>` +
  `</head><body></body></html>`;

for (const one of [compiler, editor]) {
  await writeFile(new URL(one.name, site), one.source);
}
await mkdir(new URL("./compile/", site), { recursive: true });
await writeFile(new URL("./compile/index.html", site), frame);

// What the component asks for, written where the component can import it.
await writeFile(
  new URL("./src/static.ts", import.meta.url),
  `// Written by \`build.mjs\`. The names carry the hash of what is in them, so\n` +
    `// a rebuilt playground is a name no cache has an old answer for.\n` +
    `export const EDITOR_URL = ${JSON.stringify(`${PUBLIC}${editor.name}`)};\n`,
);

console.log(`playground/static: ${compiler.name}, ${editor.name}`);
