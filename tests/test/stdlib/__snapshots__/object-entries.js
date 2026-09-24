import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A record read as pairs and built back from them: how a script makes a
// record whose keys it only learns when it runs.
it("objectEntries", async (t) => {
  await snapshotCase(
    t,
    "objectEntries",
    cs.create(
      { start: { line: 11, column: 4 }, end: { line: 17, column: 6 } },
      { fileHash: "txb5yf5uyd2o", splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 17, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 38 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 12, column: 12 },
                  end: { line: 12, column: 37 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 12 },
                    end: { line: 12, column: 16 },
                  },
                  name: "held",
                  key: "held$txb5yf5uyd2o$0",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 12, column: 19 },
                    end: { line: 12, column: 37 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 12, column: 21 },
                        end: { line: 12, column: 25 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 21 },
                          end: { line: 12, column: 22 },
                        },
                        name: "n",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 12, column: 24 },
                          end: { line: 12, column: 25 },
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
                        start: { line: 12, column: 27 },
                        end: { line: 12, column: 35 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 27 },
                          end: { line: 12, column: 28 },
                        },
                        name: "q",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 12, column: 30 },
                          end: { line: 12, column: 35 },
                        },
                        value: "ada",
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
              start: { line: 13, column: 6 },
              end: { line: 15, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 15, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 19 },
                  },
                  name: "written",
                  key: "written$txb5yf5uyd2o$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 13, column: 22 },
                    end: { line: 15, column: 7 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 13, column: 22 },
                      end: { line: 13, column: 40 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 22 },
                        end: { line: 13, column: 28 },
                      },
                      name: "Object",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 29 },
                        end: { line: 13, column: 40 },
                      },
                      name: "fromEntries",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "CallExpression",
                      loc: {
                        start: { line: 14, column: 8 },
                        end: { line: 14, column: 78 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 14, column: 8 },
                          end: { line: 14, column: 32 },
                        },
                        object: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 14, column: 8 },
                            end: { line: 14, column: 28 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 14, column: 8 },
                              end: { line: 14, column: 22 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 8 },
                                end: { line: 14, column: 14 },
                              },
                              name: "Object",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 15 },
                                end: { line: 14, column: 22 },
                              },
                              name: "entries",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 23 },
                                end: { line: 14, column: 27 },
                              },
                              name: "held",
                              key: "held$txb5yf5uyd2o$0",
                            },
                          ],
                          optional: false,
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 14, column: 29 },
                            end: { line: 14, column: 32 },
                          },
                          name: "map",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [
                        {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 14, column: 33 },
                            end: { line: 14, column: 77 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 34 },
                                end: { line: 14, column: 38 },
                              },
                              name: "pair",
                              key: "pair$txb5yf5uyd2o$2",
                            },
                          ],
                          body: {
                            type: "ArrayExpression",
                            loc: {
                              start: { line: 14, column: 43 },
                              end: { line: 14, column: 77 },
                            },
                            elements: [
                              {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 14, column: 44 },
                                  end: { line: 14, column: 51 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 14, column: 44 },
                                    end: { line: 14, column: 48 },
                                  },
                                  name: "pair",
                                  key: "pair$txb5yf5uyd2o$2",
                                },
                                property: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 14, column: 49 },
                                    end: { line: 14, column: 50 },
                                  },
                                  value: 0,
                                },
                                computed: true,
                                optional: false,
                              },
                              {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 14, column: 53 },
                                  end: { line: 14, column: 76 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 14, column: 53 },
                                    end: { line: 14, column: 67 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 14, column: 53 },
                                      end: { line: 14, column: 57 },
                                    },
                                    name: "JSON",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 14, column: 58 },
                                      end: { line: 14, column: 67 },
                                    },
                                    name: "stringify",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 14, column: 68 },
                                      end: { line: 14, column: 75 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 14, column: 68 },
                                        end: { line: 14, column: 72 },
                                      },
                                      name: "pair",
                                      key: "pair$txb5yf5uyd2o$2",
                                    },
                                    property: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 14, column: 73 },
                                        end: { line: 14, column: 74 },
                                      },
                                      value: 1,
                                    },
                                    computed: true,
                                    optional: false,
                                  },
                                ],
                                optional: false,
                              },
                            ],
                          },
                          expression: true,
                        },
                      ],
                      optional: false,
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 41 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 16, column: 13 },
                end: { line: 16, column: 40 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 16, column: 13 },
                  end: { line: 16, column: 28 },
                },
                operator: "+",
                left: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 16, column: 13 },
                    end: { line: 16, column: 22 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 13 },
                      end: { line: 16, column: 20 },
                    },
                    name: "written",
                    key: "written$txb5yf5uyd2o$1",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 21 },
                      end: { line: 16, column: 22 },
                    },
                    name: "n",
                  },
                  computed: false,
                  optional: false,
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 16, column: 25 },
                    end: { line: 16, column: 28 },
                  },
                  value: " ",
                },
              },
              right: {
                type: "MemberExpression",
                loc: {
                  start: { line: 16, column: 31 },
                  end: { line: 16, column: 40 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 31 },
                    end: { line: 16, column: 38 },
                  },
                  name: "written",
                  key: "written$txb5yf5uyd2o$1",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 39 },
                    end: { line: 16, column: 40 },
                  },
                  name: "q",
                },
                computed: false,
                optional: false,
              },
            },
          },
        ],
      }),
      '() => {\n    const held = { n: 1, q: "ada" };\n    const written = Object.fromEntries(Object.entries(held).map((pair) => [pair[0], JSON.stringify(pair[1])]));\n    return written.n + " " + written.q;\n}',
      '{"version":3,"file":"object-entries.test.jsx","sourceRoot":"","sources":["object-entries.test.tsx"],"names":[],"mappings":"AAUO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,KAAK,EAAE,CAAC;IAChC,MAAM,OAAO,GAAG,MAAM,CAAC,WAAW,CAChC,MAAM,CAAC,OAAO,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACvE,CAAC;IACF,OAAO,OAAO,CAAC,CAAC,GAAG,GAAG,GAAG,OAAO,CAAC,CAAC,CAAC;AACrC,CAAC,CAAA"}',
    ),
  );
});
