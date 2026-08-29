import { assets, clientUrl } from "@backtickjs.com/client/assets";

// Where the page asks for the client. Its own client rather than the web's: it
// answers for `compile`, which is a name this site's schema declares and the
// web one has never heard of.
export { clientUrl };

// What `build.mjs` writes beside the documents: the client, the compiler it
// answers with, and the frame the two live in. Named by the package that made
// them, so nothing here has to know what they are called.
export const files: readonly { url: string; source: string }[] = assets;
