import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "25lflsbo2zrha:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const coins = [1, 2, 3, 4];\n    return {\n        at: [coins.at(0), coins.at(-1), coins.at(9)],\n        every: coins.every(n => n > 0),\n        some: coins.some(n => n > 3),\n        findLast: coins.findLast(n => n < 3),\n        findLastIndex: coins.findLastIndex(n => n < 3),\n        flatMap: coins.flatMap(n => [n, n * 10]),\n        reduceRight: coins.reduceRight((text, n) => text + n, ""),\n        unchanged: coins\n    };\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,MAAMA,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IAC1B,OAAO;QACLC,EAAE,EAAE,CAACD,KAAK,CAACC,EAAE,CAAC,CAAC,CAAC,EAAED,KAAK,CAACC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAED,KAAK,CAACC,EAAE,CAAC,CAAC,CAAC,CAAC;QAC5CC,KAAK,EAAEF,KAAK,CAACE,KAAK,CAAEC,CAAC,IAAKA,CAAC,GAAG,CAAC,CAAC;QAChCC,IAAI,EAAEJ,KAAK,CAACI,IAAI,CAAED,CAAC,IAAKA,CAAC,GAAG,CAAC,CAAC;QAC9BE,QAAQ,EAAEL,KAAK,CAACK,QAAQ,CAAEF,CAAC,IAAKA,CAAC,GAAG,CAAC,CAAC;QACtCG,aAAa,EAAEN,KAAK,CAACM,aAAa,CAAEH,CAAC,IAAKA,CAAC,GAAG,CAAC,CAAC;QAChDI,OAAO,EAAEP,KAAK,CAACO,OAAO,CAAEJ,CAAC,IAAK,CAACA,CAAC,EAAEA,CAAC,GAAG,EAAE,CAAC,CAAC;QAC1CK,WAAW,EAAER,KAAK,CAACQ,WAAW,CAAC,CAACC,IAAI,EAAEN,CAAC,KAAKM,IAAI,GAAGN,CAAC,EAAE,EAAE,CAAC;QACzDO,SAAS,EAAEV;KACZ;AACH,CAAC","names":["coins","at","every","n","some","findLast","findLastIndex","flatMap","reduceRight","text","unchanged"],"ignoreList":[],"sources":["stdlib/array-queries.test.tsx"]}',
  dependencies: [],
  params: [],
};
// Array members that answer a question about an array or build a new one,
// leaving it as it was. `reduceRight` takes its starting value, as `reduce`
// does.
it("arrayQueries", async (t) => {
  await snapshotCase(t, "arrayQueries", cs.create($module0, []));
});
