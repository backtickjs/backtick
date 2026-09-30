import type { Client } from "@backtickjs/core";

// The hole sentinels a spliced function is applied to in place of its
// arguments, which have no value until the client runs. Where a sentinel
// surfaces in what the function answered, the bundle reads the expansion's
// parameter of that name (see `render` in `buildBundle`), recognized here by
// identity.
export interface Hole {
  // The path the function read, as the bundle writes it: `$arg0`, or
  // `$arg0.title` for a field of it.
  readonly name: string;
  // Which expansion made it, so a function answering a function can tell its
  // own arguments from the enclosing one's, which print the same.
  readonly expansion: object;
}

const holes = new WeakMap<object, Hole>();

export function createHole(name: string, expansion: object): Client<never> {
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
        // What arithmetic, comparison and string building ask for first: the
        // host is computing with a value it doesn't have.
        if (property === Symbol.toPrimitive) {
          throw new Error(
            `Can't compute with \`${name}\` on the host: it stands for a ` +
              "value only the client has. Compute with it inside a script " +
              "(cs`...`) instead.",
          );
        }
        return createHole(`${name}.${String(property)}`, expansion);
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
  holes.set(hole, { name, expansion });
  return hole as unknown as Client<never>;
}

export function holeOf(value: unknown): Hole | undefined {
  return typeof value === "object" && value !== null
    ? holes.get(value)
    : undefined;
}
