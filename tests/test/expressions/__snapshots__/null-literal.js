import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash = cs.create(
  "2nnj6ebvkk8vj:7:57",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => value => {\n    if (value === null) {\n        return "-";\n    }\n    return value;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAM4D,MAC1DA,KAAoB;IAEpB,IAAIA,KAAK,KAAK,IAAI,EAAE;QAClB,OAAO,GAAG;IACZ;IACA,OAAOA,KAAK;AACd,CAAC","names":["value"],"ignoreList":[],"sources":["expressions/null-literal.test.tsx"]}',
  [],
);
it("nullLiteral", async (t) => {
  await snapshotCase(
    t,
    "nullLiteral",
    cs.create(
      "2nnj6ebvkk8vj:20:4",
      { params: [{ kind: "splice", value: orDash, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    missing: $splice0()(null),\n    present: $splice0()("hi"),\n    bare: null\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAmBOA,QAAA,KAAC;IACFC,OAAO,EAAED,QAAA,EAAO,CAAC,IAAI,CAAC;IACtBE,OAAO,EAAEF,QAAA,EAAO,CAAC,IAAI,CAAC;IACtBG,IAAI,EAAE;CACP,CAAC","names":["$splice0","missing","present","bare"],"ignoreList":[],"sources":["expressions/null-literal.test.tsx"]}',
      [],
    ),
  );
});
