import { client } from "@backtickjs/web-sdk";

// The client is asked for at a name that says what it holds, so a rebuilt
// client is a name no cache has an old answer for. Its hash is the one it
// published for itself rather than one taken again here — same bytes, and one
// place that decides what naming them means.
export const clientUrl = `/client-${client.sha256.slice(0, 16)}.js`;

// What `build.mjs` writes beside the document, which is now only this. Every
// other thing the page needs to draw itself is in the bundle.
export const files: readonly { url: string; source: string }[] = [
  { url: clientUrl, source: client.source },
];
