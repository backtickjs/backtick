import { cs } from "@backtickjs/core";

// A `for` condition is a boolean like every other condition, header or not.
export default cs`(n: number) => {
  let last = 0;
  // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
  for (let i = n; i; i = i - 1) {
    last = i;
  }
  return last;
}`;
