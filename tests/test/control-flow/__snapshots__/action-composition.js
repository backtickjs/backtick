import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create(
  "3q2gz79xhvvfp:8:30",
  { params: [] },
  {
    code: "export default () => {\n  const x = 1;\n};",
    map: '{"version":3,"mappings":"eAOiC;EAC/B,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["action-composition.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const composed = cs.create(
  "3q2gz79xhvvfp:12:31",
  { params: [{ kind: "splice", value: effects, bindings: [] }] },
  {
    code: "export default $0 => {\n  $0();\n};",
    map: '{"version":3,"mappings":"eAWkCA,EAAA;EAChCA,EAAA,EAAQ;AACV,CAAC","names":["$0"],"ignoreList":[],"sources":["action-composition.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("actionComposition", async (t) => {
  await snapshotCase(
    t,
    "actionComposition",
    cs.create(
      "3q2gz79xhvvfp:20:4",
      { params: [{ kind: "splice", value: composed, bindings: [] }] },
      {
        code: "export default $0 => {\n  $0();\n};",
        map: '{"version":3,"mappings":"eAmBOA,EAAA;EACDA,EAAA,EAAS;AACX,CAAC","names":["$0"],"ignoreList":[],"sources":["action-composition.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
