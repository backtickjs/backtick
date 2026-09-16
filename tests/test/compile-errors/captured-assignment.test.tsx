import { cs } from "@backtickjs/core";

// A nested script captures the value of an enclosing script's variable,
// not the variable itself: assigning to it would mutate a copy and
// silently not propagate, so the assignment is rejected. Reading stays
// legal, as does assigning the script's own variables.
export default cs`{
  let count = 0;
  count = 1;
  const handler = ${cs`() => {
    count = count + 1;
    return count;
  }`};
  return handler();
}`;
