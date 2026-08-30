import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

// Minified because every page carries it, and unmapped, because nothing serves
// a `.map` beside it.
const { outputFiles } = await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2022",
  minify: true,
  write: false,
});

const [{ text }] = outputFiles;
const sha256 = createHash("sha256").update(text, "utf8").digest("hex");

// The client as text, and what it holds. A module rather than a file, so the
// site imports it instead of reading it back — what to call it and where to
// serve it from are the site's, and this package has no opinion about either.
//
// Beside `dist/index.js` rather than instead of it: `.` is what this package is
// made of, and this is what it makes.
//
// Written here rather than compiled: `tsc` has no source for this, because
// `src` is what it is compiled *from*.
mkdirSync("dist", { recursive: true });
writeFileSync(
  "dist/bundle.js",
  `export const source = ${JSON.stringify(text)};\n` +
    `export const sha256 = ${JSON.stringify(sha256)};\n`,
);
writeFileSync(
  "dist/bundle.d.ts",
  `export declare const source: string;\n` +
    `export declare const sha256: string;\n`,
);

console.log(`client: ${Math.round(text.length / 1024)} KB`);
