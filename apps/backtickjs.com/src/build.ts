import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { toHtml } from "./html.js";
import { PAGES } from "./pages.js";

// The site as static files, for GitHub Pages: `public/` as it is, each page
// at its path's `index.html`, and the domain Pages serves it on.
const dist = new URL("../dist/", import.meta.url);
await rm(dist, { recursive: true, force: true });
await cp(new URL("../public/", import.meta.url), dist, { recursive: true });

for (const { path, Page, title } of PAGES) {
  const directory = new URL(`.${path}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), await toHtml(Page, title));
}

await writeFile(new URL("CNAME", dist), "backtickjs.com\n");
