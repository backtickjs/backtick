import { cs } from "@backtickjs/core";

// `$`-prefixed names splice host bindings, so a client script can't declare
// one — the declaration would shadow the shorthand.
//
// Held in a function: the script splices a host `x` nobody declared, which
// would throw as the module loads.
export const script = () => cs`{
  const $x = 1;
  return $x;
}`;
