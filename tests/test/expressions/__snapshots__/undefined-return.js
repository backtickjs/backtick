import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const lying = cs.create(
  "2qb372nig0g3z:11:35",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 11, column: 38 }, end: { line: 11, column: 48 } },
    params: [],
    body: {
      type: "Literal",
      loc: { start: { line: 11, column: 44 }, end: { line: 11, column: 48 } },
      value: "hi",
    },
    expression: true,
  }),
  'export default () => () => "hi";',
  '{"version":3,"file":"undefined-return.test.jsx","sourceRoot":"","sources":["undefined-return.test.tsx"],"names":[],"mappings":"eAUsC,MAAA,GAAG,EAAE,CAAC,IAAI"}',
);
it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.create(
      "2qb372nig0g3z:17:4",
      { params: [{ kind: "splice", value: lying, bindings: [] }] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 21, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 28 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 27 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 18 },
                  },
                  name: "stored",
                  key: "stored$2qb372nig0g3z$0",
                },
                init: {
                  type: "Splice",
                  loc: {
                    start: { line: 18, column: 21 },
                    end: { line: 18, column: 27 },
                  },
                  param: 0,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 30 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 19, column: 12 },
                  end: { line: 19, column: 29 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 12 },
                    end: { line: 19, column: 18 },
                  },
                  name: "caught",
                  key: "caught$2qb372nig0g3z$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 19, column: 21 },
                    end: { line: 19, column: 29 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 19, column: 21 },
                      end: { line: 19, column: 27 },
                    },
                    param: 0,
                  },
                  arguments: [],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 15 },
            },
            argument: {
              type: "Literal",
              loc: {
                start: { line: 20, column: 13 },
                end: { line: 20, column: 14 },
              },
              value: 1,
            },
          },
        ],
      }),
      "export default ($0) => {\n    const stored = $0();\n    const caught = $0()();\n    return 1;\n};",
      '{"version":3,"file":"undefined-return.test.jsx","sourceRoot":"","sources":["undefined-return.test.tsx"],"names":[],"mappings":"eAgBO;IACD,MAAM,MAAM,GAAG,IAAM,CAAC;IACtB,MAAM,MAAM,GAAG,IAAM,EAAE,CAAC;IACxB,OAAO,CAAC,CAAC;AACX,CAAC"}',
    ),
  );
});
