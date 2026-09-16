import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A script that returns a value may still run an action: what a statement
// discards has to be nothing, and an action is what answers with nothing.
//
// The check is `cs.statement`'s and not the compiler's — the position is what
// decides, not the kind of script it sits in. A value in statement position is
// a mistake wherever it stands (see `discarded-value`), and an action is the
// point of the position rather than something a value script has to go without.
const valueScriptEffects: Client<void> = cs`{
  const x = 1;
}`;

const ping: Client<() => void> = cs`() => {
  let n = 0;
  n = 1;
}`;

it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs`(b: boolean) => {
      let n = 0;
      $valueScriptEffects;
      if (b) {
        $ping();
        n = 1;
      }
      return n;
    }`,
  );
});
