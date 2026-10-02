import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("constant", async (t) => {
  await snapshotCase(
    t,
    "constant",
    cs.create(
      "1e4ingeabxazf:6:36",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAKuC,OAAC","names":[],"ignoreList":[],"sources":["expressions/constant.test.tsx"]}',
      [],
    ),
  );
});
