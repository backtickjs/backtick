import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "139y0n5fpgs82:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const coins = [1, 2, 3];\n    const four = 4;\n    return {\n        count: coins.length,\n        all: coins.concat([four]),\n        part: coins.slice(0, 2),\n        where: coins.indexOf(2),\n        lastWhere: coins.concat([2]).lastIndexOf(2),\n        has: coins.includes(3),\n        text: coins.join("-"),\n        doubled: coins.map(n => n * 2),\n        small: coins.filter(n => n < 3)\n    };\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,MAAMA,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACvB,MAAMC,IAAI,GAAG,CAAC;IACd,OAAO;QACLC,KAAK,EAAEF,KAAK,CAACG,MAAM;QACnBC,GAAG,EAAEJ,KAAK,CAACK,MAAM,CAAC,CAACJ,IAAI,CAAC,CAAC;QACzBK,IAAI,EAAEN,KAAK,CAACO,KAAK,CAAC,CAAC,EAAE,CAAC,CAAC;QACvBC,KAAK,EAAER,KAAK,CAACS,OAAO,CAAC,CAAC,CAAC;QACvBC,SAAS,EAAEV,KAAK,CAACK,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,CAACM,WAAW,CAAC,CAAC,CAAC;QAC3CC,GAAG,EAAEZ,KAAK,CAACa,QAAQ,CAAC,CAAC,CAAC;QACtBC,IAAI,EAAEd,KAAK,CAACe,IAAI,CAAC,GAAG,CAAC;QACrBC,OAAO,EAAEhB,KAAK,CAACiB,GAAG,CAAEC,CAAC,IAAKA,CAAC,GAAG,CAAC,CAAC;QAChCC,KAAK,EAAEnB,KAAK,CAACoB,MAAM,CAAEF,CAAC,IAAKA,CAAC,GAAG,CAAC;KACjC;AACH,CAAC","names":["coins","four","count","length","all","concat","part","slice","where","indexOf","lastWhere","lastIndexOf","has","includes","text","join","doubled","map","n","small","filter"],"ignoreList":[],"sources":["stdlib/array-members.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
it("arrayMembers", async (t) => {
  await snapshotCase(t, "arrayMembers", cs.create($module0, []));
});
