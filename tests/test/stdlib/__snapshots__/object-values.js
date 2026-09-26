import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object's values in key order, and whether it holds a key: the check a
// script would otherwise write as `Object.keys(o).includes(k)`.
it("objectValues", async (t) => {
  await snapshotCase(
    t,
    "objectValues",
    cs.create(
      "1lmwvcf4zc2ir:11:4",
      { params: [] },
      '() => {\n    const prices = { apple: 1, pear: 2 };\n    return {\n        values: Object.values(prices),\n        holds: [Object.hasOwn(prices, "pear"), Object.hasOwn(prices, "plum")],\n    };\n}',
      '{"version":3,"file":"object-values.test.jsx","sourceRoot":"","sources":["stdlib/object-values.test.tsx"],"names":[],"mappings":"AAUO;IACD,MAAM,MAAM,GAAG,EAAE,KAAK,EAAE,CAAC,EAAE,IAAI,EAAE,CAAC,EAAE,CAAC;IACrC,OAAO;QACL,MAAM,EAAE,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC;QAC7B,KAAK,EAAE,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,EAAE,MAAM,CAAC,EAAE,MAAM,CAAC,MAAM,CAAC,MAAM,EAAE,MAAM,CAAC,CAAC;KACtE,CAAC;AACJ,CAAC"}',
    ),
  );
});
