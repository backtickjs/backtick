import * as solid from "solid-js";
import * as web from "solid-js/web";

/**
 * What runs a bundle's default export on Solid: `evaluate` answers with what
 * it evaluates to, and `render` draws it into a container, answering with what
 * takes it down. Both run it in a root of its own, which owns what it creates.
 * A bundle's imports resolve to this Solid through the page's import map.
 */
export const client = {
  evaluate<T>(run: () => T): T {
    return solid.createRoot(() => run());
  },
  render(run: () => unknown, container: Element): () => void {
    return web.render(() => run() as solid.JSX.Element, container);
  },
};
