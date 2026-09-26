import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` marks an optional parameter: a caller may omit it or pass `undefined`,
// and either way it binds `undefined`. `null` is a value of its own and not
// accepted here.
const greet = cs.create(
  "1i6s8vesd5nbi:8:14",
  { params: [] },
  {
    code: 'export default () => name => {\n  return name?.concat("!");\n};',
    map: '{"version":3,"mappings":"eAOiB,MAACA,IAAa,IAAI;EACjC,OAAOA,IAAI,EAAEC,MAAM,CAAC,GAAG,CAAC;AAC1B,CAAC","names":["name","concat"],"ignoreList":[],"sources":["optional-parameter.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs.create(
  "1i6s8vesd5nbi:14:15",
  { params: [] },
  {
    code: "export default () => () => 2;",
    map: '{"version":3,"mappings":"eAakB,YAAM,CAAC","names":[],"ignoreList":[],"sources":["optional-parameter.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const callIfGiven = cs.create(
  "1i6s8vesd5nbi:16:20",
  { params: [] },
  {
    code: "export default () => cb => {\n  return cb?.() ?? 0;\n};",
    map: '{"version":3,"mappings":"eAeuB,MAACA,EAAiB,IAAI;EAC3C,OAAOA,EAAE,GAAE,CAAE,IAAI,CAAC;AACpB,CAAC","names":["cb"],"ignoreList":[],"sources":["optional-parameter.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs.create(
      "1i6s8vesd5nbi:24:4",
      {
        params: [
          { kind: "splice", value: greet, bindings: [] },
          { kind: "splice", value: callIfGiven, bindings: [] },
          { kind: "splice", value: double, bindings: [] },
        ],
      },
      {
        code: 'export default ($0, $1, $2) => ({\n  named: $0()("hi"),\n  explicit: $0()(undefined),\n  omitted: $0()(),\n  supplied: $1()($2()),\n  fallback: $1()(undefined),\n  omittedCallback: $1()()\n});',
        map: '{"version":3,"mappings":"eAuBO,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,MAAC;EACFC,KAAK,EAAEH,EAAA,EAAM,CAAC,IAAI,CAAC;EACnBI,QAAQ,EAAEJ,EAAA,EAAM,CAACK,SAAS,CAAC;EAC3BC,OAAO,EAAEN,EAAA,EAAM,EAAE;EACjBO,QAAQ,EAAEN,EAAA,EAAY,CAACC,EAAA,EAAO,CAAC;EAC/BM,QAAQ,EAAEP,EAAA,EAAY,CAACI,SAAS,CAAC;EACjCI,eAAe,EAAER,EAAA,EAAY;CAC9B,CAAC","names":["$0","$1","$2","named","explicit","undefined","omitted","supplied","fallback","omittedCallback"],"ignoreList":[],"sources":["optional-parameter.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
