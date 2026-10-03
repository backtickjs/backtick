import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$splice0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
  return cs.create(
    "3jzoitmu8iit8:13:9",
    { params: [{ kind: "splice", value: fragment, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => flag => {\n    if (flag) {\n        return $splice0();\n    }\n    return "skipped";\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBAYYA,QAAA,IAACC,IAAa;IACtB,IAAIA,IAAI,EAAE;QACR,OAAOD,QAAA,EAAS;IAClB;IACA,OAAO,SAAS;AAClB,CAAC","names":["$splice0","flag"],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
    [],
  );
}
const ok = cs.create(
  "3jzoitmu8iit8:21:11",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "evaluated";\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAoBc,iBAAW","names":[],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
  [],
);
const broken = cs.create(
  "3jzoitmu8iit8:23:15",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    throw "the guarded fragment must never evaluate";\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAsBkB;IAChB,MAAM,0CAA0C;AAClD,CAAC","names":[],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
  [],
);
it("spliceLaziness", async (t) => {
  await snapshotCase(
    t,
    "spliceLaziness",
    cs.create(
      "3jzoitmu8iit8:31:4",
      {
        params: [
          { kind: "splice", value: guard(ok), bindings: [] },
          { kind: "splice", value: guard(broken), bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    taken: $splice0()(true),\n    skipped: $splice1()(false)\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBA8BO,CAAAA,QAAA,EAAAC,QAAA,MAAC;IACFC,KAAK,EAAEF,QAAA,EAAY,CAAC,IAAI,CAAC;IACzBG,OAAO,EAAEF,QAAA,EAAgB,CAAC,KAAK;CAChC,CAAC","names":["$splice0","$splice1","taken","skipped"],"ignoreList":[],"sources":["splices/splice-laziness.test.tsx"]}',
      [],
    ),
  );
});
