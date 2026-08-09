// The client half: drawing a bundle, in a browser.
//
// `@backtickjs/web-sdk/client`, and the other half is
// `@backtickjs/web-sdk/server`. Neither is the package's default, because
// neither is what the SDK is — an import says which half it holds, and reading
// one tells you where that code runs.
//
// Two exports, and only one of them is this package's. `render` is the
// interpreter's, unchanged: evaluating a bundle is the same work on every
// target, and what a browser adds is `dom` — which is why it is an argument
// rather than an assumption. Wrapping the pair in a `mount` of our own would
// only hide which half is which.
//
// Nothing here reaches a runtime API, so this is the half a browser can bundle,
// and `scripts/browser.mjs` bundles exactly this file into `/backtick.js`.
// Nothing here starts on its own either: a page says when to draw by carrying a
// script that calls `render`, which is what `toHtml` writes.
export { render } from "@backtickjs/js-interpreter";
export { dom } from "./dom.js";
