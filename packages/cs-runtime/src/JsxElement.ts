import type { ClientElement } from "./ClientElement.js";
import type { For } from "./For.js";
import type { Fragment } from "./Fragment.js";
import type { ServerComponent } from "./ServerComponent.js";

/**
 * What a JSX tag names: an element to draw, a component to run while bundling,
 * or one of the two that arrange rather than draw. Said once, because a host
 * element and one a client script writes both reach for it.
 */
export type JsxType =
  | ClientElement<never>
  | ServerComponent<never>
  | For
  | Fragment<never>;

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it.
 */
export interface JsxElement {
  readonly "@backtickjs": "JsxElement";
  readonly type: JsxType;
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
  type: JsxType,
  props: { [key: string]: unknown },
): JsxElement {
  return {
    "@backtickjs": "JsxElement",
    type,
    props,
  };
}
