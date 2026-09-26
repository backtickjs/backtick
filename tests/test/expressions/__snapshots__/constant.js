import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("constant", async (t) => {
  await snapshotCase(
    t,
    "constant",
    cs.create(
      "1e4ingeabxazf:6:36",
      { params: [] },
      {
        code: "export default () => 1;",
        map: '{"version":3,"mappings":"eAKuC,OAAC","names":[],"ignoreList":[],"sources":["constant.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
