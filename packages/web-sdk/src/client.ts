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
// An island is the bundle and then this, so everything this needs is a step
// away: the bundle is the element before it, and where to draw is what they are
// both in. Nothing is marked and nothing is searched for, which is what leaves a
// page free to put an island anywhere and have that be the whole of what says
// where.
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

// Read first, then both scripts go: what a page is left holding is what the app
// drew, as a direct child of whatever the island was put in. Anything left
// between the two would be an element in every selector that reaches them —
// `#main > .card` would stop matching, `:first-child` would be the wrong thing —
// and a script is still an element for that.
//
// Out before drawing, so what is drawn is measured against a target holding only
// what the host put there: a target left empty is this one's to fill, and a
// target the host is still holding something in is not.
const bundle = JSON.parse(bundleScript.textContent!) as Bundle;
bundleScript.remove();
clientScript.remove();

render(bundle, dom, into);
