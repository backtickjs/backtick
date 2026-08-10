// Pages, from screens.
//
// Nothing here is a server: `page` hands back a document as a string, and what
// carries it — `node:http`, a `Response`, a file — is the app's to choose. The
// other half of the package is `@backtickjs/web-sdk/client`, which is what that
// document already holds.
export { page } from "./page.js";
export { toHtml } from "./toHtml.js";
