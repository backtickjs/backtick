import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
  return cs.create(
    "3cvzb2rrvx0i4:13:9",
    { params: [{ kind: "splice", value: fragment, bindings: [] }] },
    {
      code: 'export default $0 => flag => {\n  if (flag) {\n    return $0();\n  }\n  return "skipped";\n};',
      map: '{"version":3,"mappings":"eAYYA,EAAA,IAACC,IAAa,IAAI;EAC1B,IAAIA,IAAI,EAAE;IACR,OAAOD,EAAA,EAAS;EAClB;EACA,OAAO,SAAS;AAClB,CAAC","names":["$0","flag"],"ignoreList":[],"sources":["splice-laziness.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
  );
}
const ok = cs.create(
  "3cvzb2rrvx0i4:21:11",
  { params: [] },
  {
    code: 'export default () => "evaluated";',
    map: '{"version":3,"mappings":"eAoBc,iBAAW","names":[],"ignoreList":[],"sources":["splice-laziness.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const broken = cs.create(
  "3cvzb2rrvx0i4:23:15",
  { params: [] },
  {
    code: 'export default () => {\n  throw "the guarded fragment must never evaluate";\n};',
    map: '{"version":3,"mappings":"eAsBkB;EAChB,MAAM,0CAA0C;AAClD,CAAC","names":[],"ignoreList":[],"sources":["splice-laziness.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("spliceLaziness", async (t) => {
  await snapshotCase(
    t,
    "spliceLaziness",
    cs.create(
      "3cvzb2rrvx0i4:31:4",
      {
        params: [
          { kind: "splice", value: guard(ok), bindings: [] },
          { kind: "splice", value: guard(broken), bindings: [] },
        ],
      },
      {
        code: "export default ($0, $1) => ({\n  taken: $0()(true),\n  skipped: $1()(false)\n});",
        map: '{"version":3,"mappings":"eA8BO,CAAAA,EAAA,EAAAC,EAAA,MAAC;EACFC,KAAK,EAAEF,EAAA,EAAC,CAAY,IAAI,CAAC;EACzBG,OAAO,EAAEF,EAAA,EAAC,CAAgB,KAAK;CAChC,CAAC","names":["$0","$1","taken","skipped"],"ignoreList":[],"sources":["splice-laziness.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
