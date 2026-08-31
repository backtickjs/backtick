import { cs } from "@backtickjs/core";

// A bare `return` exits an action early; the completion is null either way.
export default cs`{
  let n = 0;
  if (n === 0) {
    return;
  }
  n = 1;
}`;
