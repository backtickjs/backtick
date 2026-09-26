import type { ClientHandle } from "@backtickjs/platform-sdk";

/**
 * What a JSX tag may name: an element to draw, or a component to run while
 * bundling. What a component may answer is its adapter's to type.
 */
export type JsxElementType = string | ((props: never) => unknown);

/**
 * What a JSX tag evaluates to on the server, before bundling resolves it: the
 * tag and its props, which are the server's own. What a drawing is, is the
 * adapter's; this is what the bundler expands. A handle, so a host may hand one
 * over wherever a drawing may stand.
 */
export interface JsxElement extends ClientHandle {
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
  return { "@backtickjs": "JsxElement", type, props } as unknown as JsxElement;
}
