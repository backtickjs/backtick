import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A script that returns a value may still run an action.
const valueScriptEffects = cs.create(
  "1zk77nyjrl50d:7:41",
  { params: [] },
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-in-value-script.test.jsx","sourceRoot":"","sources":["control-flow/action-in-value-script.test.tsx"],"names":[],"mappings":"AAM4C;IAC1C,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC"}',
);
const ping = cs.create(
  "1zk77nyjrl50d:11:33",
  { params: [] },
  "() => () => {\n    let n = 0;\n    n = 1;\n}",
  '{"version":3,"file":"action-in-value-script.test.jsx","sourceRoot":"","sources":["control-flow/action-in-value-script.test.tsx"],"names":[],"mappings":"AAUoC,MAAA,GAAG,EAAE;IACvC,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,GAAG,CAAC,CAAC;AACR,CAAC"}',
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
      "($0, $1) => (b) => {\n    let n = 0;\n    $0();\n    if (b) {\n        $1()();\n        n = 1;\n    }\n    return n;\n}",
      '{"version":3,"file":"action-in-value-script.test.jsx","sourceRoot":"","sources":["control-flow/action-in-value-script.test.tsx"],"names":[],"mappings":"AAmBO,YAAA,CAAC,CAAU,EAAE,EAAE;IAChB,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAmB,CAAC;IACpB,IAAI,CAAC,EAAE,CAAC;QACN,IAAK,EAAE,CAAC;QACR,CAAC,GAAG,CAAC,CAAC;IACR,CAAC;IACD,OAAO,CAAC,CAAC;AACX,CAAC"}',
    ),
  );
});
