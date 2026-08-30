import { mkdir, rm, writeFile } from "node:fs/promises";
import { routes } from "./dist/routes.js";

/**
 * Every route, answered once and written where a web server can serve it.
 *
 * A writer and nothing else: what is served and where is said in `routes`, and
 * the only things decided here are the directory and what a path is called
 * once it is a file.
 */

// Kept apart from `dist/`, which is where `tspc` puts the modules this imports.
// Only one of the two belongs on a web server.
const site = new URL("./site/", import.meta.url);

await rm(site, { recursive: true, force: true });
await mkdir(site, { recursive: true });

const written = [];
for (const [path, handler] of Object.entries(routes)) {
  // A path ending in `/` names a directory, and what a server answers for one
  // is the file every host looks for inside it. Every other path is already the
  // name of the file it is served from — `/` itself is both, and the same rule
  // covers it.
  const name = path.endsWith("/")
    ? `${path.slice(1)}index.html`
    : path.slice(1);
  const at = new URL(name, site);
  // `new URL` resolves a `..` rather than refusing it, so a route that climbs
  // out would be written somewhere nothing serves from.
  if (!at.href.startsWith(site.href)) {
    throw new Error(`backtick: \`${path}\` is not a path under the site`);
  }
  const source = await handler();
  // The directories a nested route is written into. `recursive` so a route two
  // deep costs nothing extra, and so `/` asks for one that is already there.
  await mkdir(new URL(".", at), { recursive: true });
  await writeFile(at, source);
  written.push(`${name} ${Buffer.byteLength(source)} b`);
}

console.log(`site/: ${written.join(", ")}`);
