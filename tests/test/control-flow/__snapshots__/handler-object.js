import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  "1dqhax1do6u08:8:27",
  { params: [] },
  "() => {\n    let n = 0;\n    n = 1;\n}",
  '{"version":3,"file":"handler-object.test.jsx","sourceRoot":"","sources":["control-flow/handler-object.test.tsx"],"names":[],"mappings":"AAO8B;IAC5B,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,GAAG,CAAC,CAAC;AACR,CAAC"}',
);
const onTap = cs.create(
  "1dqhax1do6u08:13:44",
  { params: [{ kind: "splice", value: beep, bindings: [] }] },
  "($0) => (id) => {\n    $0();\n}",
  '{"version":3,"file":"handler-object.test.jsx","sourceRoot":"","sources":["control-flow/handler-object.test.tsx"],"names":[],"mappings":"AAY+C,QAAA,CAAC,EAAU,EAAE,EAAE;IAC5D,IAAK,CAAC;AACR,CAAC"}',
);
it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.create(
      "1dqhax1do6u08:21:4",
      { params: [{ kind: "splice", value: onTap, bindings: [] }] },
      "($0) => {\n    const handlers = {\n        tap: $0(),\n        hold: $0(),\n    };\n    return handlers;\n}",
      '{"version":3,"file":"handler-object.test.jsx","sourceRoot":"","sources":["control-flow/handler-object.test.tsx"],"names":[],"mappings":"AAoBO;IACD,MAAM,QAAQ,GAAG;QACf,GAAG,EAAE,IAAM;QACX,IAAI,EAAE,IAAM;KACb,CAAC;IACF,OAAO,QAAQ,CAAC;AAClB,CAAC"}',
    ),
  );
});
