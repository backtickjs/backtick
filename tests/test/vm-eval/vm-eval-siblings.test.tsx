import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs`<em>{"from another bundle"}</em>`;
}

const otherBundle = await bundler.run(<Other />);

it("vmEvalSiblings", async (t) => {
  await snapshotCase(
    t,
    "vmEvalSiblings",
    cs`<div>
      <span>before</span>
      {$vm.eval($otherBundle)}
      <span>after</span>
    </div>`,
  );
});
