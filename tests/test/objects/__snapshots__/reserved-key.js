import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `#` is the bundle's one reserved key — the discriminant of every node — so
// a plain data object can't carry it.
it("reservedKey", async (t) => {
  await snapshotCase(
    t,
    "reservedKey",
    cs.create(
      "2a27difszbs8:8:39",
      { params: [{ kind: "splice", value: { "#": "value" }, bindings: [] }] },
      {
        code: "export default $0 => () => $0();",
        map: '{"version":3,"mappings":"eAO0CA,EAAA,UAAMA,EAAA,EAAC","names":["$0"],"ignoreList":[],"sources":["reserved-key.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
