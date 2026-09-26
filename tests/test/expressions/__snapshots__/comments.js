import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
it("comments", async (t) => {
  await snapshotCase(
    t,
    "comments",
    cs.create(
      "3lcac8ezsyzi3:11:4",
      { params: [] },
      {
        code: 'export default () => {\n  const count = 1;\n  if (count === 1) {\n    return "one";\n  }\n  return "many";\n};',
        map: '{"version":3,"mappings":"eAUO;EAED,MAAMA,KAAK,GAAG,CAAC;EAEf,IAAIA,KAAK,KAAK,CAAC,EAAE;IAEf,OAAO,KAAK;EACd;EAIA,OAAO,MAAM;AACf,CAAC","names":["count"],"ignoreList":[],"sources":["comments.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
