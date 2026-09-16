import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Three scripts, and the binding skips the middle one.
//
// The outer script declares `outer`; the innermost references it. The script
// between them neither declares nor mentions it, so it has no capture of its
// own — the binding still has to reach through it, and the outer script has to
// know its declaration escaped even though the script that took it is two
// levels down.
//
// Two call sites make the outer script polymorphic, so its splice arrives as a
// thunk: `captured` is what the hole hands that thunk, which is the only place
// a wrong answer would show up.
function wrap(start: Client<number>): Client<number> {
  return cs`{
    const outer = $start;
    return ${cs`{
      const middle = 10;
      return middle + ${cs`outer`};
    }`};
  }`;
}

it("deepCapture", async (t) => {
  await snapshotCase(t, "deepCapture", cs`${wrap(cs`1`)} + ${wrap(cs`2`)}`);
});
