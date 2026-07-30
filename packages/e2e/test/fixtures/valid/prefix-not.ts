import { cs } from "@backtickjs/core";

// `!` is the one prefix operator, and its operand is boolean like every other
// tested position — there is no truthiness for it to negate.
export default cs`(ready: boolean, count: number) => {
  if (!ready) {
    return "waiting";
  }
  return !(count > 3) ? "room left" : "full";
}`;
