import { cs } from "@backtickjs/core";

// A value script computes: a spliced action or a void call in statement
// position fails; assignments and dead value computations stay legal.
const action = cs`{
  const x = 1;
}`;

const ping = cs`() => {
  const x = 1;
}`;

export const script = cs`{
  $action;
  return 1;
}`;

export const branch = cs`(b: boolean) => {
  let n = 0;
  if (b) {
    $ping();
    n = 1;
  }
  n + 1;
  return n;
}`;
