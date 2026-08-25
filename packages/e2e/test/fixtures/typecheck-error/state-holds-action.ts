import { cs, state } from "@backtickjs/core";

// An action completes without returning, so `void` is what it splices as, and a
// cell holds a client value. Caught here rather than at the bundle, where
// `lowerSpliceable`'s backstop would catch it as an untyped caller.
const act = cs`{
  const n = $state(2);
  n.write(3);
}`;

const script = cs`{
  const held = $state($act);
  return 1;
}`;
