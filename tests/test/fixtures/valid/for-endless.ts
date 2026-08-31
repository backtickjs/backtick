import { cs } from "@backtickjs/core";

// `for (;;)` has no condition, so `break` is the only way out.
export default cs`{
  let i = 0;
  for (;;) {
    if (i === 4) {
      break;
    }
    i = i + 1;
  }
  return i;
}`;
