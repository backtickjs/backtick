import { cs } from "@backtickjs/core";

// A `for` condition is a boolean like every other condition, header or not.
export default cs`(n: number) => {
  let last = 0;
  for (let i = n; i; i = i - 1) {
    last = i;
  }
  return last;
}`;
