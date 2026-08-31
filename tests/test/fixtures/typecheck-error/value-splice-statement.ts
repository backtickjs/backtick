import { cs } from "@backtickjs/core";

// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs`1`;

export const script = cs`{
  $count;
}`;
