import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash = cs.create(
  "2nnj6ebvkk8vj:7:57",
  { params: [] },
  '() => (value) => {\n    if (value === null) {\n        return "-";\n    }\n    return value;\n}',
  '{"version":3,"file":"null-literal.test.jsx","sourceRoot":"","sources":["expressions/null-literal.test.tsx"],"names":[],"mappings":"AAM4D,MAAA,CAC1D,KAAoB,EACpB,EAAE;IACF,IAAI,KAAK,KAAK,IAAI,EAAE,CAAC;QACnB,OAAO,GAAG,CAAC;IACb,CAAC;IACD,OAAO,KAAK,CAAC;AACf,CAAC"}',
);
it("nullLiteral", async (t) => {
  await snapshotCase(
    t,
    "nullLiteral",
    cs.create(
      "2nnj6ebvkk8vj:20:4",
      { params: [{ kind: "splice", value: orDash, bindings: [] }] },
      '($0) => ({\n    missing: $0()(null),\n    present: $0()("hi"),\n    bare: null,\n})',
      '{"version":3,"file":"null-literal.test.jsx","sourceRoot":"","sources":["expressions/null-literal.test.tsx"],"names":[],"mappings":"AAmBO,QAAA,CAAC;IACF,OAAO,EAAE,IAAO,CAAC,IAAI,CAAC;IACtB,OAAO,EAAE,IAAO,CAAC,IAAI,CAAC;IACtB,IAAI,EAAE,IAAI;CACX,CAAC"}',
    ),
  );
});
