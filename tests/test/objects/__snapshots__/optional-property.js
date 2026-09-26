import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.create(
  "1pn78z89zmc5d:8:13",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 8, column: 16 }, end: { line: 10, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 8, column: 17 }, end: { line: 8, column: 18 } },
        name: "o",
        key: "o$1pn78z89zmc5d$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 8, column: 66 }, end: { line: 10, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 36 } },
          argument: {
            type: "ArrayExpression",
            loc: {
              start: { line: 9, column: 9 },
              end: { line: 9, column: 35 },
            },
            elements: [
              {
                type: "MemberExpression",
                loc: {
                  start: { line: 9, column: 10 },
                  end: { line: 9, column: 17 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 9, column: 10 },
                    end: { line: 9, column: 11 },
                  },
                  name: "o",
                  key: "o$1pn78z89zmc5d$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 9, column: 12 },
                    end: { line: 9, column: 17 },
                  },
                  name: "label",
                },
                computed: false,
                optional: false,
              },
              {
                type: "LogicalExpression",
                loc: {
                  start: { line: 9, column: 19 },
                  end: { line: 9, column: 34 },
                },
                operator: "??",
                left: {
                  type: "ChainExpression",
                  loc: {
                    start: { line: 9, column: 19 },
                    end: { line: 9, column: 29 },
                  },
                  expression: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 9, column: 19 },
                      end: { line: 9, column: 29 },
                    },
                    object: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 9, column: 19 },
                        end: { line: 9, column: 26 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 9, column: 19 },
                          end: { line: 9, column: 20 },
                        },
                        name: "o",
                        key: "o$1pn78z89zmc5d$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 9, column: 21 },
                          end: { line: 9, column: 26 },
                        },
                        name: "inner",
                      },
                      computed: false,
                      optional: false,
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 9, column: 28 },
                        end: { line: 9, column: 29 },
                      },
                      name: "z",
                    },
                    computed: false,
                    optional: true,
                  },
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 9, column: 33 },
                    end: { line: 9, column: 34 },
                  },
                  value: 0,
                },
              },
            ],
          },
        },
      ],
    },
    expression: false,
  }),
  {
    code: "export default () => (o) => {\n    return [o.label, o.inner?.z ?? 0];\n};",
    map: '{"version":3,"file":"optional-property.test.jsx","sourceRoot":"","sources":["optional-property.test.tsx"],"names":[],"mappings":"eAOgB,MAAA,CAAC,CAA4C,EAAE,EAAE;IAC/D,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,KAAK,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC;AACpC,CAAC"}',
  },
);
it("optionalProperty", async (t) => {
  await snapshotCase(
    t,
    "optionalProperty",
    cs.create(
      "1pn78z89zmc5d:16:4",
      { params: [{ kind: "splice", value: read, bindings: [] }] },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 16, column: 8 }, end: { line: 20, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 53 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 13 },
              },
              name: "present",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 17, column: 15 },
                end: { line: 17, column: 53 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 17, column: 15 },
                  end: { line: 17, column: 20 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 17, column: 21 },
                    end: { line: 17, column: 52 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 17, column: 23 },
                        end: { line: 17, column: 33 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 23 },
                          end: { line: 17, column: 28 },
                        },
                        name: "label",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 30 },
                          end: { line: 17, column: 33 },
                        },
                        value: "a",
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                    {
                      type: "Property",
                      loc: {
                        start: { line: 17, column: 35 },
                        end: { line: 17, column: 50 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 35 },
                          end: { line: 17, column: 40 },
                        },
                        name: "inner",
                      },
                      value: {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 17, column: 42 },
                          end: { line: 17, column: 50 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 17, column: 44 },
                              end: { line: 17, column: 48 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 17, column: 44 },
                                end: { line: 17, column: 45 },
                              },
                              name: "z",
                            },
                            value: {
                              type: "Literal",
                              loc: {
                                start: { line: 17, column: 47 },
                                end: { line: 17, column: 48 },
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
              start: { line: 18, column: 6 },
              end: { line: 18, column: 47 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 13 },
              },
              name: "partial",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 18, column: 15 },
                end: { line: 18, column: 47 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 15 },
                  end: { line: 18, column: 20 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 18, column: 21 },
                    end: { line: 18, column: 46 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 18, column: 23 },
                        end: { line: 18, column: 33 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 23 },
                          end: { line: 18, column: 28 },
                        },
                        name: "label",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 30 },
                          end: { line: 18, column: 33 },
                        },
                        value: "b",
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                    {
                      type: "Property",
                      loc: {
                        start: { line: 18, column: 35 },
                        end: { line: 18, column: 44 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 35 },
                          end: { line: 18, column: 40 },
                        },
                        name: "inner",
                      },
                      value: {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 18, column: 42 },
                          end: { line: 18, column: 44 },
                        },
                        properties: [],
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
              start: { line: 19, column: 6 },
              end: { line: 19, column: 36 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 13 },
              },
              name: "omitted",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 19, column: 15 },
                end: { line: 19, column: 36 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 19, column: 15 },
                  end: { line: 19, column: 20 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 19, column: 21 },
                    end: { line: 19, column: 35 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 19, column: 23 },
                        end: { line: 19, column: 33 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 23 },
                          end: { line: 19, column: 28 },
                        },
                        name: "label",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 19, column: 30 },
                          end: { line: 19, column: 33 },
                        },
                        value: "c",
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
        ],
      }),
      {
        code: 'export default ($0) => ({\n    present: $0()({ label: "a", inner: { z: 3 } }),\n    partial: $0()({ label: "b", inner: {} }),\n    omitted: $0()({ label: "c" }),\n});',
        map: '{"version":3,"file":"optional-property.test.jsx","sourceRoot":"","sources":["optional-property.test.tsx"],"names":[],"mappings":"eAeO,QAAA,CAAC;IACF,OAAO,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,GAAG,EAAE,KAAK,EAAE,EAAE,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC;IAC/C,OAAO,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,GAAG,EAAE,KAAK,EAAE,EAAE,EAAE,CAAC;IACzC,OAAO,EAAE,IAAK,CAAC,EAAE,KAAK,EAAE,GAAG,EAAE,CAAC;CAC/B,CAAC"}',
      },
    ),
  );
});
