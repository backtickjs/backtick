// The client: what a browser needs to draw a bundle.
//
// Two exports, and only one of them is this package's. `render` is the
// interpreter's, unchanged: evaluating a bundle is the same work on every
// target, and what a browser adds is `dom` — which is why it is an argument
// rather than an assumption. Wrapping the pair in a `mount` of our own would
// only hide which half is which.
//
// Nothing here reaches a runtime API, so this is the half a browser can run,
// and `scripts/browser.mjs` bundles exactly this file into the string that
// `client` hands out. Nothing here starts on its own either: what starts it is
// the call `render` writes, which a page carries in a script of its own.
export { render } from "@backtickjs/js-interpreter";
export { dom } from "./dom.js";
