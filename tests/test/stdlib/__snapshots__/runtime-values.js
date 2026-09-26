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
      {
        code: "export default ($0, $1) => ({\n  list: $0(),\n  obj: $1()\n});",
        map: '{"version":3,"mappings":"eAQO,CAAAA,EAAA,EAAAC,EAAA,MAAC;EACFC,IAAI,EAAEF,EAAA,EAAC;EACPG,GAAG,EAAEF,EAAA;CACN,CAAC","names":["$0","$1","list","obj"],"ignoreList":[],"sources":["runtime-values.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
