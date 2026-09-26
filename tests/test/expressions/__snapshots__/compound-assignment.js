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
        code: 'export default () => {\n    let n = 10;\n    n += 5;\n    n -= 3;\n    n *= 2;\n    n /= 4;\n    n %= 4;\n    let text = "a";\n    text += "b";\n    let total = 1;\n    const answered = (total += 2);\n    let x = 1;\n    x += x = 5;\n    return [n, text, answered, total, x];\n};',
        map: '{"version":3,"file":"compound-assignment.test.jsx","sourceRoot":"","sources":["compound-assignment.test.tsx"],"names":[],"mappings":"eAWO;IACD,IAAI,CAAC,GAAG,EAAE,CAAC;IACX,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,IAAI,IAAI,GAAG,GAAG,CAAC;IACf,IAAI,IAAI,GAAG,CAAC;IACZ,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,MAAM,QAAQ,GAAG,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC;IAC9B,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC;IACX,OAAO,CAAC,CAAC,EAAE,IAAI,EAAE,QAAQ,EAAE,KAAK,EAAE,CAAC,CAAC,CAAC;AACvC,CAAC"}',
      },
    ),
  );
});
