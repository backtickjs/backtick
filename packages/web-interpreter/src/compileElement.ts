import type { ClientValue } from "@backtickjs/core";
import type {
  BundleArrayElement,
  BundleElement,
} from "@backtickjs/platform-sdk";
import { createMemo } from "solid-js";
import type { Instance } from "./Instance.js";
import { compile } from "./compile.js";
import type { Scope } from "./compile.js";
import { drawElement, drawList } from "./draw.js";

/**
 * An inline element, as the closure that builds one.
 *
 * Built once per instance, so the work here happens once per element that
 * exists rather than once per element per render. What a prop or a children
 * position is — a value the bundle carried or an expression somebody computes —
 * was decided when the bundle was written, so it is decided here too: a static
 * prop is set and forgotten, and only what can change costs a computation.
 */
export function compileElement(
  instance: Instance,
  element: BundleElement,
): (scope: Scope | null) => ClientValue {
  const id = element[1];
  // The two ids whose meaning is the language's rather than this client's: they
  // draw no node, so neither reaches the renderer. Answered here, where an id
  // is read, so a client implements them exactly where it implements its own
  // tags.
  if (id === "for") {
    return compileFor(instance, element);
  }
  if (id === "Fragment") {
    return compileFragment(instance, element);
  }
  // Every prop, in the order the element wrote them, because a host may care:
  // an `<input>` wants its `type` before its `value`.
  const props = Object.entries(element[2]).map(([prop, expr]) => {
    const fixed = isFixed(expr);
    return [prop, compile(instance, expr), fixed] as const;
  });
  const children = element[3];
  const draw = children === null ? null : compileChildren(instance, children);
  return (scope) =>
    drawElement(
      instance.renderer,
      id,
      props.map(([prop, read, fixed]) => [prop, () => read(scope), fixed]),
      draw === null ? null : () => draw(scope),
    );
}

// Whether what a position holds can change after it has first been read.
//
// True where the node's own shape proves it cannot: a literal is its own value,
// an arrow is a closure — making one reads nothing, whatever calling it later
// would read — and an element is built once, what moves inside it having its
// own computations. False where this cannot tell, which is not the same as
// saying it moves: `row.id` reads a binding and never changes, and this says
// false about it.
function isFixed(expr: BundleArrayElement): boolean {
  if (!Array.isArray(expr)) {
    if (expr === null || typeof expr !== "object") {
      return true;
    }
    return Object.values(expr).every((member) => isFixed(member));
  }
  if (expr[0] === "arr") {
    return expr[1].every((member) => isFixed(member));
  }
  return expr[0] === "=>" || expr[0] === "el";
}

// A children position, member by member: what cannot change is a node handed
// over once, and only the rest costs a computation.
//
// What comes back is what `insert` takes: a node, a value, an accessor, or an
// array of those.
function compileChildren(
  instance: Instance,
  expr: BundleArrayElement,
  inArray = false,
): (scope: Scope | null) => unknown {
  // A list of children travels as data, which is a node like any other.
  if (Array.isArray(expr) && expr[0] === "arr") {
    const members = expr[1].map((member) =>
      compileChildren(instance, member, true),
    );
    return (scope) => members.map((member) => member(scope));
  }
  const read = compile(instance, expr);
  // Nothing that can change, so nothing to watch.
  if (isFixed(expr)) {
    return (scope) => read(scope);
  }
  // An accessor, so `insert` watches it. Alone in the position, `insert` reads
  // what it answered with in a second computation, so a `<for />` or a drawn
  // bundle changing re-runs that one and not this.
  if (!inArray) {
    return (scope) => () => read(scope);
  }
  // In an array, `insert` reads the member and what it answered with in the one
  // computation, so that change would run this again — and where this is a
  // component, that is a second component with fresh state. The memo answers
  // with the same drawing rather than building another.
  return (scope) => createMemo(() => read(scope));
}

// Children with no element of their own.
//
// The position a drawing needs where what it draws is not an element: its
// members are compiled as an array's are, so each owns a computation. What
// stands here is watched, and the block that answered with it is not run again
// when it changes.
function compileFragment(
  instance: Instance,
  element: BundleElement,
): (scope: Scope | null) => ClientValue {
  const children = element[3];
  if (children === null) {
    return () => null;
  }
  const draw = compileChildren(instance, children, true);
  return (scope) => draw(scope) as ClientValue;
}

// A list: one drawing per member of the array its `each` prop holds. See
// `drawList`.
function compileFor(
  instance: Instance,
  element: BundleElement,
): (scope: Scope | null) => ClientValue {
  const each = compile(instance, element[2]["each"] ?? null);
  const children = compile(instance, element[3]);
  // Made once per list: the member arrives as an argument.
  return (scope) => drawList(() => each(scope), children(scope));
}
