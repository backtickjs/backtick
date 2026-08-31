import { cs } from "@backtickjs/core";

// An assignment is a binary expression over `=`, so what may sit on its left is
// a rule of its own: a variable, and nothing else. An object and an array are
// values here, so a member and an element are reads.
const script = cs`(row: { count: number }, seen: readonly number[]) => {
  row.count = 1;
  seen[0] = 2;
  return row.count;
}`;
