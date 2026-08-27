import { mkdir, rm, writeFile } from "node:fs/promises";
import { files } from "./dist/files.js";
import { buildDocuments } from "./dist/documents.js";
import { buildCompiler } from "./buildCompiler.mjs";

// What gets published, kept apart from `dist/`, which is where `tspc` puts the
// compiled server half. Only one of the two belongs on a web server.
const site = new URL("./site/", import.meta.url);

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

// The playground: a compiler document and the page that checks it. Built here
// rather than beside the pages, because what it publishes is scripts and the
// rest of this site publishes bundles.
const compiler = await buildCompiler();
const documents = await buildDocuments(compiler.scripts);

for (const { path, html, bytes } of [...documents, ...compiler.documents]) {
  // A route and a directory are the same name: `/docs/start/` is served from
  // `docs/start/index.html`, which is the url without a file extension in it.
  const directory = new URL(`.${path}`, site);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
  if (bytes !== undefined) {
    console.log(
      `  ${path.padEnd(20)} ${String(bytes).padStart(7)} b of bundle`,
    );
  } else {
    console.log(`  ${path.padEnd(20)} ${" ".padStart(7)}   (a document)`);
  }
}

// A `/`-rooted url and a path in the published directory are the same name.
for (const { url, source } of [...files, ...compiler.assets]) {
  await writeFile(new URL(`.${url}`, site), source);
}

// The domain, read by GitHub from what is published — so it is written here
// rather than committed at the root of the repository, where it would also be
// the domain of anything else served from it.
await writeFile(new URL("CNAME", site), "backtickjs.com\n");

// Pages runs Jekyll over a branch it publishes from, and Jekyll drops files it
// does not recognise. The workflow uploads a directory, where this changes
// nothing; it is here for the day someone publishes from a branch instead.
await writeFile(new URL(".nojekyll", site), "");

console.log(
  `site/: ${documents.length + compiler.documents.length} documents,` +
    ` ${files.length + compiler.assets.length} assets`,
);
