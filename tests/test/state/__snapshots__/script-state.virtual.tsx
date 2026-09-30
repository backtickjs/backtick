import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// Storage a script declares for itself, rather than one a component owns and
// splices in. `$createSignal(...)` is an ordinary call of an imported value, and
// the signal is what the call answers with: each time it is evaluated there is
// another signal, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.lift((__cs_label: string) => {
    return { label: cs.splice((createSignal))(__cs_label) };
});

  return (
    <span
      style={cs.lift("font-size: 16px")}
      onclick={cs.lift(() => {
    const __cs_row = cs.splice((build))("one");
    __cs_row.label[1](__cs_row.label[0]() + " !!!");
})}
    >
      {cs.lift(cs.splice((build))("one").label[0]())}
    </span>
  );
}

it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", <ScriptRows />);
});
