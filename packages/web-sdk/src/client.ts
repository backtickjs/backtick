import type { Bundle } from "@backtickjs/core";
import { render } from "@backtickjs/js-interpreter";
import { dom } from "./dom.js";

// The client: what a browser needs to draw a bundle.
//
// Two things, and only one of them is this package's. `render` is the
// interpreter's, unchanged: evaluating a bundle is the same work on every
// target, and what a browser adds is `dom` — which is why it is an argument
// rather than an assumption.
//
// Exports nothing. Nothing on a page reaches into this file, because a page
// says what to draw by where it puts it and this reads that — so the bundle
// esbuild writes declares no global, and pays none of the interop that handing
// one over costs.
//
// `scripts/browser.mjs` bundles exactly this file into the string that `client`
// hands out.
// And it starts itself, from where on the page it finds itself.
//
// `toHtml` writes one element holding the bundle and then this, so everything
// this needs is a step away: the bundle is the element before it, and where to
// draw is the element they are both in. Nothing is marked and nothing is
// searched for, which is what leaves a page free to put an island anywhere and
// have that be the whole of what says where.
//
// The bundle stays data and never code: `application/json` is a type no browser
// runs, so a page carries no JavaScript but this file, which it fetched.
const clientScript = document.currentScript;
if (clientScript === null) {
  throw new Error("backtick: the client was not run by a script on the page");
}

const bundleScript = clientScript.previousElementSibling;
if (!(bundleScript instanceof HTMLScriptElement)) {
  throw new Error("backtick: no bundle in front of the client to draw");
}

const into = clientScript.parentElement;
if (into === null) {
  throw new Error("backtick: an island to draw is not in the document");
}

const bundle = JSON.parse(bundleScript.textContent!) as Bundle;

render(bundle, dom, into);
