import { cs } from "@backtickjs/core";

// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3 the
// loop stopped at.
export default cs`{
  let last = () => 0;
  for (let i = 0; i < 3; i = i + 1) {
    last = () => i;
  }
  return last();
}`;
