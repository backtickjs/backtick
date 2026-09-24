import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A spread in an object literal, which the format cannot ship as the data it
// spells: an object in a value slot *is* its own keys and none of them is
// reserved, so there is nowhere to write "and every key of that one". A
// literal a spread runs through is `Object.fromEntries` over its pairs
// instead, the spread being `Object.entries` of what it spreads; a literal
// without one is data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
it("objectSpread", async (t) => {
  await snapshotCase(
    t,
    "objectSpread",
    cs.create(
      { start: { line: 17, column: 4 }, end: { line: 25, column: 6 } },
      {
        version: "0.0.0",
        filePath: "objects/object-spread.test.tsx",
        fileHash: "31uvwz3g4bdt1",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 25, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 34 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 33 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 16 },
                  },
                  name: "base",
                  bindingKey: "base$31uvwz3g4bdt1$0",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 18, column: 19 },
                    end: { line: 18, column: 33 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 18, column: 21 },
                        end: { line: 18, column: 25 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 21 },
                          end: { line: 18, column: 22 },
                        },
                        name: "a",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 24 },
                          end: { line: 18, column: 25 },
                        },
                        value: 1,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                    {
                      type: "Property",
                      loc: {
                        start: { line: 18, column: 27 },
                        end: { line: 18, column: 31 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 27 },
                          end: { line: 18, column: 28 },
                        },
                        name: "b",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 30 },
                          end: { line: 18, column: 31 },
                        },
                        value: 2,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 28 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 19, column: 12 },
                  end: { line: 19, column: 27 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 12 },
                    end: { line: 19, column: 16 },
                  },
                  name: "over",
                  bindingKey: "over$31uvwz3g4bdt1$1",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 19, column: 19 },
                    end: { line: 19, column: 27 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 19, column: 21 },
                        end: { line: 19, column: 25 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 21 },
                          end: { line: 19, column: 22 },
                        },
                        name: "b",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 19, column: 24 },
                          end: { line: 19, column: 25 },
                        },
                        value: 9,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 24, column: 8 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 20, column: 13 },
                end: { line: 24, column: 7 },
              },
              properties: [
                {
                  type: "SpreadElement",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 15 },
                  },
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 11 },
                      end: { line: 21, column: 15 },
                    },
                    name: "base",
                    bindingKey: "base$31uvwz3g4bdt1$0",
                  },
                },
                {
                  type: "SpreadElement",
                  loc: {
                    start: { line: 22, column: 8 },
                    end: { line: 22, column: 15 },
                  },
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 11 },
                      end: { line: 22, column: 15 },
                    },
                    name: "over",
                    bindingKey: "over$31uvwz3g4bdt1$1",
                  },
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 12 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 23, column: 8 },
                      end: { line: 23, column: 9 },
                    },
                    name: "c",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 23, column: 11 },
                      end: { line: 23, column: 12 },
                    },
                    value: 3,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
