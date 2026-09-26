import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Every JavaScript operator, answering what JavaScript answers.
it("binaryOperators", async (t) => {
  await snapshotCase(
    t,
    "binaryOperators",
    cs.create(
      "3g7ol1xnrqdpp:10:4",
      { params: [] },
      {
        code: 'export default () => {\n    const n = 5;\n    return [\n        n ** 2,\n        n & 6,\n        n | 8,\n        n ^ 1,\n        n << 2,\n        -n >> 1,\n        -n >>> 28,\n        n == 5,\n        n != 5,\n        "length" in [n],\n        [n] instanceof Array,\n    ];\n};',
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eASO;IACD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO;QACL,CAAC,IAAI,CAAC;QACN,CAAC,GAAG,CAAC;QACL,CAAC,GAAG,CAAC;QACL,CAAC,GAAG,CAAC;QACL,CAAC,IAAI,CAAC;QACN,CAAC,CAAC,IAAI,CAAC;QACP,CAAC,CAAC,KAAK,EAAE;QACT,CAAC,IAAI,CAAC;QACN,CAAC,IAAI,CAAC;QACN,QAAQ,IAAI,CAAC,CAAC,CAAC;QACf,CAAC,CAAC,CAAC,YAAY,KAAK;KACrB,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
it("unaryOperators", async (t) => {
  await snapshotCase(
    t,
    "unaryOperators",
    cs.create(
      "3g7ol1xnrqdpp:33:4",
      { params: [] },
      {
        code: 'export default () => {\n    const s = "7";\n    const o = { a: 1, b: 2 };\n    const deleted = delete o.a;\n    return [+s, ~5, void s === null, deleted, "a" in o];\n};',
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eAgCO;IACD,MAAM,CAAC,GAAG,GAAG,CAAC;IACd,MAAM,CAAC,GAA8B,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACpD,MAAM,OAAO,GAAG,OAAO,CAAC,CAAC,CAAC,CAAC;IAC3B,OAAO,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,KAAK,CAAC,KAAK,IAAI,EAAE,OAAO,EAAE,GAAG,IAAI,CAAC,CAAC,CAAC;AACtD,CAAC"}',
      },
    ),
  );
});
it("assignmentOperators", async (t) => {
  await snapshotCase(
    t,
    "assignmentOperators",
    cs.create(
      "3g7ol1xnrqdpp:46:4",
      { params: [] },
      {
        code: "export default () => {\n    let n = 3;\n    n **= 2;\n    n <<= 1;\n    n >>= 2;\n    n >>>= 1;\n    n &= 7;\n    n |= 8;\n    n ^= 1;\n    let a = null;\n    a ??= 4;\n    let b = false;\n    b ||= true;\n    let c = true;\n    c &&= false;\n    return [n, a, b, c];\n};",
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eA6CO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,KAAK,CAAC,CAAC;IACR,CAAC,KAAK,CAAC,CAAC;IACR,CAAC,KAAK,CAAC,CAAC;IACR,CAAC,MAAM,CAAC,CAAC;IACT,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,IAAI,CAAC,GAAkB,IAAI,CAAC;IAC5B,CAAC,KAAK,CAAC,CAAC;IACR,IAAI,CAAC,GAAG,KAAK,CAAC;IACd,CAAC,KAAK,IAAI,CAAC;IACX,IAAI,CAAC,GAAG,IAAI,CAAC;IACb,CAAC,KAAK,KAAK,CAAC;IACZ,OAAO,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;AACtB,CAAC"}',
      },
    ),
  );
});
// Anything a reference can name is a target: a variable, a member, an element.
it("assignmentTargets", async (t) => {
  await snapshotCase(
    t,
    "assignmentTargets",
    cs.create(
      "3g7ol1xnrqdpp:71:4",
      { params: [] },
      {
        code: "export default () => {\n    const o = { n: 1 };\n    const list = [1, 2];\n    o.n += 1;\n    o.n++;\n    list[0] = 10;\n    list[1] **= 3;\n    --list[1];\n    return [o.n, list];\n};",
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eAsEO;IACD,MAAM,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACnB,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACpB,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;IACT,CAAC,CAAC,CAAC,EAAE,CAAC;IACN,IAAI,CAAC,CAAC,CAAC,GAAG,EAAE,CAAC;IACb,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC;IACd,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC;IACV,OAAO,CAAC,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC;AACrB,CAAC"}',
      },
    ),
  );
});
// `,` evaluates both sides and answers the right one.
it("commaOperator", async (t) => {
  await snapshotCase(
    t,
    "commaOperator",
    cs.create(
      "3g7ol1xnrqdpp:89:4",
      { params: [] },
      {
        code: "export default () => {\n    let n = 0;\n    const last = (n++, n + 10);\n    return [n, last];\n};",
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eAwFO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,EAAE,CAAC,GAAG,EAAE,CAAC,CAAC;IAC3B,OAAO,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC;AACnB,CAAC"}',
      },
    ),
  );
});
