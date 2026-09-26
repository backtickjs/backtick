import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A script that returns a value may still run an action.
const valueScriptEffects = cs.create(
  "1zk77nyjrl50d:7:41",
  { params: [] },
  {
    code: "export default () => {\n  const x = 1;\n};",
    map: '{"version":3,"mappings":"eAM4C;EAC1C,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["action-in-value-script.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const ping = cs.create(
  "1zk77nyjrl50d:11:33",
  { params: [] },
  {
    code: "export default () => () => {\n  let n = 0;\n  n = 1;\n};",
    map: '{"version":3,"mappings":"eAUoC,YAAK;EACvC,IAAIA,CAAC,GAAG,CAAC;EACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["action-in-value-script.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs.create(
      "1zk77nyjrl50d:20:4",
      {
        params: [
          { kind: "splice", value: valueScriptEffects, bindings: [] },
          { kind: "splice", value: ping, bindings: [] },
        ],
      },
      {
        code: "export default ($0, $1) => b => {\n  let n = 0;\n  $0();\n  if (b) {\n    $1()();\n    n = 1;\n  }\n  return n;\n};",
        map: '{"version":3,"mappings":"eAmBO,CAAAA,EAAA,EAAAC,EAAA,KAACC,CAAU,IAAI;EAChB,IAAIC,CAAC,GAAG,CAAC;EACTH,EAAA,EAAmB;EACnB,IAAIE,CAAC,EAAE;IACLD,EAAA,EAAK,EAAE;IACPE,CAAC,GAAG,CAAC;EACP;EACA,OAAOA,CAAC;AACV,CAAC","names":["$0","$1","b","n"],"ignoreList":[],"sources":["action-in-value-script.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
