import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `x += y` assigns what `x + y` answers and answers it: a string concatenates
// as `+` does. The variable is read before the value is evaluated, so an
// assignment inside the value doesn't change what it adds to.
it("compoundAssignment", async (t) => {
  await snapshotCase(
    t,
    "compoundAssignment",
    cs.create(
      "23v4b48bi2lxc:12:4",
      { params: [] },
      {
        code: 'export default () => {\n  let n = 10;\n  n += 5;\n  n -= 3;\n  n *= 2;\n  n /= 4;\n  n %= 4;\n  let text = "a";\n  text += "b";\n  let total = 1;\n  const answered = total += 2;\n  let x = 1;\n  x += x = 5;\n  return [n, text, answered, total, x];\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,IAAIA,CAAC,GAAG,EAAE;EACVA,CAAC,IAAI,CAAC;EACNA,CAAC,IAAI,CAAC;EACNA,CAAC,IAAI,CAAC;EACNA,CAAC,IAAI,CAAC;EACNA,CAAC,IAAI,CAAC;EACN,IAAIC,IAAI,GAAG,GAAG;EACdA,IAAI,IAAI,GAAG;EACX,IAAIC,KAAK,GAAG,CAAC;EACb,MAAMC,QAAQ,GAAID,KAAK,IAAI,CAAE;EAC7B,IAAIE,CAAC,GAAG,CAAC;EACTA,CAAC,IAAIA,CAAC,GAAG,CAAC;EACV,OAAO,CAACJ,CAAC,EAAEC,IAAI,EAAEE,QAAQ,EAAED,KAAK,EAAEE,CAAC,CAAC;AACtC,CAAC","names":["n","text","total","answered","x"],"ignoreList":[],"sources":["compound-assignment.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
