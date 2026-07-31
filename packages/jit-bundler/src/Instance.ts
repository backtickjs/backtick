import { AsyncLocalStorage } from "node:async_hooks";
import type { AstInstance } from "./ast/Ast.js";

// The invocation currently declaring state cells, so `state()` can record what
// owns a cell without the author naming it.
//
// `AsyncLocalStorage` rather than a variable because expansion is concurrent: a
// component's props and children are lowered in parallel, so two invocations
// can be in flight at once and a single "current" would hand a cell to whichever
// ran last.
const als = new AsyncLocalStorage<AstInstance>();

export function withInstance<T>(instance: AstInstance, invoke: () => T): T {
  return als.run(instance, invoke);
}

export function getInstance(): AstInstance {
  const instance = als.getStore();
  if (instance === undefined) {
    throw new Error(
      "Can't declare state outside a component. Move the `state()` call " +
        "into the component that owns it.",
    );
  }
  return instance;
}
