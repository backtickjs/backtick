import type { ClientElement } from "./ClientElement.js";
import type { ServerComponent } from "./ServerComponent.js";

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it.
 */
export interface JsxElement {
  readonly "@backtickjs": "JsxElement";
  readonly type: ClientElement<never> | ServerComponent<never>;
  readonly props: { [key: string]: unknown };
}

export function isJsxElement(value: unknown): value is JsxElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "JsxElement"
  );
}

export function createJsxElement(
  type: ClientElement<never> | ServerComponent<never>,
  props: { [key: string]: unknown },
): JsxElement {
  return {
    "@backtickjs": "JsxElement",
    type,
    props,
  };
}
