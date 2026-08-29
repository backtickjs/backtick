import type { Bundle, ClientValue } from "@backtickjs/core";
import { render } from "@backtickjs/js-interpreter";
import { builtins } from "./builtins.js";
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
  "backtick-renderer",
  class extends HTMLElement {
    // The bundle as a prop, which is what makes a second one redraw: an
    // element already on the page is told, where an element that went looking
    // for its bundle could only ever find it once.
    static readonly observedAttributes = ["bundle"];

    // What takes the last drawing down. `render` hands it back, and holding it
    // is the difference between redrawing and drawing again beside.
    #drop: (() => void) | undefined;

    connectedCallback(): void {
      const bundle = this.getAttribute("bundle");
      if (bundle === null) {
        throw new Error("backtick: a `backtick-renderer` with no `bundle` to draw");
      }
      this.#draw(bundle);
    }

    attributeChangedCallback(
      _name: string,
      _before: string | null,
      value: string | null,
    ): void {
      // Set before this was put anywhere: there is nothing to draw into yet,
      // and `connectedCallback` reads the prop when there is.
      if (!this.isConnected || value === null) {
        return;
      }
      this.#draw(value);
    }

    disconnectedCallback(): void {
      this.#drop?.();
      this.#drop = undefined;
      this.replaceChildren();
    }

    // Drawn inside this element rather than in place of it. The element stays,
    // which is what there is to tell when the bundle changes again — and what
    // it holds is what a redraw clears, because dropping a drawing ends its
    // reactivity and leaves its nodes where they are.
    //
    // `display: contents` so standing here costs no box: what was drawn lays
    // out against whatever holds this element, as it would have without it.
    #draw(bundle: string): void {
      this.#drop?.();
      this.style.display = "contents";
      const anchor = document.createComment("");
      this.replaceChildren(anchor);
      this.#drop = draw(JSON.parse(bundle) as Bundle, anchor);
    }
  },
);

// The table beside the renderer is this target's own: `builtinsOf` merges it
// with the language's and throws if a name here shadows one of those, so a
// bundle means the same thing wherever it is drawn.
function draw(bundle: Bundle, anchor: ChildNode): () => void {
  return render(
    bundle,
    // Cast the way the language's own table is, a few lines into
    // `interpret.ts`: what a schema names is an interface, and an interface has
    // no index signature, where a lookup by name wants one.
    {
      renderer: dom,
      builtins: builtins as unknown as Readonly<Record<string, ClientValue>>,
    },
    anchor.parentElement!,
    anchor,
  );
}
