import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create(
  "3q2gz79xhvvfp:8:30",
  { params: [] },
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-composition.test.jsx","sourceRoot":"","sources":["control-flow/action-composition.test.tsx"],"names":[],"mappings":"AAOiC;IAC/B,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC"}',
);
const composed = cs.create(
  "3q2gz79xhvvfp:12:31",
  { params: [{ kind: "splice", value: effects, bindings: [] }] },
  "($0) => {\n    $0();\n}",
  '{"version":3,"file":"action-composition.test.jsx","sourceRoot":"","sources":["control-flow/action-composition.test.tsx"],"names":[],"mappings":"AAWkC;IAChC,IAAQ,CAAC;AACX,CAAC"}',
);
it("actionComposition", async (t) => {
  await snapshotCase(
    t,
    "actionComposition",
    cs.create(
      "3q2gz79xhvvfp:20:4",
      { params: [{ kind: "splice", value: composed, bindings: [] }] },
      "($0) => {\n    $0();\n}",
      '{"version":3,"file":"action-composition.test.jsx","sourceRoot":"","sources":["control-flow/action-composition.test.tsx"],"names":[],"mappings":"AAmBO;IACD,IAAS,CAAC;AACZ,CAAC"}',
    ),
  );
});
