import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const answers = { here: "yes" };
it("indexAbsent", async (t) => {
  await snapshotCase(
    t,
    "indexAbsent",
    cs.create(
      { start: { line: 14, column: 4 }, end: { line: 18, column: 6 } },
      {
        version: "0.0.0",
        filePath: "objects/index-absent.test.tsx",
        fileHash: "26sqkhggd8j15",
        splices: { $answers: { value: answers, params: [] } },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 14, column: 7 }, end: { line: 18, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 36 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 35 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 17 },
                  },
                  name: "names",
                  bindingKey: "names$26sqkhggd8j15$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 15, column: 20 },
                    end: { line: 15, column: 35 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 21 },
                        end: { line: 15, column: 27 },
                      },
                      value: "zero",
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 29 },
                        end: { line: 15, column: 34 },
                      },
                      value: "one",
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 52 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 16, column: 12 },
                  end: { line: 16, column: 51 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 19 },
                  },
                  name: "missing",
                  bindingKey: "missing$26sqkhggd8j15$1",
                },
                init: {
                  type: "LogicalExpression",
                  loc: {
                    start: { line: 16, column: 22 },
                    end: { line: 16, column: 51 },
                  },
                  operator: "??",
                  left: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 16, column: 22 },
                      end: { line: 16, column: 41 },
                    },
                    object: {
                      type: "Splice",
                      loc: {
                        start: { line: 16, column: 22 },
                        end: { line: 16, column: 30 },
                      },
                      key: "$answers",
                    },
                    property: {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 31 },
                        end: { line: 16, column: 40 },
                      },
                      value: "nowhere",
                    },
                    computed: true,
                    optional: false,
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 16, column: 45 },
                      end: { line: 16, column: 51 },
                    },
                    value: "gone",
                  },
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 38 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 17, column: 13 },
                end: { line: 17, column: 37 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 17, column: 13 },
                  end: { line: 17, column: 27 },
                },
                operator: "+",
                left: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 17, column: 13 },
                    end: { line: 17, column: 21 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 13 },
                      end: { line: 17, column: 18 },
                    },
                    name: "names",
                    bindingKey: "names$26sqkhggd8j15$0",
                  },
                  property: {
                    type: "Literal",
                    loc: {
                      start: { line: 17, column: 19 },
                      end: { line: 17, column: 20 },
                    },
                    value: 1,
                  },
                  computed: true,
                  optional: false,
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 17, column: 24 },
                    end: { line: 17, column: 27 },
                  },
                  value: "/",
                },
              },
              right: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 30 },
                  end: { line: 17, column: 37 },
                },
                name: "missing",
                bindingKey: "missing$26sqkhggd8j15$1",
              },
            },
          },
        ],
      }),
    ),
  );
});
