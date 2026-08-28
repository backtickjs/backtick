import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { files } from "./dist/files.js";
import { buildDocuments } from "./dist/documents.js";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

// What gets published, kept apart from `dist/`, which is where `tspc` puts the
// compiled server half. Only one of the two belongs on a web server.
const site = new URL("./site/", import.meta.url);

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

const documents = await buildDocuments();

// The playground's own files, copied where the component says they are. It has
// nothing to configure and nothing to be told: the component compiled its own
// example while the bundle was built, and these are the same bytes on every
// page that draws one.
const playground = new URL(
  "./static/",
  pathToFileURL(
    createRequire(import.meta.url).resolve(
      "@backtickjs/playground/package.json",
    ),
  ),
);
await cp(playground, new URL("./playground/", site), { recursive: true });

for (const { path, html, bytes } of documents) {
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
for (const { url, source } of files) {
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
  `site/: ${documents.length} documents,` +
    ` ${files.length} assets and the playground`,
);
