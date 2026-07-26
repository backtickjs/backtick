import type { ClientElement } from "./ClientElement.js";
import type { Prop } from "./Prop.js";
import type { ServerComponent } from "./ServerComponent.js";
import { isSpliceable } from "./Spliceable.js";

export type Key = Prop<string | number>;

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it.
 */
export interface JsxElement {
  readonly "@backtickjs": "JsxElement";
  readonly type: ClientElement<never> | ServerComponent<never>;
  readonly key: Key | null;
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
  key?: Key,
): JsxElement {
  if (key != null && !isSpliceable(key)) {
    throw new Error("Key must be a string, a number, or a client value.");
  }
  return {
    "@backtickjs": "JsxElement",
    type,
    key: key ?? null,
    props,
  };
}
