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
        code: 'export default () => {\n  const message = "boom";\n  try {\n    throw message;\n  } catch (error) {\n    if (error === message) {\n      return "caught boom";\n    }\n    return "caught something else";\n  }\n};',
        map: '{"version":3,"mappings":"eAQO;EACD,MAAMA,OAAO,GAAG,MAAM;EACtB,IAAI;IACF,MAAMA,OAAO;EACf,CAAC,CAAC,OAAOC,KAAK,EAAE;IACd,IAAIA,KAAK,KAAKD,OAAO,EAAE;MACrB,OAAO,aAAa;IACtB;IACA,OAAO,uBAAuB;EAChC;AACF,CAAC","names":["message","error"],"ignoreList":[],"sources":["try-catch.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
