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
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    "#": "value"\n});\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAOgD,OAAC;IAAE,GAAG,EAAE;CAAS,CAAC","names":[],"ignoreList":[],"sources":["objects/reserved-key-script.test.tsx"]}',
      [],
    ),
  );
});
