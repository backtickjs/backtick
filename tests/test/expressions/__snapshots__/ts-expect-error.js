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
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 16, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 34 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 33 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 17 },
                  },
                  name: "count",
                  key: "count$353rib4gy05pn$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 28 },
                    end: { line: 14, column: 33 },
                  },
                  value: "one",
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 19 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 15, column: 13 },
                end: { line: 15, column: 18 },
              },
              name: "count",
              key: "count$353rib4gy05pn$0",
            },
          },
        ],
      }),
      '() => {\n    const count = "one";\n    return count;\n}',
      '{"version":3,"file":"ts-expect-error.test.jsx","sourceRoot":"","sources":["ts-expect-error.test.tsx"],"names":[],"mappings":"AAWO;IAED,MAAM,KAAK,GAAW,KAAK,CAAC;IAC5B,OAAO,KAAK,CAAC;AACf,CAAC,CAAA"}',
    ),
  );
});
