import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
it("comments", async (t) => {
  await snapshotCase(
    t,
    "comments",
    cs.create(
      { start: { line: 11, column: 4 }, end: { line: 23, column: 6 } },
      {
        filePath: "expressions/comments.test.tsx",
        fileHash: "3lcac8ezsyzi3",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 23, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 22 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 21 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 17 },
                  },
                  name: "count",
                  key: "count$3lcac8ezsyzi3$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 20 },
                    end: { line: 13, column: 21 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "IfStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 18, column: 7 },
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 15, column: 10 },
                end: { line: 15, column: 21 },
              },
              operator: "===",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 10 },
                  end: { line: 15, column: 15 },
                },
                name: "count",
                key: "count$3lcac8ezsyzi3$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 15, column: 20 },
                  end: { line: 15, column: 21 },
                },
                value: 1,
              },
            },
            consequent: {
              type: "BlockStatement",
              loc: {
                start: { line: 15, column: 23 },
                end: { line: 18, column: 7 },
              },
              body: [
                {
                  type: "ReturnStatement",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 21 },
                  },
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 17, column: 15 },
                      end: { line: 17, column: 20 },
                    },
                    value: "one",
                  },
                },
              ],
            },
            alternate: null,
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 22, column: 20 },
            },
            argument: {
              type: "Literal",
              loc: {
                start: { line: 22, column: 13 },
                end: { line: 22, column: 19 },
              },
              value: "many",
            },
          },
        ],
      }),
      '() => {\n    const count = 1;\n    if (count === 1) {\n        return "one";\n    }\n    return "many";\n}',
      '{"version":3,"file":"comments.test.jsx","sourceRoot":"","sources":["comments.test.tsx"],"names":[],"mappings":"AAUO;IAED,MAAM,KAAK,GAAG,CAAC,CAAC;IAEhB,IAAI,KAAK,KAAK,CAAC,EAAE,CAAC;QAEhB,OAAO,KAAK,CAAC;IACf,CAAC;IAID,OAAO,MAAM,CAAC;AAChB,CAAC,CAAA"}',
    ),
  );
});
