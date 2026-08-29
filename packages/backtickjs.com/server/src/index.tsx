import { mkdir, rm, writeFile } from "node:fs/promises";
import { bundler } from "@backtickjs/core";
import { insert } from "@backtickjs/web-sdk";
import { Home } from "./pages/Home.js";
import { Layout } from "./components/Layout.js";
import { files } from "./files.js";
import { template } from "./template.js";

// What gets published, kept apart from `dist/`, which is where `tspc` puts this.
// Only one of the two belongs on a web server.
const site = new URL("../site/", import.meta.url);

// An element saying what to draw. The components have not run yet. The layout
// is applied here rather than inside the page, so the page is its content and
// the chrome is written once — and if a second page ever arrives, this is the
// thing that grows a list.
const page = <Layout>{await Home()}</Layout>;

// Runs them, here while the site is built. What comes back is a bundle: data,
// not HTML.
const bundle = await bundler.run(page);

// A document carrying that bundle as JSON, with the client that draws it.
const html = insert(template, "body", bundle);

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });
await writeFile(new URL("index.html", site), html);

// A `/`-rooted url and a path in the published directory are the same name.
for (const { url, source } of files) {
  const at = new URL(`.${url}`, site);
  await mkdir(new URL(".", at), { recursive: true });
  await writeFile(at, source);
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
  `site/: ${Buffer.byteLength(JSON.stringify(bundle))} b of bundle,` +
    ` ${files.length} assets`,
);
