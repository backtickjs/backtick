import {
  type ClientScript,
  isClientImport,
  isClientScript,
  isJsxElement,
} from "@backtickjs/core";
import { BundlerError } from "../errors.js";

const CYCLE_ERROR =
  "Can't splice a value that contains itself: a bundle writes each value " +
  "out in full, so a cycle never ends. Break the cycle before splicing it.";

// The objects a value is inside of, innermost first. Each branch has its own,
// so siblings expanding at once never see each other's.
interface Ancestors {
  readonly value: object;
  readonly parent: Ancestors | null;
}

const contains = (ancestors: Ancestors | null, value: object): boolean => {
  for (let at = ancestors; at !== null; at = at.parent) {
    if (at.value === value) {
      return true;
    }
  }
  return false;
};

// Runs every server component in a value and answers with the value as drawn:
// each element of one replaced by what its component drew, expanded in turn.
// Siblings expand at once, so two components awaiting data wait together.
//
// A component runs once per element, as React's server renderer runs one: the
// component itself never leaves the host, and only the client code it bottoms
// out in reaches the bundle. A value holding no server component comes back as
// the same object.
//
// A script is one value, so what one splices is expanded once, however many
// places read it: a server component inside it runs once, as React's server
// renderer runs one element once wherever it's placed. `values` holds each
// one's expansion for the call.
export async function expandServerComponents(
  spliceable: unknown,
  ancestors: Ancestors | null = null,
  values = new Map<ClientScript, Promise<unknown>>(),
): Promise<unknown> {
  if (typeof spliceable !== "object" || spliceable === null) {
    return spliceable;
  }
  if (contains(ancestors, spliceable)) {
    throw new BundlerError(CYCLE_ERROR);
  }
  const inside: Ancestors = { value: spliceable, parent: ancestors };
  const all = (entries: readonly unknown[]) =>
    Promise.all(
      entries.map((entry) => expandServerComponents(entry, inside, values)),
    );

  if (isJsxElement(spliceable)) {
    const { type } = spliceable;
    // A tag the client draws is left for rendering to refuse.
    if (typeof type !== "function" || isClientImport(type)) {
      return spliceable;
    }
    return expandServerComponents(
      await type(spliceable.props as never),
      inside,
      values,
    );
  }
  if (isClientScript(spliceable)) {
    const expanded = async (): Promise<unknown> => {
      const args = await all(spliceable.args);
      return args.every((arg, index) => arg === spliceable.args[index])
        ? spliceable
        : { ...spliceable, args };
    };
    let made = values.get(spliceable);
    if (made === undefined) {
      made = expanded();
      values.set(spliceable, made);
    }
    return made;
  }
  if (Array.isArray(spliceable)) {
    const elements = await all(spliceable);
    return elements.every((element, index) => element === spliceable[index])
      ? spliceable
      : elements;
  }
  // Only plain objects cross; rendering refuses anything else.
  const prototype = Object.getPrototypeOf(spliceable);
  if (prototype !== Object.prototype && prototype !== null) {
    return spliceable;
  }
  const entries = Object.entries(spliceable);
  const expanded = await all(entries.map(([, entry]) => entry));
  if (expanded.every((entry, index) => entry === entries[index]![1])) {
    return spliceable;
  }
  // Defined, not assigned, so a `__proto__` key stays a key.
  return Object.fromEntries(
    entries.map(([key], index) => [key, expanded[index]]),
  );
}
