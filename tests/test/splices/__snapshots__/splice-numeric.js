import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("spliceNumeric", async (t) => {
  await snapshotCase(
    t,
    "spliceNumeric",
    cs.create(
      "pyy2xapmkswv:6:41",
      { params: [{ kind: "splice", value: 1, bindings: [] }] },
      {
        code: "export default $0 => $0();",
        map: '{"version":3,"mappings":"eAK4CA,EAAA,IAAAA,EAAA,EAAC","names":["$0"],"ignoreList":[],"sources":["splice-numeric.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
