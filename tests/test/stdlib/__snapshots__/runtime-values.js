import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs.create(
      "1eany0mypxz6m:9:4",
      {
        params: [
          { kind: "splice", value: [1, "two", true, null], bindings: [] },
          { kind: "splice", value: { k: 3 }, bindings: [] },
        ],
      },
      "($splice0, $splice1) => ({\n    list: $splice0(),\n    obj: $splice1(),\n})",
      '{"version":3,"file":"runtime-values.test.jsx","sourceRoot":"","sources":["stdlib/runtime-values.test.tsx"],"names":[],"mappings":"AAQO,wBAAA,CAAC;IACF,IAAI,EAAE,UAAC;IACP,GAAG,EAAE,UAAC;CACP,CAAC"}',
    ),
  );
});
