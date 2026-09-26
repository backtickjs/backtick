import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("tryCatch", async (t) => {
  await snapshotCase(
    t,
    "tryCatch",
    cs.create(
      "3s3xo1kodgmhm:9:4",
      { params: [] },
      {
        code: 'export default () => {\n    const message = "boom";\n    try {\n        throw message;\n    }\n    catch (error) {\n        if (error === message) {\n            return "caught boom";\n        }\n        return "caught something else";\n    }\n};',
        map: '{"version":3,"file":"try-catch.test.jsx","sourceRoot":"","sources":["try-catch.test.tsx"],"names":[],"mappings":"eAQO;IACD,MAAM,OAAO,GAAG,MAAM,CAAC;IACvB,IAAI,CAAC;QACH,MAAM,OAAO,CAAC;IAChB,CAAC;IAAC,OAAO,KAAK,EAAE,CAAC;QACf,IAAI,KAAK,KAAK,OAAO,EAAE,CAAC;YACtB,OAAO,aAAa,CAAC;QACvB,CAAC;QACD,OAAO,uBAAuB,CAAC;IACjC,CAAC;AACH,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
