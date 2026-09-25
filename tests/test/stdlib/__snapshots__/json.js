import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Text in, value out, and back again. What round-trips is the format's to say
// — so what is here is what every host spells the same way, and a value a
// host could not hand back is not a value this admits.
it("jsonRoundTrip", async (t) => {
  await snapshotCase(
    t,
    "jsonRoundTrip",
    cs.create(
      "1nb9j9gha9a2e:12:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 31, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 48 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 47 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 19 },
                  },
                  name: "numbers",
                  key: "numbers$1nb9j9gha9a2e$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 13, column: 22 },
                    end: { line: 13, column: 47 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 13, column: 22 },
                      end: { line: 13, column: 36 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 22 },
                        end: { line: 13, column: 26 },
                      },
                      name: "JSON",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 27 },
                        end: { line: 13, column: 36 },
                      },
                      name: "stringify",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 13, column: 37 },
                        end: { line: 13, column: 46 },
                      },
                      elements: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 13, column: 38 },
                            end: { line: 13, column: 39 },
                          },
                          value: 1,
                        },
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 13, column: 41 },
                            end: { line: 13, column: 42 },
                          },
                          value: 2,
                        },
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 13, column: 44 },
                            end: { line: 13, column: 45 },
                          },
                          value: 3,
                        },
                      ],
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 40 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 39 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 16 },
                  },
                  name: "text",
                  key: "text$1nb9j9gha9a2e$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 14, column: 19 },
                    end: { line: 14, column: 39 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 14, column: 19 },
                      end: { line: 14, column: 33 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 19 },
                        end: { line: 14, column: 23 },
                      },
                      name: "JSON",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 24 },
                        end: { line: 14, column: 33 },
                      },
                      name: "stringify",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 34 },
                        end: { line: 14, column: 38 },
                      },
                      value: "hi",
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 40 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 39 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 16 },
                  },
                  name: "flag",
                  key: "flag$1nb9j9gha9a2e$2",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 15, column: 19 },
                    end: { line: 15, column: 39 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 15, column: 19 },
                      end: { line: 15, column: 33 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 19 },
                        end: { line: 15, column: 23 },
                      },
                      name: "JSON",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 24 },
                        end: { line: 15, column: 33 },
                      },
                      name: "stringify",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 34 },
                        end: { line: 15, column: 38 },
                      },
                      value: true,
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 54 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 16, column: 12 },
                  end: { line: 16, column: 53 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 16 },
                  },
                  name: "held",
                  key: "held$1nb9j9gha9a2e$3",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 16, column: 19 },
                    end: { line: 16, column: 53 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 16, column: 19 },
                      end: { line: 16, column: 33 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 19 },
                        end: { line: 16, column: 23 },
                      },
                      name: "JSON",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 24 },
                        end: { line: 16, column: 33 },
                      },
                      name: "stringify",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ObjectExpression",
                      loc: {
                        start: { line: 16, column: 34 },
                        end: { line: 16, column: 52 },
                      },
                      properties: [
                        {
                          type: "Property",
                          loc: {
                            start: { line: 16, column: 36 },
                            end: { line: 16, column: 40 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 36 },
                              end: { line: 16, column: 37 },
                            },
                            name: "a",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 39 },
                              end: { line: 16, column: 40 },
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
                            start: { line: 16, column: 42 },
                            end: { line: 16, column: 50 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 42 },
                              end: { line: 16, column: 43 },
                            },
                            name: "b",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 45 },
                              end: { line: 16, column: 50 },
                            },
                            value: "two",
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
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 39 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 12 },
                  end: { line: 17, column: 38 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 16 },
                  },
                  name: "back",
                  key: "back$1nb9j9gha9a2e$4",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 17, column: 19 },
                    end: { line: 17, column: 38 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 17, column: 19 },
                      end: { line: 17, column: 29 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 19 },
                        end: { line: 17, column: 23 },
                      },
                      name: "JSON",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 24 },
                        end: { line: 17, column: 29 },
                      },
                      name: "parse",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 30 },
                        end: { line: 17, column: 37 },
                      },
                      name: "numbers",
                      key: "numbers$1nb9j9gha9a2e$0",
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
              start: { line: 18, column: 6 },
              end: { line: 30, column: 8 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 19, column: 8 },
                end: { line: 29, column: 40 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 19, column: 8 },
                  end: { line: 28, column: 11 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 27, column: 28 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 26, column: 11 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 19, column: 8 },
                        end: { line: 25, column: 12 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 19, column: 8 },
                          end: { line: 24, column: 11 },
                        },
                        operator: "+",
                        left: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 19, column: 8 },
                            end: { line: 23, column: 12 },
                          },
                          operator: "+",
                          left: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 19, column: 8 },
                              end: { line: 22, column: 11 },
                            },
                            operator: "+",
                            left: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 19, column: 8 },
                                end: { line: 21, column: 12 },
                              },
                              operator: "+",
                              left: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 19, column: 8 },
                                  end: { line: 20, column: 11 },
                                },
                                operator: "+",
                                left: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 19, column: 8 },
                                    end: { line: 19, column: 15 },
                                  },
                                  name: "numbers",
                                  key: "numbers$1nb9j9gha9a2e$0",
                                },
                                right: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 20, column: 8 },
                                    end: { line: 20, column: 11 },
                                  },
                                  value: "|",
                                },
                              },
                              right: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 21, column: 8 },
                                  end: { line: 21, column: 12 },
                                },
                                name: "text",
                                key: "text$1nb9j9gha9a2e$1",
                              },
                            },
                            right: {
                              type: "Literal",
                              loc: {
                                start: { line: 22, column: 8 },
                                end: { line: 22, column: 11 },
                              },
                              value: "|",
                            },
                          },
                          right: {
                            type: "Identifier",
                            loc: {
                              start: { line: 23, column: 8 },
                              end: { line: 23, column: 12 },
                            },
                            name: "flag",
                            key: "flag$1nb9j9gha9a2e$2",
                          },
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 24, column: 8 },
                            end: { line: 24, column: 11 },
                          },
                          value: "|",
                        },
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 25, column: 8 },
                          end: { line: 25, column: 12 },
                        },
                        name: "held",
                        key: "held$1nb9j9gha9a2e$3",
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 26, column: 8 },
                        end: { line: 26, column: 11 },
                      },
                      value: "|",
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 27, column: 8 },
                      end: { line: 27, column: 28 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 27, column: 8 },
                        end: { line: 27, column: 22 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 8 },
                          end: { line: 27, column: 12 },
                        },
                        name: "JSON",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 13 },
                          end: { line: 27, column: 22 },
                        },
                        name: "stringify",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 23 },
                          end: { line: 27, column: 27 },
                        },
                        name: "back",
                        key: "back$1nb9j9gha9a2e$4",
                      },
                    ],
                    optional: false,
                  },
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 8 },
                    end: { line: 28, column: 11 },
                  },
                  value: "|",
                },
              },
              right: {
                type: "CallExpression",
                loc: {
                  start: { line: 29, column: 8 },
                  end: { line: 29, column: 40 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 29, column: 22 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 29, column: 8 },
                      end: { line: 29, column: 12 },
                    },
                    name: "JSON",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 29, column: 13 },
                      end: { line: 29, column: 22 },
                    },
                    name: "stringify",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "CallExpression",
                    loc: {
                      start: { line: 29, column: 23 },
                      end: { line: 29, column: 39 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 29, column: 23 },
                        end: { line: 29, column: 33 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 29, column: 23 },
                          end: { line: 29, column: 27 },
                        },
                        name: "JSON",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 29, column: 28 },
                          end: { line: 29, column: 33 },
                        },
                        name: "parse",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 29, column: 34 },
                          end: { line: 29, column: 38 },
                        },
                        name: "held",
                        key: "held$1nb9j9gha9a2e$3",
                      },
                    ],
                    optional: false,
                  },
                ],
                optional: false,
              },
            },
          },
        ],
      }),
      '() => {\n    const numbers = JSON.stringify([1, 2, 3]);\n    const text = JSON.stringify("hi");\n    const flag = JSON.stringify(true);\n    const held = JSON.stringify({ a: 1, b: "two" });\n    const back = JSON.parse(numbers);\n    return (numbers +\n        "|" +\n        text +\n        "|" +\n        flag +\n        "|" +\n        held +\n        "|" +\n        JSON.stringify(back) +\n        "|" +\n        JSON.stringify(JSON.parse(held)));\n}',
      '{"version":3,"file":"json.test.jsx","sourceRoot":"","sources":["json.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,OAAO,GAAG,IAAI,CAAC,SAAS,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;IAC1C,MAAM,IAAI,GAAG,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,CAAC;IAClC,MAAM,IAAI,GAAG,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,CAAC;IAClC,MAAM,IAAI,GAAG,IAAI,CAAC,SAAS,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,KAAK,EAAE,CAAC,CAAC;IAChD,MAAM,IAAI,GAAG,IAAI,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC;IACjC,OAAO,CACL,OAAO;QACP,GAAG;QACH,IAAI;QACJ,GAAG;QACH,IAAI;QACJ,GAAG;QACH,IAAI;QACJ,GAAG;QACH,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC;QACpB,GAAG;QACH,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,CACjC,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
