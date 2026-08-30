import { sha256, source } from "@backtickjs.com/client/bundle";

// What the client is called where it is served. The hash of the text is in the
// name, so a reader never holds a stale one and the file may be cached for as
// long as anything is willing to. The package that made it has no say in this:
// it hands over the text, and where text goes is a site's question.
const fileName = `client-${sha256.slice(0, 16)}.js`;

// Where the page asks for it, which is what the template writes. Its own client
// rather than the web's: it answers for `compile`, which is a name this site's
// schema declares and the web one has never heard of.
export const clientUrl = `/${fileName}`;

/** What gets written beside the documents. */
export const files: readonly { url: string; source: string }[] = [
  { url: clientUrl, source },
];
