import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A hole with declarations after it. Two call sites make the script
// polymorphic, so each splice arrives as a thunk and the entry passes the
// bindings it declares at the hole (see `passKeys`).
//
// It passes all of them, including ones the hole sits above: at the hole
// `spliced` is still being initialized and `after` has not been reached. Both
// hoist to the block bound to `null`, so naming them early is inert — which is
// what makes passing every declaration safe, rather than working out which are
// in scope. A fragment cannot reference them anyway; it is written out here,
// where they do not exist.
function sandwich(fragment: Client<number>): Client<number> {
  return cs.lift((() => {
    const __cs_before = cs.const(1);
    const __cs_spliced = cs.const(cs.splice((fragment)) satisfies typeof cs.ClientUnknown);
    const __cs_after = cs.const(2);
    return cs.const(__cs_before + __cs_spliced + __cs_after);
})());
}

it("spliceBeforeDeclaration", async (t) => {
  await snapshotCase(
    t,
    "spliceBeforeDeclaration",
    cs.lift(cs.const((cs.splice(sandwich(cs.lift(cs.const(10)))) satisfies typeof cs.ClientUnknown) + (cs.splice(sandwich(cs.lift(cs.const(20)))) satisfies typeof cs.ClientUnknown))),
  );
});
