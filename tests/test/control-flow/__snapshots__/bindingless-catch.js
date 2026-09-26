import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
it("bindinglessCatch", async (t) => {
  await snapshotCase(
    t,
    "bindinglessCatch",
    cs.create(
      "1lr2275tf95wm:11:4",
      { params: [] },
      {
        code: 'export default () => {\n  try {\n    throw "boom";\n  } catch {\n    return "caught";\n  }\n};',
        map: '{"version":3,"mappings":"eAUO;EACD,IAAI;IACF,MAAM,MAAM;EACd,CAAC,CAAC,MAAM;IACN,OAAO,QAAQ;EACjB;AACF,CAAC","names":[],"ignoreList":[],"sources":["bindingless-catch.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
