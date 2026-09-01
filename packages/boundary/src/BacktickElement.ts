import type { ClientValue } from "./ClientValue.js";
import type { ClientElement } from "./ClientElement.js";
import type { ServerComponent } from "./ServerComponent.js";

declare const BacktickElementBrand: unique symbol;

export type BacktickElementType<ClientNode extends ClientValue> =
  | string /* IntrinsicElement tag */
  | ServerComponent<never, ClientNode>;

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it. The tag
 * and its props are the host's own, and nothing a client script holds reaches
 * them.
 */
export interface BacktickElement extends ClientElement {
  readonly [BacktickElementBrand]: never;
  readonly "@backtickjs": "BacktickElement";
  readonly type: BacktickElementType<ClientValue>;
  readonly props: { [key: string]: unknown };
}

export function isElement(value: unknown): value is BacktickElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "BacktickElement"
  );
}

// The one place a drawing is made: `ClientElement` is branded with a symbol
// nothing outside the generated schema can write, so what makes one says so
// here rather than every holder being asked to prove it.
export function createElement(
  type: BacktickElementType<ClientValue>,
  props: { [key: string]: unknown },
): BacktickElement {
  return {
    "@backtickjs": "BacktickElement",
    type,
    props,
  } as unknown as BacktickElement;
}
