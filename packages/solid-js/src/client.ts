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

// A function that is itself the value a prop holds, as a bundle marks one:
// every other function a prop holds stands for a value that can change.
const fixedFunctions = new WeakSet<object>();
function fixed<F extends object>(fn: F): F {
  fixedFunctions.add(fn);
  return fn;
}

// A value as Solid reads a prop: a function a bundle wrapped around a value
// that can change is read through a getter, which is how Solid tracks one.
function readThrough(target: object, key: string, value: unknown): void {
  if (typeof value === "function" && !fixedFunctions.has(value)) {
    Object.defineProperty(target, key, {
      enumerable: true,
      get: value as () => unknown,
    });
  } else {
    Object.defineProperty(target, key, { enumerable: true, value });
  }
}

/**
 * A host-built element, as a bundle writes one — `jsx(type, props)` — drawn
 * with Solid: a component is created with its props, and a tag through
 * `Dynamic`.
 */
function jsx(type: unknown, props: { [key: string]: unknown }): unknown {
  const read: { [key: string]: unknown } = {};
  for (const [key, value] of Object.entries(props)) {
    readThrough(read, key, value);
  }
  if (typeof type === "function") {
    return solid.createComponent(type as solid.Component, read);
  }
  // Merged rather than spread, which would read each getter once. `Dynamic`
  // answers with an accessor, since what it draws may change; a tag is fixed,
  // so the element it drew is read once.
  const drawn = solid.createComponent(
    web.Dynamic as solid.Component,
    solid.mergeProps(read, { component: type }),
  );
  return typeof drawn === "function" ? (drawn as () => unknown)() : drawn;
}

function register(modules: object): void {
  Object.assign(globalThis, { $modules: modules, jsx, fixed });
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
