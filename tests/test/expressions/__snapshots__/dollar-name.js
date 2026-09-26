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
    "($0) => $0() + 2",
    '{"version":3,"file":"dollar-name.test.jsx","sourceRoot":"","sources":["expressions/dollar-name.test.tsx"],"names":[],"mappings":"AASY,QAAA,IAAI,GAAG,CAAC"}',
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
                "($0) => $0",
                '{"version":3,"file":"dollar-name.test.jsx","sourceRoot":"","sources":["expressions/dollar-name.test.tsx"],"names":[],"mappings":"AAkBsB,QAAA,EAAI"}',
              ),
            ),
            bindings: ["foo$$sl458m2swc6c$0"],
          },
        ],
      },
      "($0) => {\n    const foo$ = 1;\n    return $0(foo$);\n}",
      '{"version":3,"file":"dollar-name.test.jsx","sourceRoot":"","sources":["expressions/dollar-name.test.tsx"],"names":[],"mappings":"AAgBO;IACD,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO,QAAC,CAAgB;AAC1B,CAAC"}',
    ),
  );
});
