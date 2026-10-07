import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3g7ol1xnrqdpp:10:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const n = 5;\n    return [n ** 2, n & 6, n | 8, n ^ 1, n << 2, -n >> 1, -n >>> 28, n == 5, n != 5, "length" in [n], [n] instanceof Array];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASO;IACD,MAAMA,CAAC,GAAG,CAAC;IACX,OAAO,CACLA,CAAC,IAAI,CAAC,EACNA,CAAC,GAAG,CAAC,EACLA,CAAC,GAAG,CAAC,EACLA,CAAC,GAAG,CAAC,EACLA,CAAC,IAAI,CAAC,EACN,CAACA,CAAC,IAAI,CAAC,EACP,CAACA,CAAC,KAAK,EAAE,EACTA,CAAC,IAAI,CAAC,EACNA,CAAC,IAAI,CAAC,EACN,QAAQ,IAAI,CAACA,CAAC,CAAC,EACf,CAACA,CAAC,CAAC,YAAYC,KAAK,CACrB;AACH,CAAC","names":["n","Array"],"ignoreList":[],"sources":["expressions/operators.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "3g7ol1xnrqdpp:33:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const s = "7";\n    const o = {\n        a: 1,\n        b: 2\n    };\n    const deleted = delete o.a;\n    return [+s, ~5, void s === null, deleted, "a" in o];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgCO;IACD,MAAMA,CAAC,GAAG,GAAG;IACb,MAAMC,CAAC,GAA8B;QAAEC,CAAC,EAAE,CAAC;QAAEC,CAAC,EAAE;KAAG;IACnD,MAAMC,OAAO,GAAG,OAAOH,CAAC,CAACC,CAAC;IAC1B,OAAO,CAAC,CAACF,CAAC,EAAE,CAAC,CAAC,EAAE,KAAKA,CAAC,KAAK,IAAI,EAAEI,OAAO,EAAE,GAAG,IAAIH,CAAC,CAAC;AACrD,CAAC","names":["s","o","a","b","deleted"],"ignoreList":[],"sources":["expressions/operators.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module2 = {
  id: "3g7ol1xnrqdpp:46:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 3;\n    n **= 2;\n    n <<= 1;\n    n >>= 2;\n    n >>>= 1;\n    n &= 7;\n    n |= 8;\n    n ^= 1;\n    let a = null;\n    a ??= 4;\n    let b = false;\n    b ||= true;\n    let c = true;\n    c &&= false;\n    return [n, a, b, c];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6CO;IACD,IAAIA,CAAC,GAAG,CAAC;IACTA,CAAC,KAAK,CAAC;IACPA,CAAC,KAAK,CAAC;IACPA,CAAC,KAAK,CAAC;IACPA,CAAC,MAAM,CAAC;IACRA,CAAC,IAAI,CAAC;IACNA,CAAC,IAAI,CAAC;IACNA,CAAC,IAAI,CAAC;IACN,IAAIC,CAAC,GAAkB,IAAI;IAC3BA,CAAC,KAAK,CAAC;IACP,IAAIC,CAAC,GAAG,KAAK;IACbA,CAAC,KAAK,IAAI;IACV,IAAIC,CAAC,GAAG,IAAI;IACZA,CAAC,KAAK,KAAK;IACX,OAAO,CAACH,CAAC,EAAEC,CAAC,EAAEC,CAAC,EAAEC,CAAC,CAAC;AACrB,CAAC","names":["n","a","b","c"],"ignoreList":[],"sources":["expressions/operators.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module3 = {
  id: "3g7ol1xnrqdpp:71:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const o = {\n        n: 1\n    };\n    const list = [1, 2];\n    o.n += 1;\n    o.n++;\n    list[0] = 10;\n    list[1] **= 3;\n    --list[1];\n    return [o.n, list];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsEO;IACD,MAAMA,CAAC,GAAG;QAAEC,CAAC,EAAE;KAAG;IAClB,MAAMC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;IACnBF,CAAC,CAACC,CAAC,IAAI,CAAC;IACRD,CAAC,CAACC,CAAC,EAAE;IACLC,IAAI,CAAC,CAAC,CAAC,GAAG,EAAE;IACZA,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC;IACb,EAAEA,IAAI,CAAC,CAAC,CAAC;IACT,OAAO,CAACF,CAAC,CAACC,CAAC,EAAEC,IAAI,CAAC;AACpB,CAAC","names":["o","n","list"],"ignoreList":[],"sources":["expressions/operators.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module4 = {
  id: "3g7ol1xnrqdpp:89:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 0;\n    const last = (n++, n + 10);\n    return [n, last];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwFO;IACD,IAAIA,CAAC,GAAG,CAAC;IACT,MAAMC,IAAI,IAAID,CAAC,EAAE,EAAEA,CAAC,GAAG,EAAE,CAAC;IAC1B,OAAO,CAACA,CAAC,EAAEC,IAAI,CAAC;AAClB,CAAC","names":["n","last"],"ignoreList":[],"sources":["expressions/operators.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// Every JavaScript operator, answering what JavaScript answers.
it("binaryOperators", async (t) => {
  await snapshotCase(t, "binaryOperators", cs.create($module0, []));
});
it("unaryOperators", async (t) => {
  await snapshotCase(t, "unaryOperators", cs.create($module1, []));
});
it("assignmentOperators", async (t) => {
  await snapshotCase(t, "assignmentOperators", cs.create($module2, []));
});
// Anything a reference can name is a target: a variable, a member, an element.
it("assignmentTargets", async (t) => {
  await snapshotCase(t, "assignmentTargets", cs.create($module3, []));
});
// `,` evaluates both sides and answers the right one.
it("commaOperator", async (t) => {
  await snapshotCase(t, "commaOperator", cs.create($module4, []));
});
