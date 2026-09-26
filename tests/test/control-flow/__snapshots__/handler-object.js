import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  "1dqhax1do6u08:8:27",
  { params: [] },
  {
    code: "export default () => {\n  let n = 0;\n  n = 1;\n};",
    map: '{"version":3,"mappings":"eAO8B;EAC5B,IAAIA,CAAC,GAAG,CAAC;EACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["handler-object.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const onTap = cs.create(
  "1dqhax1do6u08:13:44",
  { params: [{ kind: "splice", value: beep, bindings: [] }] },
  {
    code: "export default $0 => id => {\n  $0();\n};",
    map: '{"version":3,"mappings":"eAY+CA,EAAA,IAACC,EAAU,IAAI;EAC5DD,EAAA,EAAK;AACP,CAAC","names":["$0","id"],"ignoreList":[],"sources":["handler-object.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.create(
      "1dqhax1do6u08:21:4",
      { params: [{ kind: "splice", value: onTap, bindings: [] }] },
      {
        code: "export default $0 => {\n  const handlers = {\n    tap: $0(),\n    hold: $0()\n  };\n  return handlers;\n};",
        map: '{"version":3,"mappings":"eAoBOA,EAAA;EACD,MAAMC,QAAQ,GAAG;IACfC,GAAG,EAAEF,EAAA,EAAM;IACXG,IAAI,EAAEH,EAAA;GACP;EACD,OAAOC,QAAQ;AACjB,CAAC","names":["$0","handlers","tap","hold"],"ignoreList":[],"sources":["handler-object.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
