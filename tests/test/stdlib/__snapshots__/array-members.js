import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
it("arrayMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayMembers",
    cs.create(
      "139y0n5fpgs82:11:4",
      { params: [] },
      {
        code: 'export default () => {\n    const coins = [1, 2, 3];\n    const four = 4;\n    return {\n        count: coins.length,\n        all: coins.concat([four]),\n        part: coins.slice(0, 2),\n        where: coins.indexOf(2),\n        lastWhere: coins.concat([2]).lastIndexOf(2),\n        has: coins.includes(3),\n        text: coins.join("-"),\n        doubled: coins.map((n) => n * 2),\n        small: coins.filter((n) => n < 3),\n    };\n};',
        map: '{"version":3,"file":"array-members.test.jsx","sourceRoot":"","sources":["array-members.test.tsx"],"names":[],"mappings":"eAUO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACxB,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO;QACL,KAAK,EAAE,KAAK,CAAC,MAAM;QACnB,GAAG,EAAE,KAAK,CAAC,MAAM,CAAC,CAAC,IAAI,CAAC,CAAC;QACzB,IAAI,EAAE,KAAK,CAAC,KAAK,CAAC,CAAC,EAAE,CAAC,CAAC;QACvB,KAAK,EAAE,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC;QACvB,SAAS,EAAE,KAAK,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,CAAC,CAAC;QAC3C,GAAG,EAAE,KAAK,CAAC,QAAQ,CAAC,CAAC,CAAC;QACtB,IAAI,EAAE,KAAK,CAAC,IAAI,CAAC,GAAG,CAAC;QACrB,OAAO,EAAE,KAAK,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAChC,KAAK,EAAE,KAAK,CAAC,MAAM,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;KAClC,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
