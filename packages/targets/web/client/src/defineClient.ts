import type { ClientValue } from "@backtickjs/core";
import type { Bundle } from "@backtickjs/bundler";
import { render } from "@backtickjs/js-interpreter";
import type { RendererOptions } from "@backtickjs/js-interpreter";
import { builtins as webBuiltins } from "./builtins.js";
import { dom } from "./dom.js";

/**
 * A target's own vocabulary: names a script may call, and tags a bundle may
 * draw.
 *
 * Two tables because a schema declares two things. `builtins` are merged with
 * the language's by `builtinsOf`, which throws where a name is taken — adding is
 * a target's to do and replacing is not. `elements` are consulted before the
 * document is asked, so a target may name a tag the browser has never heard of,
 * which is the latitude `createElement` already takes for `svg:`.
 */
export interface Vocabulary {
  readonly builtins?: Readonly<Record<string, ClientValue>>;
  readonly elements?: Readonly<Record<string, () => Node>>;
}

/**
 * The client, registered.
 *
 * An element, so the browser reports each drawing and upgrades the ones already
 * there — a page can ask for the file holding this from anywhere.
 *
 * Defined unguarded: two clients on one page is a mistake, and the registry
 * throwing is how anyone finds out.
 *
 * `builtins` is what a target adds to the web's own table. `builtinsOf` merges
 * both with the language's and throws where a name is already taken, so a
 * target may add and may not replace — which is why this takes a table rather
 * than letting one be handed in whole.
 */
export function defineClient({
  builtins = {},
  elements = {},
}: Vocabulary = {}): void {
  const renderer: RendererOptions<Node> = {
    ...dom,
    createElement: (tag) => elements[tag]?.() ?? dom.createElement(tag),
  };
  const allBuiltins = {
    ...(webBuiltins as unknown as Record<string, ClientValue>),
    ...builtins,
  };
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
        this.#draw(this.getAttribute("bundle"));
      }

      attributeChangedCallback(
        _name: string,
        _before: string | null,
        value: string | null,
      ): void {
        // Set before this was put anywhere: there is nothing to draw into yet,
        // and `connectedCallback` reads the prop when there is.
        if (!this.isConnected) {
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
      #draw(bundle: string | null): void {
        this.#drop?.();
        this.#drop = undefined;
        this.style.display = "contents";
        // Nothing else is in here, so there is nothing to draw in front of: what
        // is drawn goes into the back of an element that was just emptied.
        this.replaceChildren();
        // The prop is optional, and this is what that means: a page between two
        // bundles has none, and says so by leaving it off or leaving it empty.
        // Either way this stands here holding nothing, which is a state a page is
        // in rather than a mistake it made.
        if (bundle === null || bundle === "") {
          return;
        }
        this.#drop = draw(
          JSON.parse(bundle) as Bundle,
          this,
          allBuiltins,
          renderer,
        );
      }
    },
  );
}

// The table beside the renderer is this target's own: `builtinsOf` merges it
// with the language's and throws if a name here shadows one of those, so a
// bundle means the same thing wherever it is drawn. Handed in rather than read
// from here, because which table it is depends on who registered the element.
function draw(
  bundle: Bundle,
  target: Element,
  builtins: Readonly<Record<string, ClientValue>>,
  renderer: RendererOptions<Node>,
): () => void {
  return render(bundle, { renderer, builtins }, target);
}
