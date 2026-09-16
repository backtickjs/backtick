import { cs } from "@backtickjs/core";

// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs`() => {
  return 1;
}`;

const ping = cs`() => {
  let n = 0;
  n = 1;
}`;

const action = cs`{
  $ping();
  // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'void'.
  $getValue();
}`;

// The same rule in a script that returns: the position is what decides, so a
// discarded value fails here too while the action beside it stands.
const valued = cs`{
  $ping();
  // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'void'.
  $getValue();
  return 1;
}`;
