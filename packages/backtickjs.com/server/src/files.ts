import { client } from "@backtickjs/web-sdk";
import { assets } from "@backtickjs/playground/assets";

// The client is asked for at a name that says what it holds, so a rebuilt
// client is a name no cache has an old answer for. Its hash is the one it
// published for itself rather than one taken again here — same bytes, and one
// place that decides what naming them means.
export const clientUrl = `/client-${client.sha256.slice(0, 16)}.js`;

// What `build.mjs` writes beside the documents. Every page needs the client;
// the playground's four are here because a page that draws one has to serve
// them, and the component named them itself — there is nothing to configure and
// nothing to copy, only a list to write.
export const files: readonly { url: string; source: string }[] = [
  { url: clientUrl, source: client.source },
  ...assets,
];
