import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { build } from "esbuild";

/**
 * This site's client, and the frame it answers `compile` from.
 *
 * Four files: the client a page loads, the compiler, the harness that runs it,
 * and the document those two live in. Handed over as a list rather than written
 * to a directory a page has to come and find — the same arrangement
 * `web-client` has with the client it publishes.
 *
 * Plain ESM outside `src`, the way `web-client`'s build script is — `src` is
 * what it bundles.
 */

// Where the page serves these from. Fixed rather than configurable: the client
// carries this url and the page copies the files to match it, and two places
// agreeing on one string is what makes a client that needs no wiring possible.
const PUBLIC = "/client/";

// The name the compiler answers to once a browser has run it. Chosen here
// rather than by that package, because it is this build that writes both the
// script defining it and the script reading it.
const COMPILER = "backtickCompiler";
const FRAME = `${PUBLIC}compile/`;

const here = fileURLToPath(new URL(".", import.meta.url));

/** A name carrying the hash of what is at it, so nothing is ever stale. */
function named(name, source, extension = "js") {
  const hash = createHash("sha256").update(source, "utf8").digest("hex");
  return { name: `${name}-${hash.slice(0, 16)}.${extension}`, source };
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

// The client, which is the web one plus `compile`. It holds the frame's url,
// because reaching the frame is how it answers.
const client = named(
  "client",
  await bundled(`import "./src/index.js";`, {
    define: { BACKTICK_FRAME_URL: JSON.stringify(FRAME) },
  }),
);

// The frame's own script: the protocol, and what running a compiled example
// takes. Small, because the parser is not in it — that is the other script.
const harness = named(
  "frame",
  await bundled(`import "./src/frame/entry.js";`, {
    define: { BACKTICK_COMPILER: COMPILER },
  }),
);

// The compiler, bundled here from the package that is only its source. It
// carries a parser, which is why it is a script of its own rather than part of
// the harness: one of these is three and a half megabytes and the other is not.
const compiler = named(
  "compiler",
  await bundled(
    `import * as compiler from "./src/browserTranspile.js";` +
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
const document = named(
  "index",
  `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>backtick — compiler</title>` +
    `<script defer src="./${compiler.name}"></script>` +
    `<script defer src="./${harness.name}"></script>` +
    `</head><body></body></html>`,
  "html",
);

const assets = [
  { url: `${PUBLIC}${client.name}`, source: client.source },
  { url: `${FRAME}${compiler.name}`, source: compiler.source },
  { url: `${FRAME}${harness.name}`, source: harness.source },
  { url: `${FRAME}index.html`, source: document.source },
];

await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
await writeFile(
  new URL("./dist/assets.js", import.meta.url),
  `export const assets = ${JSON.stringify(assets, null, 2)};\n` +
    `export const clientUrl = ${JSON.stringify(`${PUBLIC}${client.name}`)};\n`,
);
await writeFile(
  new URL("./dist/assets.d.ts", import.meta.url),
  `export declare const assets: readonly {\n` +
    `  readonly url: string;\n` +
    `  readonly source: string;\n` +
    `}[];\n` +
    `/** Where the page asks for the client, which is what the shell writes. */\n` +
    `export declare const clientUrl: string;\n`,
);

console.log(
  `client: ${assets.length} assets, ${Math.round(
    assets.reduce((all, one) => all + one.source.length, 0) / 1024,
  )} KB`,
);
