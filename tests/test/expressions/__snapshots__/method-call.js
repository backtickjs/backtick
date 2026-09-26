import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("methodCall", async (t) => {
  await snapshotCase(
    t,
    "methodCall",
    cs.create(
      "163oncfaq7kkj:9:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 9, column: 7 }, end: { line: 12, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 31 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 10, column: 12 },
                  end: { line: 10, column: 30 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 10, column: 12 },
                    end: { line: 10, column: 20 },
                  },
                  name: "greeting",
                  key: "greeting$163oncfaq7kkj$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 23 },
                    end: { line: 10, column: 30 },
                  },
                  value: "Hello",
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 58 },
            },
            argument: {
              type: "CallExpression",
              loc: {
                start: { line: 11, column: 13 },
                end: { line: 11, column: 57 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 11, column: 13 },
                  end: { line: 11, column: 55 },
                },
                object: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 11, column: 13 },
                    end: { line: 11, column: 43 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 11, column: 13 },
                      end: { line: 11, column: 28 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 11, column: 13 },
                        end: { line: 11, column: 21 },
                      },
                      name: "greeting",
                      key: "greeting$163oncfaq7kkj$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 11, column: 22 },
                        end: { line: 11, column: 28 },
                      },
                      name: "concat",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 11, column: 29 },
                        end: { line: 11, column: 33 },
                      },
                      value: ", ",
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 11, column: 35 },
                        end: { line: 11, column: 42 },
                      },
                      value: "World",
                    },
                  ],
                  optional: false,
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 44 },
                    end: { line: 11, column: 55 },
                  },
                  name: "toUpperCase",
                },
                computed: false,
                optional: false,
              },
              arguments: [],
              optional: false,
            },
          },
        ],
      }),
      {
        code: 'export default () => {\n    const greeting = "Hello";\n    return greeting.concat(", ", "World").toUpperCase();\n};',
        map: '{"version":3,"file":"method-call.test.jsx","sourceRoot":"","sources":["method-call.test.tsx"],"names":[],"mappings":"eAQO;IACD,MAAM,QAAQ,GAAG,OAAO,CAAC;IACzB,OAAO,QAAQ,CAAC,MAAM,CAAC,IAAI,EAAE,OAAO,CAAC,CAAC,WAAW,EAAE,CAAC;AACtD,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
