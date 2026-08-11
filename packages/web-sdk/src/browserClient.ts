import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

/** The client, as a browser can run it. */
export const client: string = readFileSync(
  new URL("./browser/client.js", import.meta.url),
  "utf8",
);

/**
 * What {@link client} holds, as a sha256.
 *
 * For naming what is served: a url with this in it is a url that changes when
 * the client does, which is what makes `cache-control: public, max-age=31536000,
 * immutable` safe to answer with. Where it is served, and how much of this to
 * put in the name, is the app's — this is only the fact both sides can agree on.
 *
 *     const url = `/_backtick/client-${clientHash.slice(0, 16)}.js`;
 */
export const clientHash: string = createHash("sha256")
  .update(client, "utf8")
  .digest("hex");
