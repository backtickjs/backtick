import { cs } from "@backtickjs/core";

// A value function must return on every path — syntactically enforced for
// arrows: a partial return's `undefined` sits in function-return position,
// where the `ClientValue` constraint can't see it.
const arrow = cs`(b: boolean) => {
  if (b) {
    return "taken";
  }
}`;
