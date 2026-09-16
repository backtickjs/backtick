import { cs } from "@backtickjs/core";

// A namespace is the front of a name rather than a value: `Math.floor` is one
// name the client answers, and there is no `Math` for a read to yield. So a
// member is the whole of what a script may write after one, and anything else
// is caught here rather than reaching a client as a name nothing answers.
export const bare = cs`Math`;

export const held = cs`{
  const m = Math;
  return m;
}`;

export const passed = cs`(f: (n: number) => number) => f(Array)`;

// Element access has no whole name to build: what stands in the brackets is an
// expression, and a name is not.
export const indexed = cs`Math["floor"](1)`;

// A namespace is never null, so `?.` has nothing to short-circuit.
export const chained = cs`Math?.floor(1)`;

export const read = cs`Math?.PI`;
