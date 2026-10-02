import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    "2rqwzcdfi281b:7:9",
    {
      params: [
        { kind: "splice", value: lhs, bindings: [] },
        { kind: "splice", value: rhs, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBAMY,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAI,GAAGC,QAAA,EAAI","names":["$splice0","$splice1"],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
    [],
  );
}
it("deepNestedScripts", async (t) => {
  await snapshotCase(
    t,
    "deepNestedScripts",
    cs.create(
      "2rqwzcdfi281b:11:45",
      {
        params: [
          {
            kind: "splice",
            value: add(
              cs.create(
                "2rqwzcdfi281b:11:54",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAUyD,OAAC","names":[],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
                [],
              ),
              cs.create(
                "2rqwzcdfi281b:11:61",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 2;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAUgE,OAAC","names":[],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
                [],
              ),
            ),
            bindings: [],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAUgDA,QAAA,IAAAA,QAAA,EAAC","names":["$splice0"],"ignoreList":[],"sources":["captures/deep-nested-scripts.test.tsx"]}',
      [],
    ),
  );
});
