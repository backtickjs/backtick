import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Storage a script declares for itself, rather than one a component owns and
// splices in. `$state(...)` is an ordinary call of an imported value, and the
// cell is what the call answers with: each time it is evaluated there is
// another cell, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.create(
    "3f2468k5dp5lo:10:16",
    { params: [{ kind: "splice", value: state, bindings: [] }] },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 10, column: 19 }, end: { line: 12, column: 3 } },
      params: [
        {
          type: "Identifier",
          loc: {
            start: { line: 10, column: 20 },
            end: { line: 10, column: 25 },
          },
          name: "label",
          key: "label$3f2468k5dp5lo$0",
        },
      ],
      body: {
        type: "BlockStatement",
        loc: { start: { line: 10, column: 38 }, end: { line: 12, column: 3 } },
        body: [
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 11, column: 4 },
              end: { line: 11, column: 36 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 11, column: 11 },
                end: { line: 11, column: 35 },
              },
              properties: [
                {
                  type: "Property",
                  loc: {
                    start: { line: 11, column: 13 },
                    end: { line: 11, column: 33 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 13 },
                      end: { line: 11, column: 18 },
                    },
                    name: "label",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 11, column: 20 },
                      end: { line: 11, column: 33 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 11, column: 20 },
                        end: { line: 11, column: 26 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 11, column: 27 },
                          end: { line: 11, column: 32 },
                        },
                        name: "label",
                        key: "label$3f2468k5dp5lo$0",
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
            },
          },
        ],
      },
      expression: false,
    }),
    "export default ($0) => (label) => {\n    return { label: $0()(label) };\n};",
    '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eASmB,QAAA,CAAC,KAAa,EAAE,EAAE;IACjC,OAAO,EAAE,KAAK,EAAE,IAAM,CAAC,KAAK,CAAC,EAAE,CAAC;AAClC,CAAC"}',
  );
  return _jsx("span", {
    style: cs.create(
      "3f2468k5dp5lo:16:13",
      { params: [] },
      () => ({
        type: "Literal",
        loc: { start: { line: 16, column: 16 }, end: { line: 16, column: 33 } },
        value: "font-size: 16px",
      }),
      'export default () => "font-size: 16px";',
      '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAegB,MAAA,iBAAiB"}',
    ),
    onclick: cs.create(
      "3f2468k5dp5lo:17:15",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 17, column: 18 }, end: { line: 20, column: 7 } },
        params: [],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 17, column: 24 },
            end: { line: 20, column: 7 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 18, column: 8 },
                end: { line: 18, column: 34 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 18, column: 14 },
                    end: { line: 18, column: 33 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 14 },
                      end: { line: 18, column: 17 },
                    },
                    name: "row",
                    key: "row$3f2468k5dp5lo$1",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 20 },
                      end: { line: 18, column: 33 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 18, column: 20 },
                        end: { line: 18, column: 26 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 27 },
                          end: { line: 18, column: 32 },
                        },
                        value: "one",
                      },
                    ],
                    optional: false,
                  },
                },
              ],
            },
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 19, column: 8 },
                end: { line: 19, column: 48 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 19, column: 8 },
                  end: { line: 19, column: 47 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 21 },
                  },
                  object: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 17 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 8 },
                        end: { line: 19, column: 11 },
                      },
                      name: "row",
                      key: "row$3f2468k5dp5lo$1",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 12 },
                        end: { line: 19, column: 17 },
                      },
                      name: "label",
                    },
                    computed: false,
                    optional: false,
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 18 },
                      end: { line: 19, column: 21 },
                    },
                    name: "set",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 19, column: 22 },
                      end: { line: 19, column: 46 },
                    },
                    operator: "+",
                    left: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 19, column: 22 },
                        end: { line: 19, column: 37 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 19, column: 22 },
                          end: { line: 19, column: 35 },
                        },
                        object: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 19, column: 22 },
                            end: { line: 19, column: 31 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 22 },
                              end: { line: 19, column: 25 },
                            },
                            name: "row",
                            key: "row$3f2468k5dp5lo$1",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 26 },
                              end: { line: 19, column: 31 },
                            },
                            name: "label",
                          },
                          computed: false,
                          optional: false,
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 19, column: 32 },
                            end: { line: 19, column: 35 },
                          },
                          name: "get",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [],
                      optional: false,
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 19, column: 40 },
                        end: { line: 19, column: 46 },
                      },
                      value: " !!!",
                    },
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        expression: false,
      }),
      'export default ($0) => () => {\n    const row = $0()("one");\n    row.label.set(row.label.get() + " !!!");\n};',
      '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAgBkB,QAAA,GAAG,EAAE;IACf,MAAM,GAAG,GAAG,IAAM,CAAC,KAAK,CAAC,CAAC;IAC1B,GAAG,CAAC,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,MAAM,CAAC,CAAC;AAC1C,CAAC"}',
    ),
    children: cs.create(
      "3f2468k5dp5lo:22:7",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      () => ({
        type: "CallExpression",
        loc: { start: { line: 22, column: 10 }, end: { line: 22, column: 35 } },
        callee: {
          type: "MemberExpression",
          loc: {
            start: { line: 22, column: 10 },
            end: { line: 22, column: 33 },
          },
          object: {
            type: "MemberExpression",
            loc: {
              start: { line: 22, column: 10 },
              end: { line: 22, column: 29 },
            },
            object: {
              type: "CallExpression",
              loc: {
                start: { line: 22, column: 10 },
                end: { line: 22, column: 23 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 22, column: 10 },
                  end: { line: 22, column: 16 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 22, column: 17 },
                    end: { line: 22, column: 22 },
                  },
                  value: "one",
                },
              ],
              optional: false,
            },
            property: {
              type: "Identifier",
              loc: {
                start: { line: 22, column: 24 },
                end: { line: 22, column: 29 },
              },
              name: "label",
            },
            computed: false,
            optional: false,
          },
          property: {
            type: "Identifier",
            loc: {
              start: { line: 22, column: 30 },
              end: { line: 22, column: 33 },
            },
            name: "get",
          },
          computed: false,
          optional: false,
        },
        arguments: [],
        optional: false,
      }),
      'export default ($0) => $0()("one").label.get();',
      '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAqBU,QAAA,IAAM,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE"}',
    ),
  });
}
it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", _jsx(ScriptRows, {}));
});
