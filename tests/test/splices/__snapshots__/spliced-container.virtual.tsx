import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A container the host built holding scripts, spliced whole.
//
// Each member crosses as what its script produced, so a script reads
// `{ x: number, label: string }` where the host wrote `{ x: Client<number>,
// label: Client<string> }`. Reading `x` off it has to typecheck as a number,
// which is what pins the direction `cs.splice` maps in: forward, from what the
// host wrote. Read the other way — from the client's type back to what the host
// may write — this shape is the one TypeScript cannot infer, and a splice has
// nowhere to name it, since the compiler writes the call.
const originX = cs.lift(1);

const label = cs.lift("origin");

const point = { x: originX, label };

it("splicedContainer", async (t) => {
  await snapshotCase(t, "splicedContainer", cs.lift(cs.splice((point)).x + 1));
});
