import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { compile } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = compile(
  await bundler.run(cs`(name: string) => "hello " + name`),
).code;

const badge = compile(
  await bundler.run(
    cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
  ),
).code;

it("evalFunction", async (t) => {
  await snapshotCase(
    t,
    "evalFunction",
    cs`<div>
      <span>{eval($greet)("ada")}</span>
      {eval($badge)({ count: 3 })}
    </div>`,
  );
});
