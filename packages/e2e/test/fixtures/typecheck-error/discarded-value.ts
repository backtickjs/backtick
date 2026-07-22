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
  $getValue();
}`;
