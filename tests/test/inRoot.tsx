import { cs, type Client, type Spliceable } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";

/**
 * A value as a value test runs it: in a Solid root, made in client code by
 * the adapter's `createRoot`. A `.tsx` file of its own, as only those are
 * compiled by Backtick.
 */
export function inRoot(value: Spliceable): Client<unknown> {
  return cs`$createRoot(() => $value)`;
}
