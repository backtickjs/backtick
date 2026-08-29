import { createHash } from "node:crypto";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
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

// The compiler, copied rather than built. It is a package of its own because
// the parser it carries is a dependency rather than a download — what arrives
// here is one document and the one script it names, both already hashed, and
// this build has no opinion about either beyond where they go.
const compiler = new URL(
  "./static/",
  pathToFileURL(
    createRequire(import.meta.url).resolve(
      "@backtickjs/browser-compiler/package.json",
    ),
  ),
);
await cp(compiler, new URL("./compile/", site), { recursive: true });

// What the component asks for, written where the component can import it.
await writeFile(
  new URL("./src/static.ts", import.meta.url),
  `// Written by \`build.mjs\`. The names carry the hash of what is in them, so\n` +
    `// a rebuilt playground is a name no cache has an old answer for.\n` +
    `export const EDITOR_URL = ${JSON.stringify(`${PUBLIC}${editor.name}`)};\n`,
);

console.log(`playground/static: ${editor.name}, compile/`);
