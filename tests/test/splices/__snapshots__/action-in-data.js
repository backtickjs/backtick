import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An action may sit in data like any script: it runs where the container is
// built, and its slot holds what it evaluated to, which is nothing.
const action = cs.create(
  "1es21es7404j7:7:15",
  { params: [] },
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["splices/action-in-data.test.tsx"],"names":[],"mappings":"AAMkB;IAChB,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC"}',
);
it("actionInData", async (t) => {
  await snapshotCase(
    t,
    "actionInData",
    cs.create(
      "1es21es7404j7:15:4",
      {
        params: [
          { kind: "splice", value: [action], bindings: [] },
          { kind: "splice", value: { press: action }, bindings: [] },
        ],
      },
      "($splice0, $splice1) => {\n    const list = $splice0();\n    const map = $splice1();\n    return list.length + Object.keys(map).length;\n}",
      '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["splices/action-in-data.test.tsx"],"names":[],"mappings":"AAcO;IACD,MAAM,IAAI,GAAG,UAAC,CAAW;IACzB,MAAM,GAAG,GAAG,UAAC,CAAoB;IACjC,OAAO,IAAI,CAAC,MAAM,GAAG,MAAM,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC;AAC/C,CAAC"}',
    ),
  );
});
