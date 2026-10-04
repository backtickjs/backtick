import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "sl458m2swc6c:10:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASYA,QAAA,IAAAA,QAAA,EAAI,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["expressions/dollar-name.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "sl458m2swc6c:17:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const foo$ = 1;\n    return $splice0(foo$);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBOA,QAAA;IACD,MAAMC,IAAI,GAAG,CAAC;IACd,OAAOD,QAAA,CAAAC,IAAA,CAAgB;AACzB,CAAC","names":["$splice0","foo$"],"ignoreList":[],"sources":["expressions/dollar-name.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: ["foo$$sl458m2swc6c$0"] }],
};
const $module2 = {
  id: "sl458m2swc6c:19:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBsBA,SAAA,IAAAA,SAAI","names":["$capture0"],"ignoreList":[],"sources":["expressions/dollar-name.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "capture", key: "foo$$sl458m2swc6c$0" }],
};
// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs) {
  return cs.create($module0, [lhs]);
}
it("dollarName", async (t) => {
  await snapshotCase(
    t,
    "dollarName",
    cs.create($module1, [add(cs.create($module2, []))]),
  );
});
