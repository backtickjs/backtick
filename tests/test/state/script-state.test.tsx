import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// Storage a script declares for itself, rather than one a component owns and
// splices in. `$createSignal(...)` is an ordinary call of an imported value, and
// the signal is what the call answers with: each time it is evaluated there is
// another signal, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs`(label: string) => {
    return { label: $createSignal(label) };
  }`;

  return cs`(
    <span
      style="font-size: 16px"
      onclick={() => {
        const row = $build("one");
        row.label[1](row.label[0]() + " !!!");
      }}
    >
      {$build("one").label[0]()}
    </span>
  )`;
}

it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", <ScriptRows />);
});
