import { mkdir, rm, writeFile } from "node:fs/promises";
import { routes } from "./dist/routes.js";

// Every route, answered once and written where a web server can serve it.
const site = new URL("./site/", import.meta.url);

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

const written = [];
for (const [path, handler] of Object.entries(routes)) {
  // A path ending in `/` is a directory, and `index.html` is what a host serves
  // from one. `/` is both, and falls out of the same rule.
  const name = path.endsWith("/")
    ? `${path.slice(1)}index.html`
    : path.slice(1);
  const at = new URL(name, site);
  // `new URL` resolves a `..` rather than refusing it.
  if (!at.href.startsWith(site.href)) {
    throw new Error(`backtick: \`${path}\` is not a path under the site`);
  }
  const source = await handler();
  await mkdir(new URL(".", at), { recursive: true });
  await writeFile(at, source);
  written.push(`${name} ${Buffer.byteLength(source)} b`);
}

console.log(`site/: ${written.join(", ")}`);
