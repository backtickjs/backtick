import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
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

// The name the compiler answers to once a browser has run it. Chosen here
// rather than by that package, because it is this build that writes both the
// script defining it and the script reading it.
const COMPILER = "backtickCompiler";
const FRAME = `${PUBLIC}compile/`;

const here = fileURLToPath(new URL(".", import.meta.url));

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

// The playground's own wiring, which is a script on a page rather than part of
// its bundle — see `src/editor/entry.ts` for why, and the repository's
// `docs/browser-playground.md` for what closes it.
const editor = named(
  "editor",
  await bundled(`import "./src/editor/entry.js";`, {
    define: { BACKTICK_FRAME_URL: JSON.stringify(FRAME) },
  }),
);
await writeFile(new URL(editor.name, site), editor.source);

// The frame's own script: the protocol, and what running a compiled example
// takes. Small, because the parser is not in it — that is the other script.
const harness = named(
  "frame",
  await bundled(`import "./src/frame/entry.js";`, {
    define: { BACKTICK_COMPILER: COMPILER },
  }),
);

// The compiler, bundled here from the package that is only its source. It is a
// package of its own because the parser it carries is a dependency rather than a
// download, and because it compiles and stops there — running what it returns is
// the harness above, which is why the two are separate scripts rather than one.
// It has no build of its own: what a browser needs from it is a bundle, and a
// bundle is this script's job for everything else it serves too.
const compiler = named(
  "compiler",
  await bundled(
    `import * as compiler from "@backtickjs/browser-compiler";` +
      ` globalThis.${COMPILER} = compiler;`,
  ),
);

// No content policy on this document, and that is forced rather than chosen: it
// is loaded in a frame sandboxed without `allow-same-origin`, which puts it on
// an opaque origin, and `'self'` matches nothing there — a policy naming
// `'self'` would refuse this document its own scripts. The sandbox is the
// boundary instead, and it is the stronger one: the page around it keeps
// `default-src 'self'`, never evaluates anything, and cannot be reached in here.
//
// Both are asked for by relative names, and the compiler goes first: the
// harness reads a global the compiler defines.
const document =
  `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
  `<title>backtick — compiler</title>` +
  `<script defer src="./${compiler.name}"></script>` +
  `<script defer src="./${harness.name}"></script>` +
  `</head><body></body></html>`;

const frame = new URL("./compile/", site);
await mkdir(frame, { recursive: true });
await writeFile(new URL(compiler.name, frame), compiler.source);
await writeFile(new URL(harness.name, frame), harness.source);
await writeFile(new URL("index.html", frame), document);

// What the component asks for, written where the component can import it.
await writeFile(
  new URL("./src/static.ts", import.meta.url),
  `// Written by \`build.mjs\`. The names carry the hash of what is in them, so\n` +
    `// a rebuilt playground is a name no cache has an old answer for.\n` +
    `export const EDITOR_URL = ${JSON.stringify(`${PUBLIC}${editor.name}`)};\n`,
);

console.log(
  `playground/static: ${editor.name}, compile/{${compiler.name}, ${harness.name}}`,
);
