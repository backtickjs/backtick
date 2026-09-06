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
 * Draws a bundle where it is told, and hands back what takes it down again.
 *
 * Returned rather than only used here, because a target that draws a bundle of
 * its own — one it was handed rather than one a page wrote — needs this
 * vocabulary to draw it with, and building a second table beside it is how the
 * two drift.
 */
export type Draw = (
  bundle: Bundle,
  target: Element,
  anchor?: Node,
) => () => void;

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
  // The table beside the renderer is this target's own: `builtinsOf` merges it
  // with the language's and throws if a name here shadows one of those, so a
  // bundle means the same thing wherever it is drawn.
  const allBuiltins = {
    ...(webBuiltins as unknown as Record<string, ClientValue>),
    ...builtins,
  };
  const draw = (bundle: Bundle, target: Element): (() => void) =>
    render(bundle, { renderer, builtins: allBuiltins }, target);

  customElements.define(
    "backtick-island",
    class extends HTMLElement {
      // What takes the drawing down. Held because dropping it is what ends the
      // reactivity — the nodes go when this does, the graph would not.
      #drop: (() => void) | undefined;

      connectedCallback(): void {
        // The bundle is the island's own, in an attribute. On itself rather
        // than in a script in front of it: a node that moves does not take its
        // siblings with it, so an island that read what stood before it drew
        // once and then found nothing the moment anything reordered it.
        const held = this.getAttribute("bundle");
        if (held === null) {
          throw new Error(
            "backtick: a `backtick-island` was given no bundle to draw",
          );
        }
        // Drawn inside this rather than in place of it, and nothing around it
        // is touched. A page could spare it — it wrote it and is done with it —
        // but a drawing may have written it too, and moving what another
        // drawing holds is how the two lose track of each other.
        //
        // `display: contents` so standing here costs no box: what was drawn
        // lays out against whatever holds this element, and what the page wrote
        // after the island stays after what it draws.
        this.style.display = "contents";
        this.#drop = draw(JSON.parse(held) as Bundle, this);
      }

      disconnectedCallback(): void {
        this.#drop?.();
        this.#drop = undefined;
        this.replaceChildren();
      }
    },
  );
}
