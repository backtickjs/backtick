import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("arrow", async (t) => {
  await snapshotCase(
    t,
    "arrow",
    cs.create(
      "1qw9q1toh3rnd:9:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const base = 10;\n    return (one, two) => one + two + base;\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAQO;IACD,MAAMA,IAAI,GAAG,EAAE;IACf,OAAO,CAACC,GAAW,EAAEC,GAAW,KAAKD,GAAG,GAAGC,GAAG,GAAGF,IAAI;AACvD,CAAC","names":["base","one","two"],"ignoreList":[],"sources":["expressions/arrow.test.tsx"]}',
      [],
    ),
  );
});
