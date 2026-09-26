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
    '($splice0) => (flag) => {\n    if (flag) {\n        return $splice0();\n    }\n    return "skipped";\n}',
    '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splices/splice-laziness.test.tsx"],"names":[],"mappings":"AAYY,cAAA,CAAC,IAAa,EAAE,EAAE;IAC1B,IAAI,IAAI,EAAE,CAAC;QACT,OAAO,UAAS,CAAC;IACnB,CAAC;IACD,OAAO,SAAS,CAAC;AACnB,CAAC"}',
  );
}
const ok = cs.create(
  "3jzoitmu8iit8:21:11",
  { params: [] },
  '() => "evaluated"',
  '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splices/splice-laziness.test.tsx"],"names":[],"mappings":"AAoBc,MAAA,WAAW"}',
);
const broken = cs.create(
  "3jzoitmu8iit8:23:15",
  { params: [] },
  '() => {\n    throw "the guarded fragment must never evaluate";\n}',
  '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splices/splice-laziness.test.tsx"],"names":[],"mappings":"AAsBkB;IAChB,MAAM,0CAA0C,CAAC;AACnD,CAAC"}',
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
      "($splice0, $splice1) => ({\n    taken: $splice0()(true),\n    skipped: $splice1()(false),\n})",
      '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splices/splice-laziness.test.tsx"],"names":[],"mappings":"AA8BO,wBAAA,CAAC;IACF,KAAK,EAAE,UAAC,CAAY,IAAI,CAAC;IACzB,OAAO,EAAE,UAAC,CAAgB,KAAK,CAAC;CACjC,CAAC"}',
    ),
  );
});
