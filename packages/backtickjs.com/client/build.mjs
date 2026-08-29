import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
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
const FRAME = `${PUBLIC}compile/`;

/** A name carrying the hash of what is at it, so nothing is ever stale. */
function named(name, source, extension = "js") {
  const hash = createHash("sha256").update(source, "utf8").digest("hex");
  return { name: `${name}-${hash.slice(0, 16)}.${extension}`, source };
}

async function bundled(entry, options = {}) {
  const { outputFiles } = await build({
    entryPoints: [entry],
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
const client = named("client", await bundled("src/index.ts", {}));

const assets = [{ url: `${PUBLIC}${client.name}`, source: client.source }];

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
