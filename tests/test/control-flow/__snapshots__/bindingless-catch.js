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
        code: 'export default () => {\n    try {\n        throw "boom";\n    }\n    catch {\n        return "caught";\n    }\n};',
        map: '{"version":3,"file":"bindingless-catch.test.jsx","sourceRoot":"","sources":["bindingless-catch.test.tsx"],"names":[],"mappings":"eAUO;IACD,IAAI,CAAC;QACH,MAAM,MAAM,CAAC;IACf,CAAC;IAAC,MAAM,CAAC;QACP,OAAO,QAAQ,CAAC;IAClB,CAAC;AACH,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
