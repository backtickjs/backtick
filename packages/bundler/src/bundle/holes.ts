import type { Client } from "@backtickjs/core";

// The hole sentinels a spliced function is applied to in place of its
// arguments, which have no value until the client runs. Where one surfaces in
// what the function answered, the bundle reads the argument it stands for (see
// `holeRead` in `buildBundle`), recognized here by identity.

/**
 * A parameter of a host function, one object per expansion: the name it prints
 * under in its own declaration, and an identity, so a function answering a
 * function can tell its own arguments from the enclosing one's, which print
 * the same.
 */
export interface HostParam {
  readonly name: string;
}

// The parameter a hole was read from, and the members read off it on the way:
// `props.title` is `props` and `["title"]`.
export interface Hole {
  readonly param: HostParam;
  readonly path: readonly string[];
}

const holes = new WeakMap<object, Hole>();

export function createHole(
  param: HostParam,
  path: readonly string[] = [],
): Client<never> {
  // How messages name it, as the bundle would write it.
  const name = [param.name, ...path].join(".");
  // Reading a member gives a hole of its own, one step further along the path.
  // The value is still opaque — what comes back is another sentinel, not
  // anything to compute with — so a function that takes one argument and reads
  // fields off it reaches them without this knowing what a field is for.
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
        return createHole(param, [...path, String(property)]);
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
  holes.set(hole, { param, path });
  return hole as unknown as Client<never>;
}

export function holeOf(value: unknown): Hole | undefined {
  return typeof value === "object" && value !== null
    ? holes.get(value)
    : undefined;
}
