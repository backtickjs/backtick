import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Array members that answer a question about an array or build a new one,
// leaving it as it was. `reduceRight` takes its starting value, as `reduce`
// does.
it("arrayQueries", async (t) => {
  await snapshotCase(
    t,
    "arrayQueries",
    cs.create(
      "25lflsbo2zrha:12:4",
      { params: [] },
      '() => {\n    const coins = [1, 2, 3, 4];\n    return {\n        at: [coins.at(0), coins.at(-1), coins.at(9)],\n        every: coins.every((n) => n > 0),\n        some: coins.some((n) => n > 3),\n        findLast: coins.findLast((n) => n < 3),\n        findLastIndex: coins.findLastIndex((n) => n < 3),\n        flatMap: coins.flatMap((n) => [n, n * 10]),\n        reduceRight: coins.reduceRight((text, n) => text + n, ""),\n        unchanged: coins,\n    };\n}',
      '{"version":3,"file":"array-queries.test.jsx","sourceRoot":"","sources":["stdlib/array-queries.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IAC3B,OAAO;QACL,EAAE,EAAE,CAAC,KAAK,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,KAAK,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,KAAK,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;QAC5C,KAAK,EAAE,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAChC,IAAI,EAAE,KAAK,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAC9B,QAAQ,EAAE,KAAK,CAAC,QAAQ,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QACtC,aAAa,EAAE,KAAK,CAAC,aAAa,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAChD,OAAO,EAAE,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,CAAC,EAAE,CAAC,GAAG,EAAE,CAAC,CAAC;QAC1C,WAAW,EAAE,KAAK,CAAC,WAAW,CAAC,CAAC,IAAI,EAAE,CAAC,EAAE,EAAE,CAAC,IAAI,GAAG,CAAC,EAAE,EAAE,CAAC;QACzD,SAAS,EAAE,KAAK;KACjB,CAAC;AACJ,CAAC"}',
    ),
  );
});
