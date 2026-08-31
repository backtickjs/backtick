import { cs } from "@backtickjs/core";

// `i++` is not an operator in a client script, so the update is an assignment.
export default cs`{
  let total = 0;
  for (let i = 0; i < 5; i = i + 1) {
    total = total + i;
  }
  return total;
}`;
