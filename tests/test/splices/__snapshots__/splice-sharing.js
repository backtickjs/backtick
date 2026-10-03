import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    "3cex0hh0qp6qz:6:9",
    {
      params: [
        { kind: "splice", value: lhs, bindings: [] },
        { kind: "splice", value: rhs, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0() + $splice1();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBAKY,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAI,GAAGC,QAAA,EAAI","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
    [],
  );
}
it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs.create(
      "3cex0hh0qp6qz:13:4",
      {
        params: [
          {
            kind: "splice",
            value: add(
              cs.create(
                "3cex0hh0qp6qz:14:15",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAakB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
                [],
              ),
              cs.create(
                "3cex0hh0qp6qz:14:22",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 2;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAayB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
                [],
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: add(
              cs.create(
                "3cex0hh0qp6qz:15:15",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 3;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAckB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
                [],
              ),
              cs.create(
                "3cex0hh0qp6qz:15:22",
                { params: [] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 4;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAcyB,OAAC","names":[],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
                [],
              ),
            ),
            bindings: [],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    x: $splice0(),\n    y: $splice1()\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAYO,CAAAA,QAAA,EAAAC,QAAA,MAAC;IACFC,CAAC,EAAEF,QAAA,EAAoB;IACvBG,CAAC,EAAEF,QAAA;CACJ,CAAC","names":["$splice0","$splice1","x","y"],"ignoreList":[],"sources":["splices/splice-sharing.test.tsx"]}',
      [],
    ),
  );
});
