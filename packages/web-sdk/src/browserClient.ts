import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

/** The client, as a browser can run it. Serve it at {@link clientUrl}. */
export const client: string = readFileSync(
  new URL("./browser/client.js", import.meta.url),
  "utf8",
);

/**
 * Where {@link client} is served.
 *
 * Named for its contents, so a changed client is a changed url — which is what
 * makes `cache-control: public, max-age=31536000, immutable` safe to answer
 * with. Read from here on both sides so the two cannot drift apart.
 */
export const clientUrl = `/_backtick/client-${createHash("sha256")
  .update(client, "utf8")
  .digest("hex")
  .slice(0, 16)}.js`;
