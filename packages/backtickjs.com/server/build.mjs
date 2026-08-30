import { copyFile, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { client } from "./dist/site/client.js";
import { html } from "./dist/site/index.js";

/**
 * What gets published: the document, and the client that draws it.
 *
 * Plain ESM outside `src`, because `src` is what it publishes — and a writer
 * and nothing else. What the files say and what they are called is decided in
 * `src/site`, which is where both are known at once.
 */

// Kept apart from `dist/`, which is where `tspc` puts the modules this imports.
// Only one of the two belongs on a web server.
const site = new URL("./site/", import.meta.url);

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });
await writeFile(new URL("index.html", site), html);
await writeFile(new URL(client.name, site), client.source);

// Everything beside them that `tspc` did not compile, copied as it is written:
// `CNAME`, the domain GitHub reads from what is published — kept here rather
// than at the root of the repository, where it would also be the domain of
// anything else served from it — and `.nojekyll`, which stops Jekyll dropping
// files it does not recognise on the day someone publishes from a branch
// instead of uploading a directory. Adding another is adding a file.
const written = new URL("./src/site/", import.meta.url);
for (const entry of await readdir(written, { withFileTypes: true })) {
  if (entry.isFile() && !/\.tsx?$/.test(entry.name)) {
    await copyFile(new URL(entry.name, written), new URL(entry.name, site));
  }
}

console.log(
  `site/: ${Buffer.byteLength(html)} b of html,` +
    ` ${Buffer.byteLength(client.source)} b of client`,
);
