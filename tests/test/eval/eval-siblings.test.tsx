import { it } from "node:test";
import { bundle } from "@backtickjs/solid-js/bundle";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs`<em>{"from another bundle"}</em>`;
}

const otherBundle = (await bundle(<Other />)).code;

it("evalSiblings", async (t) => {
  await snapshotCase(
    t,
    "evalSiblings",
    cs`<div>
      <span>before</span>
      {eval($otherBundle)}
      <span>after</span>
    </div>`,
  );
});
