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
        code: 'export default () => ({ "#": "value" });',
        map: '{"version":3,"file":"reserved-key-script.test.jsx","sourceRoot":"","sources":["reserved-key-script.test.tsx"],"names":[],"mappings":"eAOgD,MAAA,CAAC,EAAE,GAAG,EAAE,OAAO,EAAE,CAAC"}',
      },
    ),
  );
});
