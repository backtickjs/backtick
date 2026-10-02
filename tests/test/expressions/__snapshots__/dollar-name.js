import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs) {
  return cs.create(
    "sl458m2swc6c:10:9",
    { params: [{ kind: "splice", value: lhs, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 2;\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBASYA,QAAA,IAAAA,QAAA,EAAI,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["expressions/dollar-name.test.tsx"]}',
    [],
  );
}
it("dollarName", async (t) => {
  await snapshotCase(
    t,
    "dollarName",
    cs.create(
      "sl458m2swc6c:17:4",
      {
        params: [
          {
            kind: "splice",
            value: add(
              cs.create(
                "sl458m2swc6c:19:19",
                { params: [{ kind: "capture", key: "foo$$sl458m2swc6c$0" }] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAkBsBA,SAAA,IAAAA,SAAI","names":["$capture0"],"ignoreList":[],"sources":["expressions/dollar-name.test.tsx"]}',
                [],
              ),
            ),
            bindings: ["foo$$sl458m2swc6c$0"],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const foo$ = 1;\n    return $splice0(foo$);\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAgBOA,QAAA;IACD,MAAMC,IAAI,GAAG,CAAC;IACd,OAAOD,QAAA,CAAAC,IAAA,CAAC;AACV,CAAC","names":["$splice0","foo$"],"ignoreList":[],"sources":["expressions/dollar-name.test.tsx"]}',
      [],
    ),
  );
});
