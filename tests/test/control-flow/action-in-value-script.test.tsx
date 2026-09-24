import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A script that returns a value may still run an action.
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
