import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A spread in an object literal, which the format cannot ship as the data it
// spells: an object in a value slot *is* its own keys and none of them is
// reserved, so there is nowhere to write "and every key of that one". A
// literal a spread runs through is `Object.fromEntries` over its pairs
// instead, the spread being `Object.entries` of what it spreads; a literal
// without one is data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
it("objectSpread", async (t) => {
  await snapshotCase(
    t,
    "objectSpread",
    cs.create(
      "31uvwz3g4bdt1:17:4",
      { params: [] },
      {
        code: "export default () => {\n  const base = {\n    a: 1,\n    b: 2\n  };\n  const over = {\n    b: 9\n  };\n  return {\n    ...base,\n    ...over,\n    c: 3\n  };\n};",
        map: '{"version":3,"mappings":"eAgBO;EACD,MAAMA,IAAI,GAAG;IAAEC,CAAC,EAAE,CAAC;IAAEC,CAAC,EAAE;EAAC,CAAE;EAC3B,MAAMC,IAAI,GAAG;IAAED,CAAC,EAAE;EAAC,CAAE;EACrB,OAAO;IACL,GAAGF,IAAI;IACP,GAAGG,IAAI;IACPC,CAAC,EAAE;GACJ;AACH,CAAC","names":["base","a","b","over","c"],"ignoreList":[],"sources":["object-spread.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
