import { cs } from "@backtickjs/core";

// A step is an assignment, so only a variable can be stepped.
export const member = cs`(o: { n: number }) => {
  o.n++;
}`;
