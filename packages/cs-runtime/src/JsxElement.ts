import type { For } from "./For.js";
import type { Fragment } from "./Fragment.js";
import type { ServerComponent } from "./ServerComponent.js";

/**
 * What a JSX tag names: an element to draw, a component to run while bundling,
 * or one of the two that arrange rather than draw. Said once, because a host
 * element and one a client script writes both reach for it.
 *
 * An element is its own name. `<div>` is the string `"div"` — the same id the
 * wire carries and the string `createElement` receives — so every element a
 * target draws is a tag it declares in `IntrinsicElements`, and nothing stands
 * between the two. What is left is a value only where it has to be: a
 * component runs, and `For` and `Fragment` are recognised rather than drawn.
 */
export type JsxElementType =
  | string /* IntrinsicElement tag */
  | ServerComponent<never>
  | Fragment<never>
  | For;

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it.
 */
export interface JsxElement {
  readonly "@backtickjs": "JsxElement";
  readonly type: JsxElementType;
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
  type: JsxElementType,
  props: { [key: string]: unknown },
): JsxElement {
  return {
    "@backtickjs": "JsxElement",
    type,
    props,
  };
}
