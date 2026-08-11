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
const hash = createHash("sha256").update(text, "utf8").digest("hex");

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
    `export const hash = ${JSON.stringify(hash)};\n`,
);
writeFileSync(
  "dist/index.d.ts",
  `export declare const source: string;\n` +
    `export declare const hash: string;\n`,
);
