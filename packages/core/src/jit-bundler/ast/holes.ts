import type { Client } from "../../cs-runtime/index.js";

// The hole sentinels a spliced class's constructor is applied to in place
// of its client arguments, which have no value until the client runs. Where
// a sentinel surfaces in the expansion's result, serialization emits a
// reference to the expansion's parameter of the same name (see `AstHole`),
// recognized here by identity.
const names = new WeakMap<object, string>();

export function createHole(name: string): Client<never> {
  // Any read or write throws: a client value is opaque on the host, so a
  // constructor that computes or branches with one would otherwise bake the
  // result of probing a placeholder into the bundle.
  const hole = new Proxy(
    {},
    {
      get(_target, property) {
        throw new Error(
          `Can't read \`${String(property)}\` of a client value during ` +
            "construction: the value only exists on the client — store " +
            "it, don't compute with it.",
        );
      },
      set(_target, property) {
        throw new Error(
          `Can't assign \`${String(property)}\` of a client value during ` +
            "construction: the value only exists on the client — store " +
            "it, don't compute with it.",
        );
      },
    },
  );
  names.set(hole, name);
  return hole as unknown as Client<never>;
}

export function holeName(value: unknown): string | undefined {
  return typeof value === "object" && value !== null
    ? names.get(value)
    : undefined;
}
