import { cs } from "@backtickjs/core";

// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs`1`;

export const script = cs`{
  // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'void'.
  $count;
}`;
