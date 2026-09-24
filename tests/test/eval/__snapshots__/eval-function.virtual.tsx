import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(cs.lift(cs.const((__cs_name: string) => "hello " + __cs_name)));

const badge = await bundler.run(
  cs.lift(cs.const((__cs_props: {
    count: number;
}) => <b>{cs.lift("count " + __cs_props.count)}</b>)),
);

it("evalFunction", async (t) => {
  await snapshotCase(
    t,
    "evalFunction",
    cs.lift(cs.const(<div>{cs.lift(<span>{cs.lift(eval((cs.splice((greet)) satisfies typeof cs.ClientUnknown))("ada"))}</span>)}{cs.lift(eval((cs.splice((badge)) satisfies typeof cs.ClientUnknown))({ count: 3 }))}</div>)),
  );
});
