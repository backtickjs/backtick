import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where a spread and a pair holding `...` sit in the
// same list. A pair is an array of its own, so its `...` is only a string.
it("objectDotsKey", async (t) => {
  await snapshotCase(
    t,
    "objectDotsKey",
    cs.create(
      "13e6vrhonm3wb:12:4",
      { params: [] },
      '() => {\n    const base = { a: 1 };\n    return { ...base, "...": 2 };\n}',
      '{"version":3,"file":"object-dots-key.test.jsx","sourceRoot":"","sources":["objects/object-dots-key.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACtB,OAAO,EAAE,GAAG,IAAI,EAAE,KAAK,EAAE,CAAC,EAAE,CAAC;AAC/B,CAAC"}',
    ),
  );
});
