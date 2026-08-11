import { hash, source } from "@backtickjs/web-client";

export { insert } from "./insert.js";

/** The client, as a browser can run it. */
export const client: string = source;

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
export const clientHash: string = hash;
