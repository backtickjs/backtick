import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A record read as pairs and built back from them: how a script makes a
// record whose keys it only learns when it runs.
it("objectEntries", async (t) => {
  await snapshotCase(
    t,
    "objectEntries",
    cs.create(
      "txb5yf5uyd2o:11:4",
      { params: [] },
      '() => {\n    const held = { n: 1, q: "ada" };\n    const written = Object.fromEntries(Object.entries(held).map((pair) => [pair[0], JSON.stringify(pair[1])]));\n    return written.n + " " + written.q;\n}',
      '{"version":3,"file":"object-entries.test.jsx","sourceRoot":"","sources":["stdlib/object-entries.test.tsx"],"names":[],"mappings":"AAUO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,KAAK,EAAE,CAAC;IAChC,MAAM,OAAO,GAAG,MAAM,CAAC,WAAW,CAChC,MAAM,CAAC,OAAO,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACvE,CAAC;IACF,OAAO,OAAO,CAAC,CAAC,GAAG,GAAG,GAAG,OAAO,CAAC,CAAC,CAAC;AACrC,CAAC"}',
    ),
  );
});
