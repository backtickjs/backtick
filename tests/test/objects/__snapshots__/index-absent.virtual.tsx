import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const answers: { [key: string]: string } = { here: "yes" };

it("indexAbsent", async (t) => {
  await snapshotCase(
    t,
    "indexAbsent",
    cs.lift((() => {
    const __cs_names = ["zero", "one"];
    const __cs_missing = (cs.splice((answers)) satisfies typeof cs.ClientUnknown)["nowhere"] ?? "gone";
    return __cs_names[1] + "/" + __cs_missing;
})()),
  );
});
