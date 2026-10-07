import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "23v4b48bi2lxc:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 10;\n    n += 5;\n    n -= 3;\n    n *= 2;\n    n /= 4;\n    n %= 4;\n    let text = "a";\n    text += "b";\n    let total = 1;\n    const answered = total += 2;\n    let x = 1;\n    x += x = 5;\n    return [n, text, answered, total, x];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,IAAIA,CAAC,GAAG,EAAE;IACVA,CAAC,IAAI,CAAC;IACNA,CAAC,IAAI,CAAC;IACNA,CAAC,IAAI,CAAC;IACNA,CAAC,IAAI,CAAC;IACNA,CAAC,IAAI,CAAC;IACN,IAAIC,IAAI,GAAG,GAAG;IACdA,IAAI,IAAI,GAAG;IACX,IAAIC,KAAK,GAAG,CAAC;IACb,MAAMC,QAAQ,GAAID,KAAK,IAAI,CAAE;IAC7B,IAAIE,CAAC,GAAG,CAAC;IACTA,CAAC,IAAIA,CAAC,GAAG,CAAC;IACV,OAAO,CAACJ,CAAC,EAAEC,IAAI,EAAEE,QAAQ,EAAED,KAAK,EAAEE,CAAC,CAAC;AACtC,CAAC","names":["n","text","total","answered","x"],"ignoreList":[],"sources":["expressions/compound-assignment.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// `x += y` assigns what `x + y` answers and answers it: a string concatenates
// as `+` does. The variable is read before the value is evaluated, so an
// assignment inside the value doesn't change what it adds to.
it("compoundAssignment", async (t) => {
  await snapshotCase(t, "compoundAssignment", cs.create($module0, []));
});
