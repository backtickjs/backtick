import { cs, type Client, type Spliceable } from "@backtickjs/core";

/**
 * A drawing as Solid renders one: a client function answering it, which is
 * what `render` takes. A `.tsx` file of its own, as only those are compiled by
 * Backtick.
 */
export function drawing(value: Spliceable): Client<() => unknown> {
  return cs`() => $value`;
}
