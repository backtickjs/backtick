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
        code: 'export default () => {\n  const n = 5;\n  return [n ** 2, n & 6, n | 8, n ^ 1, n << 2, -n >> 1, -n >>> 28, n == 5, n != 5, "length" in [n], [n] instanceof Array];\n};',
        map: '{"version":3,"mappings":"eASO;EACD,MAAMA,CAAC,GAAG,CAAC;EACX,OAAO,CACLA,CAAC,IAAI,CAAC,EACNA,CAAC,GAAG,CAAC,EACLA,CAAC,GAAG,CAAC,EACLA,CAAC,GAAG,CAAC,EACLA,CAAC,IAAI,CAAC,EACN,CAACA,CAAC,IAAI,CAAC,EACP,CAACA,CAAC,KAAK,EAAE,EACTA,CAAC,IAAI,CAAC,EACNA,CAAC,IAAI,CAAC,EACN,QAAQ,IAAI,CAACA,CAAC,CAAC,EACf,CAACA,CAAC,CAAC,YAAYC,KAAK,CACrB;AACH,CAAC","names":["n","Array"],"ignoreList":[],"sources":["operators.test.tsx"]}',
        imports: [],
        exportAt: 0,
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
        code: 'export default () => {\n  const s = "7";\n  const o = {\n    a: 1,\n    b: 2\n  };\n  const deleted = delete o.a;\n  return [+s, ~5, void s === null, deleted, "a" in o];\n};',
        map: '{"version":3,"mappings":"eAgCO;EACD,MAAMA,CAAC,GAAG,GAAG;EACb,MAAMC,CAAC,GAA8B;IAAEC,CAAC,EAAE,CAAC;IAAEC,CAAC,EAAE;EAAC,CAAE;EACnD,MAAMC,OAAO,GAAG,OAAOH,CAAC,CAACC,CAAC;EAC1B,OAAO,CAAC,CAACF,CAAC,EAAE,CAAC,CAAC,EAAE,KAAKA,CAAC,KAAK,IAAI,EAAEI,OAAO,EAAE,GAAG,IAAIH,CAAC,CAAC;AACrD,CAAC","names":["s","o","a","b","deleted"],"ignoreList":[],"sources":["operators.test.tsx"]}',
        imports: [],
        exportAt: 0,
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
        code: "export default () => {\n  let n = 3;\n  n **= 2;\n  n <<= 1;\n  n >>= 2;\n  n >>>= 1;\n  n &= 7;\n  n |= 8;\n  n ^= 1;\n  let a = null;\n  a ??= 4;\n  let b = false;\n  b ||= true;\n  let c = true;\n  c &&= false;\n  return [n, a, b, c];\n};",
        map: '{"version":3,"mappings":"eA6CO;EACD,IAAIA,CAAC,GAAG,CAAC;EACTA,CAAC,KAAK,CAAC;EACPA,CAAC,KAAK,CAAC;EACPA,CAAC,KAAK,CAAC;EACPA,CAAC,MAAM,CAAC;EACRA,CAAC,IAAI,CAAC;EACNA,CAAC,IAAI,CAAC;EACNA,CAAC,IAAI,CAAC;EACN,IAAIC,CAAC,GAAkB,IAAI;EAC3BA,CAAC,KAAK,CAAC;EACP,IAAIC,CAAC,GAAG,KAAK;EACbA,CAAC,KAAK,IAAI;EACV,IAAIC,CAAC,GAAG,IAAI;EACZA,CAAC,KAAK,KAAK;EACX,OAAO,CAACH,CAAC,EAAEC,CAAC,EAAEC,CAAC,EAAEC,CAAC,CAAC;AACrB,CAAC","names":["n","a","b","c"],"ignoreList":[],"sources":["operators.test.tsx"]}',
        imports: [],
        exportAt: 0,
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
        code: "export default () => {\n  const o = {\n    n: 1\n  };\n  const list = [1, 2];\n  o.n += 1;\n  o.n++;\n  list[0] = 10;\n  list[1] **= 3;\n  --list[1];\n  return [o.n, list];\n};",
        map: '{"version":3,"mappings":"eAsEO;EACD,MAAMA,CAAC,GAAG;IAAEC,CAAC,EAAE;EAAC,CAAE;EAClB,MAAMC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC;EACnBF,CAAC,CAACC,CAAC,IAAI,CAAC;EACRD,CAAC,CAACC,CAAC,EAAE;EACLC,IAAI,CAAC,CAAC,CAAC,GAAG,EAAE;EACZA,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC;EACb,EAAEA,IAAI,CAAC,CAAC,CAAC;EACT,OAAO,CAACF,CAAC,CAACC,CAAC,EAAEC,IAAI,CAAC;AACpB,CAAC","names":["o","n","list"],"ignoreList":[],"sources":["operators.test.tsx"]}',
        imports: [],
        exportAt: 0,
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
        code: "export default () => {\n  let n = 0;\n  const last = (n++, n + 10);\n  return [n, last];\n};",
        map: '{"version":3,"mappings":"eAwFO;EACD,IAAIA,CAAC,GAAG,CAAC;EACT,MAAMC,IAAI,IAAID,CAAC,EAAE,EAAEA,CAAC,GAAG,EAAE,CAAC;EAC1B,OAAO,CAACA,CAAC,EAAEC,IAAI,CAAC;AAClB,CAAC","names":["n","last"],"ignoreList":[],"sources":["operators.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
