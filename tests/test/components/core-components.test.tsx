import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("coreComponents", async (t) => {
  await snapshotCase(
    t,
    "coreComponents",
    cs`<div style="padding: 8px">
      <span style="font-size: 12px" onclick={() => {}}>
        hi
      </span>
      <img src="https://example.com/a.png" />
    </div>`,
  );
});
