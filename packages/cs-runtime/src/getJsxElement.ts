import { AsyncLocalStorage } from "node:async_hooks";
import type { JsxElement } from "./JsxElement.js";

// The component currently declaring state cells, so `state()` can record
// where it was called without the author naming it.
const als = new AsyncLocalStorage<JsxElement>();

export function withJsxElement<T>(jsx: JsxElement, invoke: () => T): T {
  return als.run(jsx, invoke);
}

export function getJsxElement(): JsxElement {
  const jsx = als.getStore();
  if (jsx === undefined) {
    throw new Error(
      "Can't declare state outside a component. Move the `state()` call " +
        "into the component that owns it.",
    );
  }
  return jsx;
}
