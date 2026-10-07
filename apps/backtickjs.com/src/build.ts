import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { toHtml } from "./html.js";
import { TEXT_FILES } from "./llms.js";
import { NOT_FOUND, PAGES, urlOf } from "./pages.js";

// The site as static files, for GitHub Pages: `public/` as it is, each page
// at its path's `index.html`, the page for addresses that don't exist, what
// search engines read, and the domain Pages serves it on.
const dist = new URL("../dist/", import.meta.url);
await rm(dist, { recursive: true, force: true });
await cp(new URL("../public/", import.meta.url), dist, { recursive: true });

for (const page of PAGES) {
  const directory = new URL(`.${page.path}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), await toHtml(page));
}

await writeFile(new URL("404.html", dist), await toHtml(NOT_FOUND));

for (const file of TEXT_FILES) {
  await writeFile(new URL(`.${file.path}`, dist), file.text);
}

const sitemap = PAGES.map(
  (page) => `  <url><loc>${urlOf(page.path)}</loc></url>`,
).join("\n");
await writeFile(
  new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap}
</urlset>
`,
);
await writeFile(
  new URL("robots.txt", dist),
  `User-agent: *
Allow: /

Sitemap: ${urlOf("/")}sitemap.xml
`,
);

await writeFile(new URL("CNAME", dist), "backtickjs.com\n");
