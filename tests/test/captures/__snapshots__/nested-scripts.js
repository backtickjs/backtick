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
              {
                code: "export default $0 => $0;",
                map: '{"version":3,"mappings":"eAUkBA,EAAA,IAAAA,EAAC","names":["$0"],"ignoreList":[],"sources":["nested-scripts.test.tsx"]}',
                imports: [],
                exportAt: 0,
              },
            ),
            bindings: ["x$2jjdjdr7m395y$0"],
          },
        ],
      },
      {
        code: "export default $0 => {\n  const x = 0;\n  return $0(x);\n};",
        map: '{"version":3,"mappings":"eAQOA,EAAA;EACD,MAAMC,CAAC,GAAG,CAAC;EACX,OAAOD,EAAA,CAAAC,CAAA,CAAC;AACV,CAAC","names":["$0","x"],"ignoreList":[],"sources":["nested-scripts.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
