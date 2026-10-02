import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `reduce` takes its initial value, where the standard library lets it be
// left out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
it("arrayReduce", async (t) => {
  await snapshotCase(
    t,
    "arrayReduce",
    cs.create(
      "32uyy4dbi2509:13:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const prices = [4.5, 3.25, 2];\n    const total = prices.reduce((sum, price) => sum + price, 0);\n    const names = ["a", "b", "c"];\n    const joined = names.reduce((all, one, index) => all + index + one, "");\n    const empty = [];\n    return total.toFixed(2) + "|" + joined + "|" + empty.reduce((sum, one) => sum + one, 0);\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAYO;IACD,MAAMA,MAAM,GAAG,CAAC,GAAG,EAAE,IAAI,EAAE,CAAC,CAAC;IAC7B,MAAMC,KAAK,GAAGD,MAAM,CAACE,MAAM,CAAC,CAACC,GAAG,EAAEC,KAAK,KAAKD,GAAG,GAAGC,KAAK,EAAE,CAAC,CAAC;IAC3D,MAAMC,KAAK,GAAG,CAAC,GAAG,EAAE,GAAG,EAAE,GAAG,CAAC;IAC7B,MAAMC,MAAM,GAAGD,KAAK,CAACH,MAAM,CAAC,CAACK,GAAG,EAAEC,GAAG,EAAEC,KAAK,KAAKF,GAAG,GAAGE,KAAK,GAAGD,GAAG,EAAE,EAAE,CAAC;IACvE,MAAME,KAAK,GAAa,EAAE;IAC1B,OACET,KAAK,CAACU,OAAO,CAAC,CAAC,CAAC,GAChB,GAAG,GACHL,MAAM,GACN,GAAG,GACHI,KAAK,CAACR,MAAM,CAAC,CAACC,GAAG,EAAEK,GAAG,KAAKL,GAAG,GAAGK,GAAG,EAAE,CAAC,CAAC;AAE5C,CAAC","names":["prices","total","reduce","sum","price","names","joined","all","one","index","empty","toFixed"],"ignoreList":[],"sources":["stdlib/array-reduce.test.tsx"]}',
      [],
    ),
  );
});
