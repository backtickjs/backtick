import { cs } from "@backtickjs/core";

// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
export default cs`{
  let out = "";
  for (let i = 0; i < 5; i = i + 1) {
    if (i === 1) {
      continue;
    }
    while (true) {
      out = out + i;
      break;
    }
    if (i === 3) {
      break;
    }
  }
  return out;
}`;
