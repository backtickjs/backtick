import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("coreComponents", async (t) => {
  await snapshotCase(
    t,
    "coreComponents",
    cs.create(
      "3l2na8sxw8878:9:4",
      { params: [] },
      '() => <div style="padding: 8px">\n      <span style="font-size: 12px" onclick={() => { }}>\n        hi\n      </span>\n      <img src="https://example.com/a.png"/>\n    </div>',
      '{"version":3,"file":"core-components.test.jsx","sourceRoot":"","sources":["components/core-components.test.tsx"],"names":[],"mappings":"AAQO,MAAA,CAAC,GAAG,CAAC,KAAK,CAAC,cAAc,CAC1B;MAAA,CAAC,IAAI,CAAC,KAAK,CAAC,iBAAiB,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,CAC9C;;MACF,EAAE,IAAI,CACN;MAAA,CAAC,GAAG,CAAC,GAAG,CAAC,2BAA2B,EACtC;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
