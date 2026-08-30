import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

// Under a name on the window, because whoever loads this reaches it by that
// name after asking for the script — there is nothing to import from a classic
// script, and a classic script is what needs no origin and no import map.
const { outputFiles } = await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "iife",
  globalName: "BACKTICK_COMPILER",
  platform: "browser",
  target: "es2022",
  minify: true,
  write: false,
});

const [{ text }] = outputFiles;
const sha256 = createHash("sha256").update(text, "utf8").digest("hex");

// The parser as text, and what it holds. A module rather than a file, so the
// site imports it instead of reading it back — what to call it and where to
// serve it from are the site's, and this package has no opinion about either.
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

console.log(`compiler: ${Math.round(text.length / 1024)} KB`);
