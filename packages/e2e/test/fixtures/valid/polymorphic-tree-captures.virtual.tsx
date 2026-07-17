import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core/cs-runtime";

// A polymorphic fragment whose splice captures the template's own binding,
// referenced from tree props: the hole's thunk ships in JSON position with
// `params`, so `base` threads from the entry's scope into the splice.
function offset(by: Client<number>): Client<(base: number) => number> {
  return cs.lift((__cs_base: number) => cs.splice(cs.lift(__cs_base)) + cs.splice((by)));
}

export default <button onA={offset(cs.lift(1))} onB={offset(cs.lift(2))} />;
