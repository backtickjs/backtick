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
      {
        code: "export default () => {\n  const base = 10;\n  return (one, two) => one + two + base;\n};",
        map: '{"version":3,"mappings":"eAQO;EACD,MAAMA,IAAI,GAAG,EAAE;EACf,OAAO,CAACC,GAAW,EAAEC,GAAW,KAAKD,GAAG,GAAGC,GAAG,GAAGF,IAAI;AACvD,CAAC","names":["base","one","two"],"ignoreList":[],"sources":["arrow.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
