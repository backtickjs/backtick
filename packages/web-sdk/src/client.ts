import type { Bundle } from "@backtickjs/core";
import { render } from "@backtickjs/js-interpreter";
import { dom } from "./dom.js";

// The client, as `scripts/browser.mjs` bundles it. Self-starting and exporting
// nothing, so an island declares no global and nothing on a page calls in.
//
// An island is the bundle and then this, so nothing is marked and nothing is
// searched for: the bundle is the element in front, and where to draw is what
// they are both in.
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

// Read, then take both out: a script is an element, and one left behind would
// show up in `#main > .card` and in `:first-child`. Before drawing, so an empty
// target is this one's to fill and a target the host is using is not.
const bundle = JSON.parse(bundleScript.textContent!) as Bundle;
bundleScript.remove();
clientScript.remove();

render(bundle, dom, into);
