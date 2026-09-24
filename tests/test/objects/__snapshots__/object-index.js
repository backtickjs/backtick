import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates = { usd: 3, eur: 4 };
it("objectIndex", async (t) => {
  await snapshotCase(
    t,
    "objectIndex",
    cs.create(
      { start: { line: 15, column: 4 }, end: { line: 20, column: 6 } },
      {
        filePath: "objects/object-index.test.tsx",
        fileHash: "o3ttyh4dq4dw",
        splices: { $rates: { value: rates, params: [] } },
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 15, column: 7 }, end: { line: 20, column: 5 } },
        params: [
          {
            type: "Identifier",
            loc: {
              start: { line: 15, column: 8 },
              end: { line: 15, column: 16 },
            },
            name: "currency",
            key: "currency$o3ttyh4dq4dw$0",
          },
        ],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 15, column: 29 },
            end: { line: 20, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 27 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 26 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 12 },
                      end: { line: 16, column: 17 },
                    },
                    name: "table",
                    key: "table$o3ttyh4dq4dw$1",
                  },
                  init: {
                    type: "Splice",
                    loc: {
                      start: { line: 16, column: 20 },
                      end: { line: 16, column: 26 },
                    },
                    key: "$rates",
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 41 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 40 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 12 },
                      end: { line: 17, column: 17 },
                    },
                    name: "asked",
                    key: "asked$o3ttyh4dq4dw$2",
                  },
                  init: {
                    type: "LogicalExpression",
                    loc: {
                      start: { line: 17, column: 20 },
                      end: { line: 17, column: 40 },
                    },
                    operator: "??",
                    left: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 17, column: 20 },
                        end: { line: 17, column: 35 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 20 },
                          end: { line: 17, column: 25 },
                        },
                        name: "table",
                        key: "table$o3ttyh4dq4dw$1",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 26 },
                          end: { line: 17, column: 34 },
                        },
                        name: "currency",
                        key: "currency$o3ttyh4dq4dw$0",
                      },
                      computed: true,
                      optional: false,
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 17, column: 39 },
                        end: { line: 17, column: 40 },
                      },
                      value: 0,
                    },
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 36 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 35 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 12 },
                      end: { line: 18, column: 15 },
                    },
                    name: "usd",
                    key: "usd$o3ttyh4dq4dw$3",
                  },
                  init: {
                    type: "LogicalExpression",
                    loc: {
                      start: { line: 18, column: 18 },
                      end: { line: 18, column: 35 },
                    },
                    operator: "??",
                    left: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 18, column: 18 },
                        end: { line: 18, column: 30 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 18 },
                          end: { line: 18, column: 23 },
                        },
                        name: "table",
                        key: "table$o3ttyh4dq4dw$1",
                      },
                      property: {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 24 },
                          end: { line: 18, column: 29 },
                        },
                        value: "usd",
                      },
                      computed: true,
                      optional: false,
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 34 },
                        end: { line: 18, column: 35 },
                      },
                      value: 0,
                    },
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 25 },
              },
              argument: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 19, column: 13 },
                  end: { line: 19, column: 24 },
                },
                operator: "+",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 13 },
                    end: { line: 19, column: 18 },
                  },
                  name: "asked",
                  key: "asked$o3ttyh4dq4dw$2",
                },
                right: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 21 },
                    end: { line: 19, column: 24 },
                  },
                  name: "usd",
                  key: "usd$o3ttyh4dq4dw$3",
                },
              },
            },
          ],
        },
        expression: false,
      }),
    ),
  );
});
