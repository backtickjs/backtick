import type { Bundle } from "@backtickjs/core";
import { render } from "@backtickjs/js-interpreter";
import { dom } from "./dom.js";

// The client, as `scripts/browser.mjs` bundles it. Self-starting and exporting
// nothing, so a page declares no global and nothing on it calls in.
//
// One element, and the browser does the rest: it is told when one is in the
// document, whether the parser has just made it or something added it later, and
// defining the element upgrades every one already there. So a page can ask for
// this file from anywhere — the head, the end of the body, deferred, or
// appended long after — and none of that changes where anything is drawn.
if (customElements.get("backtick-island") === undefined) {
  customElements.define(
    "backtick-island",
    class extends HTMLElement {
      connectedCallback(): void {
        // The bundle is the element in front, which the parser finished before
        // it reached this one.
        const bundleScript = this.previousElementSibling;
        if (!(bundleScript instanceof HTMLScriptElement)) {
          throw new Error("backtick: no bundle in front of an island to draw");
        }
        const parent = this.parentElement!;
        const bundle = JSON.parse(bundleScript.textContent!) as Bundle;
        // A comment in its place, and drawn in front of that: what the page
        // wrote after an island stays after what the island draws, whenever this
        // runs. A comment because it is no element — nothing selecting what was
        // drawn can see it, and `:nth-child` cannot count it.
        const anchor = document.createComment("");
        this.replaceWith(anchor);
        bundleScript.remove();
        render(bundle, dom, parent, anchor);
      }
    },
  );
}
