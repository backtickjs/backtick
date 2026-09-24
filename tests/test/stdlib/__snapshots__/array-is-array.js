import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Any value may be asked about, and only an array answers true: a string has
// a length and indexes, and is still not one.
it("arrayIsArray", async (t) => {
  await snapshotCase(
    t,
    "arrayIsArray",
    cs.create(
      { start: { line: 11, column: 4 }, end: { line: 19, column: 6 } },
      {
        filePath: "stdlib/array-is-array.test.tsx",
        fileHash: "311zee6pw10s9",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 19, column: 5 } },
        body: [
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 18, column: 8 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 12, column: 13 },
                end: { line: 18, column: 7 },
              },
              elements: [
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 13, column: 25 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 13, column: 8 },
                      end: { line: 13, column: 21 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 8 },
                        end: { line: 13, column: 13 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 14 },
                        end: { line: 13, column: 21 },
                      },
                      name: "isArray",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 13, column: 22 },
                        end: { line: 13, column: 24 },
                      },
                      elements: [],
                    },
                  ],
                  optional: false,
                },
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 14, column: 8 },
                    end: { line: 14, column: 29 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 14, column: 8 },
                      end: { line: 14, column: 21 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 8 },
                        end: { line: 14, column: 13 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 14 },
                        end: { line: 14, column: 21 },
                      },
                      name: "isArray",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 14, column: 22 },
                        end: { line: 14, column: 28 },
                      },
                      elements: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 14, column: 23 },
                            end: { line: 14, column: 24 },
                          },
                          value: 1,
                        },
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 14, column: 26 },
                            end: { line: 14, column: 27 },
                          },
                          value: 2,
                        },
                      ],
                    },
                  ],
                  optional: false,
                },
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 27 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 21 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 8 },
                        end: { line: 15, column: 13 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 14 },
                        end: { line: 15, column: 21 },
                      },
                      name: "isArray",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 22 },
                        end: { line: 15, column: 26 },
                      },
                      value: "ab",
                    },
                  ],
                  optional: false,
                },
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 36 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 21 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 8 },
                        end: { line: 16, column: 13 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 14 },
                        end: { line: 16, column: 21 },
                      },
                      name: "isArray",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ObjectExpression",
                      loc: {
                        start: { line: 16, column: 22 },
                        end: { line: 16, column: 35 },
                      },
                      properties: [
                        {
                          type: "Property",
                          loc: {
                            start: { line: 16, column: 24 },
                            end: { line: 16, column: 33 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 24 },
                              end: { line: 16, column: 30 },
                            },
                            name: "length",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 32 },
                              end: { line: 16, column: 33 },
                            },
                            value: 0,
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
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 27 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 21 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 8 },
                        end: { line: 17, column: 13 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 14 },
                        end: { line: 17, column: 21 },
                      },
                      name: "isArray",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 17, column: 22 },
                        end: { line: 17, column: 26 },
                      },
                      value: null,
                    },
                  ],
                  optional: false,
                },
              ],
            },
          },
        ],
      }),
      '() => {\n    return [\n        Array.isArray([]),\n        Array.isArray([1, 2]),\n        Array.isArray("ab"),\n        Array.isArray({ length: 0 }),\n        Array.isArray(null),\n    ];\n}',
      '{"version":3,"file":"array-is-array.test.jsx","sourceRoot":"","sources":["array-is-array.test.tsx"],"names":[],"mappings":"AAUO;IACD,OAAO;QACL,KAAK,CAAC,OAAO,CAAC,EAAE,CAAC;QACjB,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;QACrB,KAAK,CAAC,OAAO,CAAC,IAAI,CAAC;QACnB,KAAK,CAAC,OAAO,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,CAAC;QAC5B,KAAK,CAAC,OAAO,CAAC,IAAI,CAAC;KACpB,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
