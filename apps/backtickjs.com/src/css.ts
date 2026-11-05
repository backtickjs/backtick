// The site's CSS, from the classes its source uses, written beside the build
// for html.ts to read. Run by the build, so the function never scans.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { compile, optimize } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";

const src = fileURLToPath(new URL("../src/", import.meta.url));
const input = await readFile(`${src}/styles.css`, "utf8");
const compiler = await compile(input, { base: src, onDependency: () => {} });
const scanner = new Scanner({
  sources: [{ base: src, pattern: "**/*", negated: false }],
});
await writeFile(
  new URL("style.css", import.meta.url),
  optimize(compiler.build(scanner.scan()), { minify: true }).code,
);
