import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
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

// What a page owes this component, and the only thing it owes it: four names
// and what is at them. Handed over rather than written to a directory, the way
// `web-client` hands over the client — a package that writes its own files makes
// every consumer discover where it put them, and this one would make them copy a
// tree. A page already writes a list like this for the client, so the playground
// joins that list rather than needing a step of its own.
const assets = [
  { url: `${FRAME}${compiler.name}`, source: compiler.source },
  { url: `${FRAME}${harness.name}`, source: harness.source },
  { url: `${FRAME}index.html`, source: document },
];

await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
await writeFile(
  new URL("./dist/assets.js", import.meta.url),
  `export const assets = ${JSON.stringify(assets, null, 2)};\n`,
);
await writeFile(
  new URL("./dist/assets.d.ts", import.meta.url),
  `export declare const assets: readonly {\n` +
    `  readonly url: string;\n` +
    `  readonly source: string;\n` +
    `}[];\n`,
);

// The one of those the component has to know, because it draws the frame
// that serves it.
await writeFile(
  new URL("./src/static.ts", import.meta.url),
  `// Written by \`build.mjs\`. Where the frame that holds the compiler is\n` +
    `// served from, which this and the page it is on both have to agree about.\n` +
    `export const FRAME_URL = ${JSON.stringify(FRAME)};\n`,
);

console.log(
  `playground: ${assets.length} assets, ${Math.round(
    assets.reduce((all, one) => all + one.source.length, 0) / 1024,
  )} KB`,
);
