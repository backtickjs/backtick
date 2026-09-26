import type { BacktickElement, Prop } from "@backtickjs/platform-sdk";

/**
 * What a JSX tag may name: an element to draw, or a component to run while
 * bundling.
 */
export type JsxElementType =
  | string /* IntrinsicElement tag */
  | ((props: never) => Prop<BacktickElement | null>)
  | ((props: never) => Promise<Prop<BacktickElement | null>>);

/**
 * What a JSX tag evaluates to on the server, before bundling resolves it.
 *
 * The tag and its props are the server's own, and nothing a client script
 * holds reaches them — which is why they are here and not on `BacktickElement`:
 * a drawing is what both sides name, and this is what one side builds it from.
 */
export interface JsxElement extends BacktickElement {
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

// The one place a host drawing is made: the brand is a symbol nothing outside
// `BacktickElement.ts` can write, so what makes one says so here rather than
// every holder being asked to prove it.
export function createJsxElement(
  type: JsxElementType,
  props: { [key: string]: unknown },
): BacktickElement {
  return {
    "@backtickjs": "JsxElement",
    type,
    props,
  } as unknown as BacktickElement;
}
