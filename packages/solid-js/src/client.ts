import * as solid from "solid-js";
import * as store from "solid-js/store";
import * as web from "solid-js/web";

// The modules a bundle's entries and imports read, by specifier. The ones this
// client imports itself, so a bundle and what draws it share one Solid.
const solidModules = {
  "solid-js": solid,
  "solid-js/store": store,
  "solid-js/web": web,
};

function register(modules: object): void {
  Object.assign(globalThis, { $modules: modules });
}

/**
 * A client that runs bundles on Solid, with an app's own modules beside
 * Solid's, by the specifier a `createImport` names them with: `evaluate`
 * answers with what a bundle's root evaluates to, and `render` draws it into a
 * container, answering with what takes it down. Both run it in a root of its
 * own, which owns what it creates.
 */
export function createClient(
  appModules: { readonly [specifier: string]: object } = {},
) {
  const modules = { ...appModules, ...solidModules };
  return {
    evaluate<T>(run: () => T): T {
      register(modules);
      return solid.createRoot(() => run());
    },
    render(run: () => unknown, container: Element): () => void {
      register(modules);
      return web.render(() => run() as solid.JSX.Element, container);
    },
  };
}

/** A client with Solid's modules alone. */
export const client = createClient();
