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
      '() => {\n    try {\n        throw "boom";\n    }\n    catch {\n        return "caught";\n    }\n}',
      '{"version":3,"file":"bindingless-catch.test.jsx","sourceRoot":"","sources":["control-flow/bindingless-catch.test.tsx"],"names":[],"mappings":"AAUO;IACD,IAAI,CAAC;QACH,MAAM,MAAM,CAAC;IACf,CAAC;IAAC,MAAM,CAAC;QACP,OAAO,QAAQ,CAAC;IAClB,CAAC;AACH,CAAC"}',
    ),
  );
});
