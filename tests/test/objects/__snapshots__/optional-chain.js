import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  "2dtorvijco8u0:8:13",
  { params: [] },
  "() => (p) => {\n    return p?.x;\n}",
  '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"AAOgB,MAAA,CAAC,CAAuB,EAAE,EAAE;IAC1C,OAAO,CAAC,EAAE,CAAC,CAAC;AACd,CAAC"}',
);
const deep = cs.create(
  "2dtorvijco8u0:12:13",
  { params: [] },
  "() => (o) => {\n    return o?.inner?.z;\n}",
  '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"AAWgB,MAAA,CAAC,CAAyC,EAAE,EAAE;IAC5D,OAAO,CAAC,EAAE,KAAK,EAAE,CAAC,CAAC;AACrB,CAAC"}',
);
const shout = cs.create(
  "2dtorvijco8u0:16:14",
  { params: [] },
  '() => (s) => {\n    return s?.concat("!");\n}',
  '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"AAeiB,MAAA,CAAC,CAAgB,EAAE,EAAE;IACpC,OAAO,CAAC,EAAE,MAAM,CAAC,GAAG,CAAC,CAAC;AACxB,CAAC"}',
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
      '($splice0, $splice1, $splice2) => ({\n    found: $splice0()({ x: 5 }),\n    missing: $splice0()(null),\n    deep: $splice1()({ inner: { z: 7 } }),\n    cut: $splice1()({ inner: null }),\n    top: $splice1()(null),\n    loud: $splice2()("hi"),\n    silent: $splice2()(null),\n})',
      '{"version":3,"file":"optional-chain.test.jsx","sourceRoot":"","sources":["objects/optional-chain.test.tsx"],"names":[],"mappings":"AAuBO,kCAAA,CAAC;IACF,KAAK,EAAE,UAAK,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACtB,OAAO,EAAE,UAAK,CAAC,IAAI,CAAC;IACpB,IAAI,EAAE,UAAK,CAAC,EAAE,KAAK,EAAE,EAAE,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC;IAChC,GAAG,EAAE,UAAK,CAAC,EAAE,KAAK,EAAE,IAAI,EAAE,CAAC;IAC3B,GAAG,EAAE,UAAK,CAAC,IAAI,CAAC;IAChB,IAAI,EAAE,UAAM,CAAC,IAAI,CAAC;IAClB,MAAM,EAAE,UAAM,CAAC,IAAI,CAAC;CACrB,CAAC"}',
    ),
  );
});
