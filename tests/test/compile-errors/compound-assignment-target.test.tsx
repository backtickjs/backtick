import { cs } from "@backtickjs/core";

// A compound assignment is an assignment, so only a variable is its target.
export const member = cs`(o: { n: number }) => {
  o.n += 1;
}`;
