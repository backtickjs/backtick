import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";

// A polymorphic fragment whose splice captures the template's own binding,
// referenced from tree props: the hole's thunk ships in JSON position with
// `params`, so `base` threads from the entry's scope into the splice.
function offset(by: Client<number>): Client<(base: number) => number> {
  return cs.liftValue((__cs_base: number) => cs.splice(cs.liftValue(__cs_base)) + cs.splice((by)));
}

export default <button onA={offset(cs.liftValue(1))} onB={offset(cs.liftValue(2))} />;
