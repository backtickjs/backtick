import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs.create(
      "2jjdjdr7m395y:9:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "2jjdjdr7m395y:11:15",
              { params: [{ kind: "capture", key: "x$2jjdjdr7m395y$0" }] },
              "($capture0) => $capture0",
              '{"version":3,"file":"nested-scripts.test.jsx","sourceRoot":"","sources":["captures/nested-scripts.test.tsx"],"names":[],"mappings":"AAUkB,eAAA,SAAC"}',
            ),
            bindings: ["x$2jjdjdr7m395y$0"],
          },
        ],
      },
      "($splice0) => {\n    const x = 0;\n    return $splice0(x);\n}",
      '{"version":3,"file":"nested-scripts.test.jsx","sourceRoot":"","sources":["captures/nested-scripts.test.tsx"],"names":[],"mappings":"AAQO;IACD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,WAAC,CAAQ;AAClB,CAAC"}',
    ),
  );
});
