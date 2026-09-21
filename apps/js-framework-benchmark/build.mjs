import { writeFile } from "node:fs/promises";
import { build } from "esbuild";
import { html } from "./dist/html.js";

const dist = new URL("./dist/", import.meta.url);
await writeFile(new URL("index.html", dist), html);
// Over what `tspc` emitted for `src/client.ts`: the page asks for one file.
await build({
  entryPoints: ["src/client.ts"],
  bundle: true,
  platform: "browser",
  minify: true,
  outfile: "dist/client.js",
  allowOverwrite: true,
});
