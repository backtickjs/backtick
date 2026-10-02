import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
it("comments", async (t) => {
  await snapshotCase(
    t,
    "comments",
    cs.create(
      "3lcac8ezsyzi3:11:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const count = 1;\n    if (count === 1) {\n        return "one";\n    }\n    return "many";\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IAED,MAAMA,KAAK,GAAG,CAAC;IAEf,IAAIA,KAAK,KAAK,CAAC,EAAE;QAEf,OAAO,KAAK;IACd;IAIA,OAAO,MAAM;AACf,CAAC","names":["count"],"ignoreList":[],"sources":["expressions/comments.test.tsx"]}',
      [],
    ),
  );
});
