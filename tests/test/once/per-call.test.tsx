import { it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Each run of a `cs` line is one value, as each call of a host function that
// makes an object is one object: two calls make two, and one spliced twice is
// one. Two values of one script are two constants of one module.
function box(): Client<{ label: string }> {
  return cs`({ label: "box" })`;
}

const a = box();
const b = box();

it("perCall", async (t) => {
  await snapshotCase(t, "perCall", cs`[$a === $a, $a === $b]`);
});
