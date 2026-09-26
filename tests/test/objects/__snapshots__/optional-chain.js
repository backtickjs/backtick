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
    code: "export default () => (p) => {\n    return p?.x;\n};",
    map: '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"eAOgB,MAAA,CAAC,CAAuB,EAAE,EAAE;IAC1C,OAAO,CAAC,EAAE,CAAC,CAAC;AACd,CAAC"}',
  },
);
const deep = cs.create(
  "2dtorvijco8u0:12:13",
  { params: [] },
  {
    code: "export default () => (o) => {\n    return o?.inner?.z;\n};",
    map: '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"eAWgB,MAAA,CAAC,CAAyC,EAAE,EAAE;IAC5D,OAAO,CAAC,EAAE,KAAK,EAAE,CAAC,CAAC;AACrB,CAAC"}',
  },
);
const shout = cs.create(
  "2dtorvijco8u0:16:14",
  { params: [] },
  {
    code: 'export default () => (s) => {\n    return s?.concat("!");\n};',
    map: '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"eAeiB,MAAA,CAAC,CAAgB,EAAE,EAAE;IACpC,OAAO,CAAC,EAAE,MAAM,CAAC,GAAG,CAAC,CAAC;AACxB,CAAC"}',
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
        code: 'export default ($0, $1, $2) => ({\n    found: $0()({ x: 5 }),\n    missing: $0()(null),\n    deep: $1()({ inner: { z: 7 } }),\n    cut: $1()({ inner: null }),\n    top: $1()(null),\n    loud: $2()("hi"),\n    silent: $2()(null),\n});',
        map: '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"eAuBO,gBAAA,CAAC;IACF,KAAK,EAAE,IAAK,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACtB,OAAO,EAAE,IAAK,CAAC,IAAI,CAAC;IACpB,IAAI,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,EAAE,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC;IAChC,GAAG,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,IAAI,EAAE,CAAC;IAC3B,GAAG,EAAE,IAAK,CAAC,IAAI,CAAC;IAChB,IAAI,EAAE,IAAM,CAAC,IAAI,CAAC;IAClB,MAAM,EAAE,IAAM,CAAC,IAAI,CAAC;CACrB,CAAC"}',
      },
    ),
  );
});
