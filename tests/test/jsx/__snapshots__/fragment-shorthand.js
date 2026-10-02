import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `<>…</>` in a script is Solid's fragment: its children where it stands, and no
// node of its own. Solid takes one only at the top of an expression, so a child
// that is one is written in braces.
it("fragmentShorthand", async (t) => {
  await snapshotCase(
    t,
    "fragmentShorthand",
    cs.create(
      "17cnce59u5ivv:12:4",
      { params: [] },
      "() => <div>\n      {<>\n          <span>a</span>\n          <span>b</span>\n        </>}\n    </div>",
      '{"version":3,"file":"fragment-shorthand.test.jsx","sourceRoot":"","sources":["jsx/fragment-shorthand.test.tsx"],"names":[],"mappings":"AAWO,MAAA,CAAC,GAAG,CACL;MAAA,CACE,EACE;UAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACb;UAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CACf;QAAA,GACF,CACF;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
