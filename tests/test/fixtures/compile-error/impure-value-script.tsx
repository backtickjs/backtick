import { cs } from "@backtickjs/core";

// A script that returns a value can't have side effects: a spliced action,
// a call, even a dead computation errors in statement position.
// Assignments are language statements and stay.
const action = cs`{
  const x = 1;
}`;

const ping = cs`() => {
  const x = 1;
}`;

const script = cs`{
  $action;
  return 1;
}`;

const branch = cs`(b: boolean) => {
  let n = 0;
  if (b) {
    $ping();
    n = 1;
  }
  n + 1;
  return n;
}`;
