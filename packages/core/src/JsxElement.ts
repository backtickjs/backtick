import type { BacktickElement } from "./BacktickElement.js";

/**
 * What a JSX tag may name: an element to draw, or a component to run while
 * bundling. What a component may answer is its adapter's to type.
 */
export type JsxElementType = string | ((props: never) => unknown);

/**
 * What a JSX tag evaluates to on the server, before bundling resolves it: the
 * tag and its props, which are the server's own. What a drawing is, is the
 * adapter's; this is what the bundler expands. An element, so a host may hand
 * one over wherever a drawing may stand.
 */
export interface JsxElement extends BacktickElement {
  readonly "@backtickjs": "JsxElement";
  readonly type: JsxElementType;
  readonly props: unknown;
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
  props: unknown,
): JsxElement {
  return { "@backtickjs": "JsxElement", type, props } as JsxElement;
}
