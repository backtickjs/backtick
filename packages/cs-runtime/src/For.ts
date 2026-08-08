import type { Client } from "./Client.js";
import type { ClientValue } from "./ClientValue.js";
import type { JsxElement } from "./JsxElement.js";
import type { ReadonlyState } from "./state.js";

/**
 * An array, and what to draw for one member of it.
 *
 * `children` is a script whose value is a function, so the client is what walks
 * the array: it draws only the members that are new, and moves rather than
 * rebuilds the ones that are not.
 */
export type ForProps<T extends ClientValue> = {
  each: Client<T[]>;
  children: Client<(member: T, index: ReadonlyState<number>) => JsxElement>;
};

// Generic where `ClientElement<P>` fixes its props: `each` decides `T`, and the
// child script's parameter is checked against it. The call signature is spelled
// out rather than inherited from `ClientElement`, whose own takes any object of
// spliceable values — every call that failed this signature would resolve
// against that one instead and report nothing.
//
// Branded as itself rather than as a `ClientElement`, because it is not one: it
// draws no node, and it lowers to `NodeKind.For` rather than to an element.
export interface For {
  <T extends ClientValue>(props: ForProps<T>): never;
  readonly "@backtickjs": "For";
}

/**
 * The only way a list is written.
 *
 * A script contributes one thing to a children position and no more (see
 * `Children`), so a list has to be declared rather than computed. A member is
 * named by its own identity: there is no key, and a value replaced is a member
 * replaced.
 *
 * The index is storage rather than a number, because a position moves without
 * the member changing: a drawing handed the number would hold the one it was
 * drawn at forever, where `index.read()` is observed wherever it is read.
 *
 * Shared rather than declared per target, unlike `Fragment`: what a fragment may
 * hold is what a target's elements are, where this holds whatever its child
 * script draws — and what a target admits as a tag is already settled by its
 * `ElementType`.
 */
export const For = { "@backtickjs": "For" } as unknown as For;

export function isFor(value: unknown): value is For {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "For"
  );
}
