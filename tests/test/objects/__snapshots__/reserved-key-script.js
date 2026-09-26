import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
it("reservedKeyScript", async (t) => {
  await snapshotCase(
    t,
    "reservedKeyScript",
    cs.create(
      "28g09xvp2p10c:8:45",
      { params: [] },
      {
        code: 'export default () => ({\n  "#": "value"\n});',
        map: '{"version":3,"mappings":"eAOgD,OAAC;EAAE,GAAG,EAAE;AAAO,CAAE,CAAC","names":[],"ignoreList":[],"sources":["reserved-key-script.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
