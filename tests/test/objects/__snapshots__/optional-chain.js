import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  { start: { line: 8, column: 13 }, end: { line: 10, column: 2 } },
  {
    filePath: "objects/optional-chain.test.tsx",
    fileHash: "2dtorvijco8u0",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 8, column: 16 }, end: { line: 10, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 8, column: 17 }, end: { line: 8, column: 18 } },
        name: "p",
        key: "p$2dtorvijco8u0$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 8, column: 45 }, end: { line: 10, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 14 } },
          argument: {
            type: "ChainExpression",
            loc: {
              start: { line: 9, column: 9 },
              end: { line: 9, column: 13 },
            },
            expression: {
              type: "MemberExpression",
              loc: {
                start: { line: 9, column: 9 },
                end: { line: 9, column: 13 },
              },
              object: {
                type: "Identifier",
                loc: {
                  start: { line: 9, column: 9 },
                  end: { line: 9, column: 10 },
                },
                name: "p",
                key: "p$2dtorvijco8u0$0",
              },
              property: {
                type: "Identifier",
                loc: {
                  start: { line: 9, column: 12 },
                  end: { line: 9, column: 13 },
                },
                name: "x",
              },
              computed: false,
              optional: true,
            },
          },
        },
      ],
    },
    expression: false,
  }),
);
const deep = cs.create(
  { start: { line: 12, column: 13 }, end: { line: 14, column: 2 } },
  {
    filePath: "objects/optional-chain.test.tsx",
    fileHash: "2dtorvijco8u0",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 12, column: 16 }, end: { line: 14, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 12, column: 17 }, end: { line: 12, column: 18 } },
        name: "o",
        key: "o$2dtorvijco8u0$1",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 12, column: 63 }, end: { line: 14, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 13, column: 2 },
            end: { line: 13, column: 21 },
          },
          argument: {
            type: "ChainExpression",
            loc: {
              start: { line: 13, column: 9 },
              end: { line: 13, column: 20 },
            },
            expression: {
              type: "MemberExpression",
              loc: {
                start: { line: 13, column: 9 },
                end: { line: 13, column: 20 },
              },
              object: {
                type: "MemberExpression",
                loc: {
                  start: { line: 13, column: 9 },
                  end: { line: 13, column: 17 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 9 },
                    end: { line: 13, column: 10 },
                  },
                  name: "o",
                  key: "o$2dtorvijco8u0$1",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 17 },
                  },
                  name: "inner",
                },
                computed: false,
                optional: true,
              },
              property: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 19 },
                  end: { line: 13, column: 20 },
                },
                name: "z",
              },
              computed: false,
              optional: true,
            },
          },
        },
      ],
    },
    expression: false,
  }),
);
const shout = cs.create(
  { start: { line: 16, column: 14 }, end: { line: 18, column: 2 } },
  {
    filePath: "objects/optional-chain.test.tsx",
    fileHash: "2dtorvijco8u0",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 16, column: 17 }, end: { line: 18, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 16, column: 18 }, end: { line: 16, column: 19 } },
        name: "s",
        key: "s$2dtorvijco8u0$2",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 16, column: 39 }, end: { line: 18, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 17, column: 2 },
            end: { line: 17, column: 24 },
          },
          argument: {
            type: "ChainExpression",
            loc: {
              start: { line: 17, column: 9 },
              end: { line: 17, column: 23 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 17, column: 9 },
                end: { line: 17, column: 23 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 17, column: 9 },
                  end: { line: 17, column: 18 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 9 },
                    end: { line: 17, column: 10 },
                  },
                  name: "s",
                  key: "s$2dtorvijco8u0$2",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 18 },
                  },
                  name: "concat",
                },
                computed: false,
                optional: true,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 17, column: 19 },
                    end: { line: 17, column: 22 },
                  },
                  value: "!",
                },
              ],
              optional: false,
            },
          },
        },
      ],
    },
    expression: false,
  }),
);
it("optionalChain", async (t) => {
  await snapshotCase(
    t,
    "optionalChain",
    cs.create(
      { start: { line: 24, column: 4 }, end: { line: 32, column: 7 } },
      {
        filePath: "objects/optional-chain.test.tsx",
        fileHash: "2dtorvijco8u0",
        splices: {
          $pick: { value: pick, params: [] },
          $deep: { value: deep, params: [] },
          $shout: { value: shout, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 24, column: 8 }, end: { line: 32, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 25, column: 6 },
              end: { line: 25, column: 28 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 25, column: 6 },
                end: { line: 25, column: 11 },
              },
              name: "found",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 25, column: 13 },
                end: { line: 25, column: 28 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 25, column: 13 },
                  end: { line: 25, column: 18 },
                },
                key: "$pick",
              },
              arguments: [
                {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 25, column: 19 },
                    end: { line: 25, column: 27 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 25, column: 21 },
                        end: { line: 25, column: 25 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 25, column: 21 },
                          end: { line: 25, column: 22 },
                        },
                        name: "x",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 25, column: 24 },
                          end: { line: 25, column: 25 },
                        },
                        value: 5,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 26, column: 6 },
              end: { line: 26, column: 26 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 26, column: 6 },
                end: { line: 26, column: 13 },
              },
              name: "missing",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 26, column: 15 },
                end: { line: 26, column: 26 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 26, column: 15 },
                  end: { line: 26, column: 20 },
                },
                key: "$pick",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 26, column: 21 },
                    end: { line: 26, column: 25 },
                  },
                  value: null,
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 27, column: 6 },
              end: { line: 27, column: 38 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 10 },
              },
              name: "deep",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 27, column: 12 },
                end: { line: 27, column: 38 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 27, column: 12 },
                  end: { line: 27, column: 17 },
                },
                key: "$deep",
              },
              arguments: [
                {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 27, column: 18 },
                    end: { line: 27, column: 37 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 27, column: 20 },
                        end: { line: 27, column: 35 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 20 },
                          end: { line: 27, column: 25 },
                        },
                        name: "inner",
                      },
                      value: {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 27, column: 27 },
                          end: { line: 27, column: 35 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 27, column: 29 },
                              end: { line: 27, column: 33 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 27, column: 29 },
                                end: { line: 27, column: 30 },
                              },
                              name: "z",
                            },
                            value: {
                              type: "Literal",
                              loc: {
                                start: { line: 27, column: 32 },
                                end: { line: 27, column: 33 },
                              },
                              value: 7,
                            },
                            kind: "init",
                            computed: false,
                            method: false,
                            shorthand: false,
                          },
                        ],
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 28, column: 33 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 9 },
              },
              name: "cut",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 28, column: 11 },
                end: { line: 28, column: 33 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 28, column: 11 },
                  end: { line: 28, column: 16 },
                },
                key: "$deep",
              },
              arguments: [
                {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 28, column: 17 },
                    end: { line: 28, column: 32 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 28, column: 19 },
                        end: { line: 28, column: 30 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 28, column: 19 },
                          end: { line: 28, column: 24 },
                        },
                        name: "inner",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 28, column: 26 },
                          end: { line: 28, column: 30 },
                        },
                        value: null,
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 22 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 29, column: 6 },
                end: { line: 29, column: 9 },
              },
              name: "top",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 29, column: 11 },
                end: { line: 29, column: 22 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 29, column: 11 },
                  end: { line: 29, column: 16 },
                },
                key: "$deep",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 17 },
                    end: { line: 29, column: 21 },
                  },
                  value: null,
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 30, column: 6 },
              end: { line: 30, column: 24 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 30, column: 6 },
                end: { line: 30, column: 10 },
              },
              name: "loud",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 30, column: 12 },
                end: { line: 30, column: 24 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 30, column: 12 },
                  end: { line: 30, column: 18 },
                },
                key: "$shout",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 30, column: 19 },
                    end: { line: 30, column: 23 },
                  },
                  value: "hi",
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 31, column: 6 },
              end: { line: 31, column: 26 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 31, column: 6 },
                end: { line: 31, column: 12 },
              },
              name: "silent",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 31, column: 14 },
                end: { line: 31, column: 26 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 31, column: 14 },
                  end: { line: 31, column: 20 },
                },
                key: "$shout",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 31, column: 21 },
                    end: { line: 31, column: 25 },
                  },
                  value: null,
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
    ),
  );
});
