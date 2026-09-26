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
      {
        code: 'export default () => {\n  const base = {\n    a: 1\n  };\n  return {\n    ...base,\n    "...": 2\n  };\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,MAAMA,IAAI,GAAG;IAAEC,CAAC,EAAE;EAAC,CAAE;EACrB,OAAO;IAAE,GAAGD,IAAI;IAAE,KAAK,EAAE;EAAC,CAAE;AAC9B,CAAC","names":["base","a"],"ignoreList":[],"sources":["object-dots-key.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
