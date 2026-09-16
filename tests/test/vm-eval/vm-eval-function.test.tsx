import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(cs`(name: string) => "hello " + name`);

const badge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

it("vmEvalFunction", async (t) => {
  await snapshotCase(
    t,
    "vmEvalFunction",
    cs`<div>
      <span>{$vm.eval($greet)("ada")}</span>
      {$vm.eval($badge)({ count: 3 })}
    </div>`,
  );
});
