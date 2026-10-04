import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3s3xo1kodgmhm:9:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const message = "boom";\n    try {\n        throw message;\n    }\n    catch (error) {\n        if (error === message) {\n            return "caught boom";\n        }\n        return "caught something else";\n    }\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQO;IACD,MAAMA,OAAO,GAAG,MAAM;IACtB,IAAI;QACF,MAAMA,OAAO;IACf,CAAC;IAAC,OAAOC,KAAK,EAAE;QACd,IAAIA,KAAK,KAAKD,OAAO,EAAE;YACrB,OAAO,aAAa;QACtB;QACA,OAAO,uBAAuB;IAChC;AACF,CAAC","names":["message","error"],"ignoreList":[],"sources":["control-flow/try-catch.test.tsx"]}',
  dependencies: [],
};
it("tryCatch", async (t) => {
  await snapshotCase(t, "tryCatch", cs.create($module0, []));
});
