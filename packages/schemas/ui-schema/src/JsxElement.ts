import type { ClientValue } from "@backtickjs/language-schema";
import type { ClientElement } from "./schema.generated.js";
import type { ElementAlias } from "./ElementAlias.js";
import type { Fragment } from "./Fragment.js";
import type { ServerComponent } from "./ServerComponent.js";

/**
 * What a JSX tag may name: an element to draw, a component to run while
 * bundling, a fragment, or an alias for an element.
 *
 * An element is its own name — `<div>` is the string `"div"`, the same id the
 * wire carries — so a target's tags are the strings its schema declares in
 * `Elements`. `<For />` is the alias arm: `<for />` under the type that binds
 * `T`, which the tag itself has nowhere to do.
 *
 * `ClientNode` is what a component of that target may answer with, which the
 * target binds where it declares `JSX.ElementType`. At `ClientValue` this is the
 * top of the family — every target's is assignable to it — which is what the
 * runtime holds below, since a value carrying only a tag has no target to
 * answer for.
 */
export type JsxElementType<ClientNode extends ClientValue> =
  | string /* IntrinsicElement tag */
  | ServerComponent<never, ClientNode>
  | Fragment<never>
  | ElementAlias;

/**
 * What a JSX tag evaluates to on the host, before bundling resolves it. The tag
 * and its props are the host's own, and nothing a client script holds reaches
 * them.
 */
export interface JsxElement extends ClientElement {
  readonly "@backtickjs": "JsxElement";
  readonly type: JsxElementType<ClientValue>;
  // Unknown, because only a tag's props cross. A component runs here and keeps
  // its own, so it may take a host function or anything else the wire cannot
  // carry; what a tag admits is checked where a tag lowers.
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

// The one place a drawing is made: `ClientElement` is branded with a symbol
// nothing outside the generated schema can write, so what makes one says so
// here rather than every holder being asked to prove it.
export function createJsxElement(
  type: JsxElementType<ClientValue>,
  props: { [key: string]: unknown },
): JsxElement {
  return {
    "@backtickjs": "JsxElement",
    type,
    props,
  } as unknown as JsxElement;
}
