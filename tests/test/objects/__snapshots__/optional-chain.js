import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  "2dtorvijco8u0:8:13",
  { params: [] },
  {
    code: "export default () => p => {\n  return p?.x;\n};",
    map: '{"version":3,"mappings":"eAOgB,MAACA,CAAuB,IAAI;EAC1C,OAAOA,CAAC,EAAEC,CAAC;AACb,CAAC","names":["p","x"],"ignoreList":[],"sources":["optional-chain.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const deep = cs.create(
  "2dtorvijco8u0:12:13",
  { params: [] },
  {
    code: "export default () => o => {\n  return o?.inner?.z;\n};",
    map: '{"version":3,"mappings":"eAWgB,MAACA,CAAyC,IAAI;EAC5D,OAAOA,CAAC,EAAEC,KAAK,EAAEC,CAAC;AACpB,CAAC","names":["o","inner","z"],"ignoreList":[],"sources":["optional-chain.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const shout = cs.create(
  "2dtorvijco8u0:16:14",
  { params: [] },
  {
    code: 'export default () => s => {\n  return s?.concat("!");\n};',
    map: '{"version":3,"mappings":"eAeiB,MAACA,CAAgB,IAAI;EACpC,OAAOA,CAAC,EAAEC,MAAM,CAAC,GAAG,CAAC;AACvB,CAAC","names":["s","concat"],"ignoreList":[],"sources":["optional-chain.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("optionalChain", async (t) => {
  await snapshotCase(
    t,
    "optionalChain",
    cs.create(
      "2dtorvijco8u0:24:4",
      {
        params: [
          { kind: "splice", value: pick, bindings: [] },
          { kind: "splice", value: deep, bindings: [] },
          { kind: "splice", value: shout, bindings: [] },
        ],
      },
      {
        code: 'export default ($0, $1, $2) => ({\n  found: $0()({\n    x: 5\n  }),\n  missing: $0()(null),\n  deep: $1()({\n    inner: {\n      z: 7\n    }\n  }),\n  cut: $1()({\n    inner: null\n  }),\n  top: $1()(null),\n  loud: $2()("hi"),\n  silent: $2()(null)\n});',
        map: '{"version":3,"mappings":"eAuBO,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,MAAC;EACFC,KAAK,EAAEH,EAAA,EAAK,CAAC;IAAEI,CAAC,EAAE;EAAC,CAAE,CAAC;EACtBC,OAAO,EAAEL,EAAA,EAAK,CAAC,IAAI,CAAC;EACpBM,IAAI,EAAEL,EAAA,EAAK,CAAC;IAAEM,KAAK,EAAE;MAAEC,CAAC,EAAE;IAAC;EAAE,CAAE,CAAC;EAChCC,GAAG,EAAER,EAAA,EAAK,CAAC;IAAEM,KAAK,EAAE;EAAI,CAAE,CAAC;EAC3BG,GAAG,EAAET,EAAA,EAAK,CAAC,IAAI,CAAC;EAChBU,IAAI,EAAET,EAAA,EAAM,CAAC,IAAI,CAAC;EAClBU,MAAM,EAAEV,EAAA,EAAM,CAAC,IAAI;CACpB,CAAC","names":["$0","$1","$2","found","x","missing","deep","inner","z","cut","top","loud","silent"],"ignoreList":[],"sources":["optional-chain.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
