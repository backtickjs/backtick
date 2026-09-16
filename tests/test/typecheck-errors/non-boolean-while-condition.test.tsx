import { cs } from "@backtickjs/core";

// A `while` condition is a boolean like every other condition: a number
// tested directly is a type error, not a loop that runs while it is nonzero.
export default cs`(n: number) => {
  let left = n;
  // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
  while (left) {
    left = left - 1;
  }
  return left;
}`;
