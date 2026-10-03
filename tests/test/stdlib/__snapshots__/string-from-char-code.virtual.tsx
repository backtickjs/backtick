import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// UTF-16 code units rather than code points: a surrogate pair is two
// arguments, where `String.fromCodePoint` takes the one code point.
async function Written() {
  return cs.lift((() => {
    return (
      <span>
        {cs.globalThis.String.fromCharCode(72, 105) + cs.globalThis.String.fromCharCode(0xd83d, 0xde00)}
      </span>
    );
  })());
}

it("Written", async (t) => {
  await snapshotCase(t, "Written", <Written />);
});
