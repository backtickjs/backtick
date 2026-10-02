import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Where the two rules part company, pinned so a client implementer can see
// it: `names[9]` types as `string`, because TypeScript's indexed access says
// the element type, and reads as `undefined`, because the runtime read is total.
// Nothing faults; the type simply doesn't mention the floor under it.
it("indexPastEnd", async (t) => {
  await snapshotCase(
    t,
    "indexPastEnd",
    cs.create(
      "3821as72cvvin:13:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const names = ["zero", "one"];\n    return names[9];\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAYO;IACD,MAAMA,KAAK,GAAG,CAAC,MAAM,EAAE,KAAK,CAAC;IAC7B,OAAOA,KAAK,CAAC,CAAC,CAAC;AACjB,CAAC","names":["names"],"ignoreList":[],"sources":["objects/index-past-end.test.tsx"]}',
      [],
    ),
  );
});
