import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs`(name: string) => (
  <>
    <span>a sentence across lines</span>
    <span>
      {name} {name}
    </span>
  </>
)`;

it("scriptFragment", async (t) => {
  await snapshotCase(t, "scriptFragment", cs`<div>{$listed("x")}</div>`);
});
