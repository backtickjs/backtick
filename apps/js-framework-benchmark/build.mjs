import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { modules } from "@backtickjs/solid-js/server";
import { html, moduleUrl } from "./dist/html.js";

const dist = new URL("./dist/", import.meta.url);
await writeFile(new URL("index.html", dist), html);
// The page imports Solid and the client through its import map, from beside
// it: upstream serves `dist/` as it is.
for (const [specifier, file] of Object.entries(modules)) {
  const target = new URL(moduleUrl(specifier), dist);
  await mkdir(new URL(".", target), { recursive: true });
  await copyFile(new URL(file), target);
}
