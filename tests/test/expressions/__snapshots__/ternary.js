import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?:` evaluates only the taken branch, and its condition narrows like an
// `if`'s.
const pick = cs.create(
  "uekyc2sf8mzc:7:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => n => {\n    return n === null ? 0 : n + 1;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAMgB,MAACA,CAAgB;IAC/B,OAAOA,CAAC,KAAK,IAAI,GAAG,CAAC,GAAGA,CAAC,GAAG,CAAC;AAC/B,CAAC","names":["n"],"ignoreList":[],"sources":["expressions/ternary.test.tsx"]}',
  [],
);
it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs.create(
      "uekyc2sf8mzc:15:4",
      { params: [{ kind: "splice", value: pick, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    absent: $splice0()(null),\n    present: $splice0()(4)\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAcOA,QAAA,KAAC;IACFC,MAAM,EAAED,QAAA,EAAK,CAAC,IAAI,CAAC;IACnBE,OAAO,EAAEF,QAAA,EAAK,CAAC,CAAC;CACjB,CAAC","names":["$splice0","absent","present"],"ignoreList":[],"sources":["expressions/ternary.test.tsx"]}',
      [],
    ),
  );
});
