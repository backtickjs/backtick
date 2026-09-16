import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { BacktickElement } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
it("scriptBoundTagParam", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagParam",
    cs`{
      const twice = (Row: (p: { n: number }) => BacktickElement) => (
        <ul>
          {${cs`<Row n={1} />`}}
          {${cs`<Row n={2} />`}}
        </ul>
      );
      return twice((p: { n: number }) => <li>{"row " + p.n}</li>);
    }`,
  );
});
