import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tree with only static props: one script, nothing spliced into it, and the
// nested element written in place.
it("jsxStatic", async (t) => {
  await snapshotCase(
    t,
    "jsxStatic",
    cs.create(
      "3x1f5ri4d7p5:11:4",
      { params: [] },
      "() => <div>\n      <span>hi</span>\n    </div>",
      '{"version":3,"file":"jsx-static.test.jsx","sourceRoot":"","sources":["jsx/jsx-static.test.tsx"],"names":[],"mappings":"AAUO,MAAA,CAAC,GAAG,CACL;MAAA,CAAC,IAAI,CAAC,EAAE,EAAE,IAAI,CAChB;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
