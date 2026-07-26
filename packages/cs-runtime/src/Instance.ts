import { AsyncLocalStorage } from "node:async_hooks";

/**
 * The bundler's node for the component invocation currently running — what a
 * cell declared during it belongs to.
 *
 * Opaque here: cs-runtime only carries it from `withInstance` to the `state()`
 * calls that invocation makes, so what an instance *is* stays the bundler's,
 * which is the side that puts one in and takes it back out.
 */
export type Instance = object;

// The invocation currently declaring state cells, so `state()` can record what
// owns a cell without the author naming it.
const als = new AsyncLocalStorage<Instance>();

export function withInstance<T>(instance: Instance, invoke: () => T): T {
  return als.run(instance, invoke);
}

export function getInstance(): Instance {
  const instance = als.getStore();
  if (instance === undefined) {
    throw new Error(
      "Can't declare state outside a component. Move the `state()` call " +
        "into the component that owns it.",
    );
  }
  return instance;
}
