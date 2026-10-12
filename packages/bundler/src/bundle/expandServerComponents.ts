import { isClientImport, isClientScript, isJsxElement } from "@backtickjs/core";

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
// A component runs each time its element is drawn, as React renders an element
// each place it stands: the component itself never leaves the host, and only
// the client code it bottoms out in reaches the bundle. A value holding no
// server component comes back as the same object.
export async function expandServerComponents(
  value: unknown,
  ancestors: Ancestors | null = null,
): Promise<unknown> {
  if (typeof value !== "object" || value === null) {
    return value;
  }
  if (contains(ancestors, value)) {
    throw new Error(CYCLE_ERROR);
  }
  const inside: Ancestors = { value, parent: ancestors };
  const all = (values: readonly unknown[]) =>
    Promise.all(values.map((entry) => expandServerComponents(entry, inside)));

  if (isJsxElement(value)) {
    const { type } = value;
    // A tag the client draws is left for rendering to refuse.
    if (typeof type !== "function" || isClientImport(type)) {
      return value;
    }
    return expandServerComponents(await type(value.props as never), inside);
  }
  if (isClientScript(value)) {
    const args = await all(value.args);
    return args.every((arg, index) => arg === value.args[index])
      ? value
      : { ...value, args };
  }
  if (Array.isArray(value)) {
    const elements = await all(value);
    return elements.every((element, index) => element === value[index])
      ? value
      : elements;
  }
  // Only plain objects cross; rendering refuses anything else.
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    return value;
  }
  const entries = Object.entries(value);
  const expanded = await all(entries.map(([, entry]) => entry));
  if (expanded.every((entry, index) => entry === entries[index]![1])) {
    return value;
  }
  // Defined, not assigned, so a `__proto__` key stays a key.
  return Object.fromEntries(
    entries.map(([key], index) => [key, expanded[index]]),
  );
}
