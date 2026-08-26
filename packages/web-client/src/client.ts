import type { Bundle } from "@backtickjs/core";
import { render } from "@backtickjs/js-interpreter";
import { dom } from "./dom.js";

// The client, as `scripts/build.mjs` bundles it. Self-starting and exporting
// nothing, so a page declares no global and nothing on it calls in.
//
// An element, so the browser reports each drawing and upgrades the ones already
// there — a page can ask for this file from anywhere.
//
// Defined unguarded: two clients on one page is a mistake, and the registry
// throwing is how anyone finds out.
customElements.define(
  "backtick-bundle",
  class extends HTMLElement {
    connectedCallback(): void {
      // The bundle is the element in front, which the parser finished before it
      // reached this one.
      const bundleScript = this.previousElementSibling;
      if (!(bundleScript instanceof HTMLScriptElement)) {
        throw new Error(
          "backtick: no bundle in front of a `backtick-bundle` to draw",
        );
      }
      const parent = this.parentElement!;
      const bundle = JSON.parse(bundleScript.textContent!) as Bundle;
      // A comment in its place, and drawn in front of that: what the page wrote
      // after a bundle stays after what it draws, whenever this runs. A
      // comment because it is no element — nothing selecting what was drawn can
      // see it, and `:nth-child` cannot count it.
      const anchor = document.createComment("");
      this.replaceWith(anchor);
      bundleScript.remove();
      // No table beside the renderer yet: this target adds no name of its own,
      // so what it answers for is the language's list and nothing more.
      render(bundle, { renderer: dom }, parent, anchor);
    }
  },
);
