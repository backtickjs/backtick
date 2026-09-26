import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
it("spread", async (t) => {
  await snapshotCase(
    t,
    "spread",
    cs.create(
      "umu4jsb4aovz:12:4",
      { params: [] },
      {
        code: 'export default () => {\n  const front = [1, 2];\n  const back = [3];\n  const none = [];\n  const all = [0, ...front, ...none, ...back, 4];\n  const twice = [...all, ...all];\n  return all.join(",") + "|" + twice.length;\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,MAAMA,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;EACpB,MAAMC,IAAI,GAAG,CAAC,CAAC,CAAC;EAChB,MAAMC,IAAI,GAAa,EAAE;EACzB,MAAMC,GAAG,GAAG,CAAC,CAAC,EAAE,GAAGH,KAAK,EAAE,GAAGE,IAAI,EAAE,GAAGD,IAAI,EAAE,CAAC,CAAC;EAC9C,MAAMG,KAAK,GAAG,CAAC,GAAGD,GAAG,EAAE,GAAGA,GAAG,CAAC;EAC9B,OAAOA,GAAG,CAACE,IAAI,CAAC,GAAG,CAAC,GAAG,GAAG,GAAGD,KAAK,CAACE,MAAM;AAC3C,CAAC","names":["front","back","none","all","twice","join","length"],"ignoreList":[],"sources":["spread.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
