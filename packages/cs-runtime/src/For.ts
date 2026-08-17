import type { Client } from "@backtickjs/core-schema";
import type { ClientValue } from "@backtickjs/core-schema";
import type { ClientElement, ReadonlyState } from "@backtickjs/core-schema";

/**
 * An array, and what to draw for one member of it.
 *
 * `children` is a script whose value is a function, so the client is what walks
 * the array: it draws only the members that are new, and moves rather than
 * rebuilds the ones that are not.
 */
export type ForProps<T extends ClientValue> = {
  each: Client<T[]>;
  children: Client<(member: T, index: ReadonlyState<number>) => ClientElement>;
};

// Generic where an element's props are fixed: `each` decides `T`, and the child
// script's parameter is checked against it. That is the whole of why this is
// callable — an intrinsic tag has nowhere to bind a type parameter from a prop,
// so the signature stands where the tag will.
//
// Branded so a component is not one: a call signature answering `never` is
// assignable to every return type, and `ServerComponent` rules this out by the
// brand rather than by the shape.
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
 *
 * The name itself, as `<div>` is the string `"div"`: a list draws no node, but
 * it has an id on the wire, so nothing has to recognise this value — it is
 * already what a tag is. The signature above is what it is written under, and
 * the day an intrinsic tag can carry `T` this is spelled `<for />` and the
 * value goes.
 */
export const For = "for" as unknown as For;
