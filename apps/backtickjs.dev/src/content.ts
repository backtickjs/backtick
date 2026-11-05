// The docs' sources as one file beside the build, for docs.ts to read: each
// page's Markdown in content/, and every example file it names, by its path
// from content/, as docs.ts asks for it. One file the function reads, so
// Vercel includes it, and no example is compiled as the site's code.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { INCLUDE } from "./includes.js";

const content = fileURLToPath(new URL("../content/", import.meta.url));
const files: Record<string, string> = {};
for (const page of await readdir(content)) {
  if (!page.endsWith(".md")) {
    continue;
  }
  const source = await readFile(join(content, page), "utf8");
  files[page] = source;
  for (const [, , path, before] of source.matchAll(INCLUDE)) {
    for (const example of before === undefined ? [path!] : [path!, before]) {
      files[`examples/${example}`] = await readFile(
        join(content, "examples", example),
        "utf8",
      );
    }
  }
}
await writeFile(
  new URL("content.json", import.meta.url),
  JSON.stringify(files),
);
