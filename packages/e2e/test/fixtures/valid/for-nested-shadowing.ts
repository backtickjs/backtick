import { cs } from "@backtickjs/core";

// Nested headers reusing a name, and a body that shadows the header's own: the
// update still means the header's binding, because names resolve to their
// binding before anything is lowered.
export default cs`{
  let out = "";
  for (let i = 0; i < 2; i = i + 1) {
    const i = "-";
    for (let j = 0; j < 2; j = j + 1) {
      out = out + i + j;
    }
  }
  return out;
}`;
