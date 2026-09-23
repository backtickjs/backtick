import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Storage a script declares for itself, rather than one a component owns and
// splices in. `$state(...)` is an ordinary call of an imported value, and the
// cell is what the call answers with: each time it is evaluated there is
// another cell, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.lift(cs.const((__cs_label: string) => {
    return cs.const({ label: (cs.splice((state)) satisfies typeof cs.ClientUnknown)(__cs_label) });
}));

  return (
    <span
      style={cs.lift(cs.const("font-size: 16px"))}
      onclick={cs.lift(cs.const(() => {
    const __cs_row = cs.const((cs.splice((build)) satisfies typeof cs.ClientUnknown)("one"));
    cs.statement(__cs_row.label.set(__cs_row.label.get() + " !!!"));
}))}
    >
      {cs.lift(cs.const((cs.splice((build)) satisfies typeof cs.ClientUnknown)("one").label.get()))}
    </span>
  );
}

it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", <ScriptRows />);
});
