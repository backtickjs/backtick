import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs.create(
      { start: { line: 9, column: 4 }, end: { line: 12, column: 6 } },
      {
        fileHash: "2jjdjdr7m395y",
        splices: {
          $0splice0: {
            value: cs.create(
              {
                start: { line: 11, column: 15 },
                end: { line: 11, column: 20 },
              },
              {
                fileHash: "2jjdjdr7m395y",
                splices: {},
                captures: ["x$2jjdjdr7m395y$0"],
              },
              () => ({
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 18 },
                  end: { line: 11, column: 19 },
                },
                name: "x",
                key: "x$2jjdjdr7m395y$0",
              }),
              "$0 => $0",
              '{"version":3,"file":"nested-scripts.test.jsx","sourceRoot":"","sources":["nested-scripts.test.tsx"],"names":[],"mappings":"AAUkB,MAAA,EAAC,CAAA"}',
            ),
            params: ["x$2jjdjdr7m395y$0"],
          },
        },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 9, column: 7 }, end: { line: 12, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 18 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 10, column: 12 },
                  end: { line: 10, column: 17 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 10, column: 12 },
                    end: { line: 10, column: 13 },
                  },
                  name: "x",
                  key: "x$2jjdjdr7m395y$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 16 },
                    end: { line: 10, column: 17 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 22 },
            },
            argument: {
              type: "Splice",
              loc: {
                start: { line: 11, column: 13 },
                end: { line: 11, column: 21 },
              },
              key: "$0splice0",
            },
          },
        ],
      }),
      "$0 => {\n    const x = 0;\n    return $0(x);\n}",
      '{"version":3,"file":"nested-scripts.test.jsx","sourceRoot":"","sources":["nested-scripts.test.tsx"],"names":[],"mappings":"AAQO;IACD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,KAAC,CAAQ;AAClB,CAAC,CAAA"}',
    ),
  );
});
