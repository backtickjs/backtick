import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object's values in key order, and whether it holds a key: the check a
// script would otherwise write as `Object.keys(o).includes(k)`.
it("objectValues", async (t) => {
  await snapshotCase(
    t,
    "objectValues",
    cs.create(
      { start: { line: 11, column: 4 }, end: { line: 17, column: 6 } },
      {
        version: "0.0.0",
        filePath: "stdlib/object-values.test.tsx",
        fileHash: "1lmwvcf4zc2ir",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 17, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 43 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 12, column: 12 },
                  end: { line: 12, column: 42 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 12 },
                    end: { line: 12, column: 18 },
                  },
                  name: "prices",
                  bindingKey: "prices$1lmwvcf4zc2ir$0",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 12, column: 21 },
                    end: { line: 12, column: 42 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 12, column: 23 },
                        end: { line: 12, column: 31 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 23 },
                          end: { line: 12, column: 28 },
                        },
                        name: "apple",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 12, column: 30 },
                          end: { line: 12, column: 31 },
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
                        start: { line: 12, column: 33 },
                        end: { line: 12, column: 40 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 33 },
                          end: { line: 12, column: 37 },
                        },
                        name: "pear",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 12, column: 39 },
                          end: { line: 12, column: 40 },
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
            type: "ReturnStatement",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 16, column: 8 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 13, column: 13 },
                end: { line: 16, column: 7 },
              },
              properties: [
                {
                  type: "Property",
                  loc: {
                    start: { line: 14, column: 8 },
                    end: { line: 14, column: 37 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 14, column: 8 },
                      end: { line: 14, column: 14 },
                    },
                    name: "values",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 14, column: 16 },
                      end: { line: 14, column: 37 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 14, column: 16 },
                        end: { line: 14, column: 29 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 16 },
                          end: { line: 14, column: 22 },
                        },
                        name: "Object",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 23 },
                          end: { line: 14, column: 29 },
                        },
                        name: "values",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 30 },
                          end: { line: 14, column: 36 },
                        },
                        name: "prices",
                        bindingKey: "prices$1lmwvcf4zc2ir$0",
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
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 77 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 13 },
                    },
                    name: "holds",
                  },
                  value: {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 15, column: 15 },
                      end: { line: 15, column: 77 },
                    },
                    elements: [
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 15, column: 16 },
                          end: { line: 15, column: 45 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 16 },
                            end: { line: 15, column: 29 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 16 },
                              end: { line: 15, column: 22 },
                            },
                            name: "Object",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 23 },
                              end: { line: 15, column: 29 },
                            },
                            name: "hasOwn",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 30 },
                              end: { line: 15, column: 36 },
                            },
                            name: "prices",
                            bindingKey: "prices$1lmwvcf4zc2ir$0",
                          },
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 15, column: 38 },
                              end: { line: 15, column: 44 },
                            },
                            value: "pear",
                          },
                        ],
                        optional: false,
                      },
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 15, column: 47 },
                          end: { line: 15, column: 76 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 47 },
                            end: { line: 15, column: 60 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 47 },
                              end: { line: 15, column: 53 },
                            },
                            name: "Object",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 54 },
                              end: { line: 15, column: 60 },
                            },
                            name: "hasOwn",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 61 },
                              end: { line: 15, column: 67 },
                            },
                            name: "prices",
                            bindingKey: "prices$1lmwvcf4zc2ir$0",
                          },
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 15, column: 69 },
                              end: { line: 15, column: 75 },
                            },
                            value: "plum",
                          },
                        ],
                        optional: false,
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
          },
        ],
      }),
    ),
  );
});
