import type { Value } from "./Value.js";

// What a `BundleElement` evaluates to: the element with its props reduced to
// runtime values, so a script prop holds the value the script produced — a
// handler stays a function.
//
// Mutable because an instance re-renders in place when one of its cells is
// written: whoever holds the element is holding the instance, so it observes
// the new render rather than a detached copy.
export class Element {
  // Recognized by this marker rather than by `instanceof`, as everything else
  // spliceable is (`isClientScript`, `isJsxElement`, `isClientState`). Class
  // identity is per-copy of the package: two copies resolved into one install
  // would make `instanceof` false and a renderer would quietly draw every
  // element as text. A marker makes that case merely wasteful.
  readonly "@backtickjs" = "Element";

  readonly id: string;
  key: string | number | null;
  props: { [prop: string]: Value };
  // Which part of the bundle this was evaluated from. Two elements from the
  // same one have the same shape — the same tags nested the same way — because
  // that is what a tree entry is, and a host that notices can build the second
  // one from a copy of the first instead of from nothing.
  //
  // A hint, not a contract: it is the same object every time only because the
  // bundle is read once, and a host that ignores it draws exactly what a host
  // that reads it draws.
  shape: object | null;

  constructor(
    id: string,
    key: string | number | null,
    props: { [prop: string]: Value },
    shape: object | null = null,
  ) {
    this.id = id;
    this.key = key;
    this.props = props;
    this.shape = shape;
  }
}

export function isElement(value: unknown): value is Element {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "Element"
  );
}
