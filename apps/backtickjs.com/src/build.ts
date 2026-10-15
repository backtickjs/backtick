import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { app } from "./app.js";
import { toHtml } from "./html.js";
import { NOT_FOUND, urlOf } from "./pages.js";

// The site as static files, for GitHub Pages: `public/` as it is, each of
// the app's routes as a file, a page at its path's `index.html`, the page for
// addresses that don't exist, what search engines read, and the domain Pages
// serves it on.
const dist = new URL("../dist/", import.meta.url);
await rm(dist, { recursive: true, force: true });
await cp(new URL("../public/", import.meta.url), dist, { recursive: true });

const pages: string[] = [];
for (const { method, path } of app.routes) {
  if (method !== "GET") continue;
  const response = await app.request(path);
  const page = response.headers.get("content-type")?.startsWith("text/html");
  const file = new URL(`.${path}${page ? "index.html" : ""}`, dist);
  await mkdir(new URL(".", file), { recursive: true });
  await writeFile(file, await response.text());
  if (page) pages.push(path);
}

await writeFile(new URL("404.html", dist), await toHtml(NOT_FOUND));

const sitemap = pages
  .map((path) => `  <url><loc>${urlOf(path)}</loc></url>`)
  .join("\n");
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
