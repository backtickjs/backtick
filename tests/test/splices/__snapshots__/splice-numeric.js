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
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAK4CA,QAAA,IAAAA,QAAA,EAAC","names":["$splice0"],"ignoreList":[],"sources":["splices/splice-numeric.test.tsx"]}',
      [],
    ),
  );
});
