import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle } from "@backtickjs/core";
import { snapshotCase } from "./snapshotCase.ts";

// Bundles a script evaluates with `vm.eval`: a function it then calls, one it
// is still waiting for, and one drawn among siblings.

// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(cs`(name: string) => "hello " + name`);
const badge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

const vmEvalFunction = cs`<div>
  <span>{$vm.eval($greet)("ada")}</span>
  {$vm.eval($badge)({ count: 3 })}
</div>`;

// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading state
// would never resolve. So the second read is asserted instead, which the
// condition beside it is what makes true.
const vmEvalLoading = cs`{
  const held = $state<Bundle<BacktickElement> | null>(null);

  return (
    <div>
      {held.read() === null ? (
        <span>loading…</span>
      ) : (
        $vm.eval(held.read() as Bundle<BacktickElement>)
      )}
    </div>
  );
}`;

// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs`<em>{"from another bundle"}</em>`;
}

const otherBundle = await bundler.run(<Other />);

const vmEvalSiblings = cs`<div>
  <span>before</span>
  {$vm.eval($otherBundle)}
  <span>after</span>
</div>`;

describe("what each case compiles and bundles to", () => {
  it("vmEvalFunction", async (t) => {
    await snapshotCase(t, "vmEvalFunction", vmEvalFunction);
  });

  it("vmEvalLoading", async (t) => {
    await snapshotCase(t, "vmEvalLoading", vmEvalLoading);
  });

  it("vmEvalSiblings", async (t) => {
    await snapshotCase(t, "vmEvalSiblings", vmEvalSiblings);
  });
});
