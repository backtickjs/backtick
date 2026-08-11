import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// The browser's half, as a server holds it: the built bytes, and the URL they
// are served at. Both read from here, so a page and whatever answers for it
// cannot disagree about either.
//
// `src/client.ts` is what these bytes are compiled from; this is that build,
// which is the only form a browser can run.

/**
 * The client, as a browser can run it.
 *
 * Serve it at {@link clientUrl}, which is where every island asks for it. One
 * file however many a document holds — each island draws itself, so nothing
 * writes a call to go with it.
 */
export const client: string = readFileSync(
  new URL("./browser/client.js", import.meta.url),
  "utf8",
);

/**
 * Where {@link client} is served, for the page that asks and the app that
 * answers.
 *
 * Named for what is in it, so a build that changes the client changes this too
 * — which is what makes it safe to answer with a year of cache and never
 * revalidate. A browser holding these bytes is done asking, and a new client is
 * a new URL rather than a stale one.
 *
 * Read from here on both sides, so nothing has to be told it and the two cannot
 * drift apart:
 *
 *     if (pathname === clientUrl) {
 *       outgoing.writeHead(200, {
 *         "content-type": "text/javascript",
 *         "cache-control": "public, max-age=31536000, immutable",
 *       });
 *       outgoing.end(client);
 *     }
 */
export const clientUrl = `/_backtick/client-${createHash("sha256")
  .update(client, "utf8")
  .digest("hex")
  .slice(0, 16)}.js`;
