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
// says what to draw in markup and this reads it — so the bundle esbuild writes
// declares no global, and pays none of the interop that handing one over costs.
//
// `scripts/browser.mjs` bundles exactly this file into the string that `client`
// hands out.
// And it starts itself, from whatever the page is carrying.
//
// A page says what to draw in `<script type="application/json">` scripts, each
// naming where it goes: `data-backtick="body"`. A `data-*` attribute because
// that is the only kind an author may invent, which is also what puts it on
// `dataset` rather than behind `getAttribute`.
//
// Reading them here rather than being told by a script beside them is what
// leaves the bundle as data and never as code: nothing on the page executes but
// this file, so a page that fetches it carries no inline JavaScript at all.
//
// Every script, not just the first — one page may draw in several places, and
// they share this one client rather than a copy each.
const scripts = document.querySelectorAll<HTMLScriptElement>(
  "script[data-backtick]",
);

// Loudly, both of them. The alternative is a blank page with nothing in the
// console to read: a script that says nowhere, or names something the page does
// not have, is a page and whatever wrote it disagreeing, and only the page is
// in a position to say so.
for (const script of scripts) {
  const into = script.dataset["backtick"];
  if (into === undefined || into === "") {
    throw new Error("backtick: a block to render says nowhere to render it");
  }
  const target = document.querySelector(into);
  if (target === null) {
    throw new Error(`backtick: nothing matches \`${into}\` to render into`);
  }
  render(JSON.parse(script.textContent) as Bundle, dom, target);
}
