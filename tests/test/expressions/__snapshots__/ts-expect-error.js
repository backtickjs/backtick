import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A checker directive written in a script covers the statement below it, as it
// does in TypeScript. The typecheck of this file is the assertion: it passes
// only while the error is there and the directive suppresses it.
it("tsExpectError", async (t) => {
  await snapshotCase(
    t,
    "tsExpectError",
    cs.create(
      "353rib4gy05pn:12:4",
      { params: [] },
      {
        code: 'export default () => {\n    const count = "one";\n    return count;\n};',
        map: '{"version":3,"file":"ts-expect-error.test.jsx","sourceRoot":"","sources":["expressions/ts-expect-error.test.tsx"],"names":[],"mappings":"eAWO;IAED,MAAM,KAAK,GAAW,KAAK,CAAC;IAC5B,OAAO,KAAK,CAAC;AACf,CAAC"}',
      },
    ),
  );
});
