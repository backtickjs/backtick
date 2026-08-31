import { cs } from "@backtickjs/core";

// `$`-prefixed names splice host bindings, so a client script can't declare
// one — the declaration would shadow the shorthand.
export default cs`{
  const $x = 1;
  return $x;
}`;
