import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A nested script captures a variable's value, and an object's value is a
// reference: assigning to a member of a captured object writes the one object
// the enclosing script holds.
it("capturedObjectAssignment", async (t) => {
  await snapshotCase(
    t,
    "capturedObjectAssignment",
    cs.create(
      "385xpgt8q0ek2:12:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "385xpgt8q0ek2:14:21",
              { params: [{ kind: "capture", key: "counter$385xpgt8q0ek2$0" }] },
              () => ({
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 14, column: 24 },
                  end: { line: 16, column: 7 },
                },
                params: [],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 14, column: 30 },
                    end: { line: 16, column: 7 },
                  },
                  body: [
                    {
                      type: "ExpressionStatement",
                      loc: {
                        start: { line: 15, column: 8 },
                        end: { line: 15, column: 27 },
                      },
                      expression: {
                        type: "AssignmentExpression",
                        loc: {
                          start: { line: 15, column: 8 },
                          end: { line: 15, column: 26 },
                        },
                        operator: "+=",
                        left: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 8 },
                            end: { line: 15, column: 21 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 8 },
                              end: { line: 15, column: 15 },
                            },
                            name: "counter",
                            key: "counter$385xpgt8q0ek2$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 16 },
                              end: { line: 15, column: 21 },
                            },
                            name: "count",
                          },
                          computed: false,
                          optional: false,
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 15, column: 25 },
                            end: { line: 15, column: 26 },
                          },
                          value: 1,
                        },
                      },
                    },
                  ],
                },
                expression: false,
              }),
              "$0 => () => {\n    $0.count += 1;\n}",
              '{"version":3,"file":"captured-object-assignment.test.jsx","sourceRoot":"","sources":["captured-object-assignment.test.tsx"],"names":[],"mappings":"AAawB,MAAA,GAAG,EAAE;IACrB,EAAO,CAAC,KAAK,IAAI,CAAC,CAAC;AACrB,CAAC,CAAA"}',
            ),
            bindings: ["counter$385xpgt8q0ek2$0"],
          },
        ],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 20, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 35 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 34 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 19 },
                  },
                  name: "counter",
                  key: "counter$385xpgt8q0ek2$0",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 13, column: 22 },
                    end: { line: 13, column: 34 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 13, column: 24 },
                        end: { line: 13, column: 32 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 13, column: 24 },
                          end: { line: 13, column: 29 },
                        },
                        name: "count",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 31 },
                          end: { line: 13, column: 32 },
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
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 16, column: 10 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 16, column: 9 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 16 },
                  },
                  name: "bump",
                  key: "bump$385xpgt8q0ek2$1",
                },
                init: {
                  type: "Splice",
                  loc: {
                    start: { line: 14, column: 19 },
                    end: { line: 16, column: 9 },
                  },
                  param: 0,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 13 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 12 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 6 },
                  end: { line: 17, column: 10 },
                },
                name: "bump",
                key: "bump$385xpgt8q0ek2$1",
              },
              arguments: [],
              optional: false,
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 13 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 12 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 6 },
                  end: { line: 18, column: 10 },
                },
                name: "bump",
                key: "bump$385xpgt8q0ek2$1",
              },
              arguments: [],
              optional: false,
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 27 },
            },
            argument: {
              type: "MemberExpression",
              loc: {
                start: { line: 19, column: 13 },
                end: { line: 19, column: 26 },
              },
              object: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 13 },
                  end: { line: 19, column: 20 },
                },
                name: "counter",
                key: "counter$385xpgt8q0ek2$0",
              },
              property: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 21 },
                  end: { line: 19, column: 26 },
                },
                name: "count",
              },
              computed: false,
              optional: false,
            },
          },
        ],
      }),
      "$0 => {\n    const counter = { count: 0 };\n    const bump = $0(counter);\n    bump();\n    bump();\n    return counter.count;\n}",
      '{"version":3,"file":"captured-object-assignment.test.jsx","sourceRoot":"","sources":["captured-object-assignment.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,OAAO,GAAG,EAAE,KAAK,EAAE,CAAC,EAAE,CAAC;IAC7B,MAAM,IAAI,GAAG,WAAC,CAEV;IACJ,IAAI,EAAE,CAAC;IACP,IAAI,EAAE,CAAC;IACP,OAAO,OAAO,CAAC,KAAK,CAAC;AACvB,CAAC,CAAA"}',
    ),
  );
});
