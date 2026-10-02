import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

const componentLabels = ["alpha", "beta", "gamma"];

async function Row({ label }: { label: string }) {
  return cs`<span>{$label}</span>`;
}

// The same list, but each item is a component invocation rather than an
// element. Every invocation is an instance, so each gets a tree entry of its
// own and the key rides the `#apply` that instantiates it — the contrast with
// `mappedElements`, where the key sits inside an inlined element instead.
it("mappedComponents", async (t) => {
  await snapshotCase(
    t,
    "mappedComponents",
    cs`<div>{${componentLabels.map((item) => <Row label={item} />)}}</div>`,
  );
});
