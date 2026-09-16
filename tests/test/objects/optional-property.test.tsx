import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs`(o: { label: string; inner?: { z?: number } }) => {
  return [o.label, o.inner?.z ?? 0];
}`;

it("optionalProperty", async (t) => {
  await snapshotCase(
    t,
    "optionalProperty",
    cs`({
      present: $read({ label: "a", inner: { z: 3 } }),
      partial: $read({ label: "b", inner: {} }),
      omitted: $read({ label: "c" }),
    })`,
  );
});
