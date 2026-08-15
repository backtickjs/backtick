import type { Builtins } from "@backtickjs/cs-runtime";
import type { Value } from "./Value.js";
import { state } from "./state.js";

// What the framework's own names answer with. Beside `globals`, which is the
// host language's — the two are looked up through one table, because the format
// has one node for a name it carries.
export const builtins = {
  // Declaring is not calling: this stands where the declaration is written, and
  // each time that is evaluated there is another cell.
  //
  // The writers answer `null` because `void` is not a value this language has.
  state: (initial: Value) => state(initial),
} as unknown as Builtins;
