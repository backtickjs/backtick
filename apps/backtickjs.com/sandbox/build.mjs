import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

// A classic script exporting nothing: it is inlined into a document of its own,
// and everything it does it does by listening.
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

// The harness as text, and what it holds. Its digest is what a content policy
// spells to allow exactly this script and nothing else, which is why it crosses
// beside the source rather than being worked out again where it is used.
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

console.log(`sandbox: ${Math.round(text.length / 1024)} KB`);
