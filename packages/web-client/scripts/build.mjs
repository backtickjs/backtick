import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

// Minified because every page carries it — 57 KB to 22 KB, 13 to 8 gzipped —
// and unmapped, because nothing serves a `.map` beside it.
const { outputFiles } = await build({
  entryPoints: ["src/client.ts"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2022",
  minify: true,
  write: false,
});

const [{ text }] = outputFiles;
const sha256 = createHash("sha256").update(text, "utf8").digest("hex");

// What to call the file, named for what it holds: a rebuilt client is a new
// name, so no cache anywhere has an old answer to give under it. Sixteen hex
// digits of the digest — 64 bits, which two clients do not collide in.
//
// Where it goes is the caller's; what it is called is a fact about it.
const fileName = `client-${sha256.slice(0, 16)}.js`;

// How long these bytes are good for, which is forever: a build writes them
// once and never edits them, so what a client answers with is only ever wrong
// if it was asked for under a name that outlived its contents — which is what
// the name above rules out.
const cacheControl = "public, max-age=31536000, immutable";

// What this package is: the client as text, and what it holds. A module rather
// than a file, so a server imports it instead of reading it back, and a bundler
// can follow it.
//
// Written here rather than compiled: `tsc` has no source for this, because
// `src` is what it is compiled *from*. Nothing else writes `dist`, so nothing
// can collide with it.
mkdirSync("dist", { recursive: true });
writeFileSync(
  "dist/index.js",
  `export const source = ${JSON.stringify(text)};\n` +
    `export const sha256 = ${JSON.stringify(sha256)};\n` +
    `export const fileName = ${JSON.stringify(fileName)};\n` +
    `export const cacheControl = ${JSON.stringify(cacheControl)};\n`,
);
writeFileSync(
  "dist/index.d.ts",
  `export declare const source: string;\n` +
    `export declare const sha256: string;\n` +
    `export declare const fileName: string;\n` +
    `export declare const cacheControl: string;\n`,
);
