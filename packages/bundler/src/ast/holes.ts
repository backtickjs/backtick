import type { Client } from "@backtickjs/language";

// The hole sentinels a spliced function is applied to in place of its
// arguments, which have no value until the client runs. Where a sentinel
// surfaces in what the function answered, serialization emits a reference to
// the expansion's parameter of that name (see `AstHole`), recognized here by
// identity.
const names = new WeakMap<object, string>();

export function createHole(name: string): Client<never> {
  // Reading a member gives a hole of its own, named for the path. The value is
  // still opaque — what comes back is another sentinel, not anything to compute
  // with — so a function that takes one argument and reads fields off it
  // reaches them without this knowing what a field is for.
  //
  // Not interned: a hole is looked up by identity, and every one made here says
  // what it is, so reading a path twice gives two that lower the same.
  const hole = new Proxy(
    {},
    {
      get(_target, property) {
        return createHole(`${name}.${String(property)}`);
      },
      set(_target, property) {
        throw new Error(
          `Can't assign \`${String(property)}\` of \`${name}\`: it stands ` +
            "for a value only the client has — store it, don't compute with " +
            "it.",
        );
      },
      // Asking which members there are is answered where the call is written,
      // and there is nothing here to enumerate. Refused rather than answered
      // empty, which is what the target would say and would draw nothing.
      ownKeys() {
        throw new Error(
          `Can't spread \`${name}\`: it stands for a value only the client ` +
            "has, so its members are reached by name rather than listed.",
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
