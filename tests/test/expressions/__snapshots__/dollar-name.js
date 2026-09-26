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
    {
      code: "export default $0 => $0() + 2;",
      map: '{"version":3,"mappings":"eASYA,EAAA,IAAAA,EAAA,EAAI,GAAG,CAAC","names":["$0"],"ignoreList":[],"sources":["dollar-name.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
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
                {
                  code: "export default $0 => $0;",
                  map: '{"version":3,"mappings":"eAkBsBA,EAAA,IAAAA,EAAI","names":["$0"],"ignoreList":[],"sources":["dollar-name.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: ["foo$$sl458m2swc6c$0"],
          },
        ],
      },
      {
        code: "export default $0 => {\n  const foo$ = 1;\n  return $0(foo$);\n};",
        map: '{"version":3,"mappings":"eAgBOA,EAAA;EACD,MAAMC,IAAI,GAAG,CAAC;EACd,OAAOD,EAAA,CAAAC,IAAA,CAAC;AACV,CAAC","names":["$0","foo$"],"ignoreList":[],"sources":["dollar-name.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
