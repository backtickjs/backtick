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
const TYPESCRIPT = createRequire(import.meta.url).resolve(
  "typescript/lib/typescript.js",
);

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

// TypeScript is minified but not bundled, and loaded as a classic script.
// Bundling it goes through its `browser` field, which maps `os` to nothing and
// leaves the file reading `os.platform()` at load — the error is
// `c.platform is not a function`, and it happens before anything is compiled.
// Bundling it also saves nothing: it is one module and does not shake.
async function parser() {
  const { outputFiles } = await build({
    entryPoints: [TYPESCRIPT],
    minify: true,
    write: false,
    logLevel: "warning",
  });
  return named("typescript", outputFiles[0].text);
}

const site = new URL("./static/", import.meta.url);
await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

const typescript = await parser();

// One classic script holding the compiler and everything it imports. `iife`
// rather than `esm` because the frame is sandboxed onto an opaque origin, where
// a module script is a cross-origin fetch and a classic script is not — and a
// static host sends no header that would let the first one through.
const compiler = named(
  "compiler",
  await bundled(`import "./src/compile/entry.js";`, {
    define: {
      BACKTICK_TYPESCRIPT_URL: JSON.stringify(`${PUBLIC}${typescript.name}`),
    },
  }),
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
  `<script src="${PUBLIC}${compiler.name}"></script>` +
  `</head><body></body></html>`;

for (const one of [typescript, compiler, editor]) {
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

console.log(
  `playground/static: ${typescript.name}, ${compiler.name}, ${editor.name}`,
);
