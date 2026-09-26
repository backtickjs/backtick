import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key computed while the script runs. A literal that holds one is
// `Object.fromEntries` over its pairs, as one a spread runs through is: its
// key has no text to ship as data. Keys are evaluated in order, and a later
// one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs.create(
      "27b2r7injyzq0:13:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 13, column: 7 }, end: { line: 22, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 34 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 33 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 16 },
                  },
                  name: "base",
                  key: "base$27b2r7injyzq0$0",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 14, column: 19 },
                    end: { line: 14, column: 33 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 14, column: 21 },
                        end: { line: 14, column: 25 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 21 },
                          end: { line: 14, column: 22 },
                        },
                        name: "a",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 14, column: 24 },
                          end: { line: 14, column: 25 },
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
                        start: { line: 14, column: 27 },
                        end: { line: 14, column: 31 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 27 },
                          end: { line: 14, column: 28 },
                        },
                        name: "b",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 14, column: 30 },
                          end: { line: 14, column: 31 },
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
              start: { line: 15, column: 6 },
              end: { line: 15, column: 23 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 22 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 16 },
                  },
                  name: "name",
                  key: "name$27b2r7injyzq0$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 19 },
                    end: { line: 15, column: 22 },
                  },
                  value: "b",
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 21, column: 8 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 16, column: 13 },
                end: { line: 21, column: 7 },
              },
              properties: [
                {
                  type: "SpreadElement",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 15 },
                  },
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 11 },
                      end: { line: 17, column: 15 },
                    },
                    name: "base",
                    key: "base$27b2r7injyzq0$0",
                  },
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 17 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 9 },
                      end: { line: 18, column: 13 },
                    },
                    name: "name",
                    key: "name$27b2r7injyzq0$1",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 18, column: 16 },
                      end: { line: 18, column: 17 },
                    },
                    value: 9,
                  },
                  kind: "init",
                  computed: true,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 22 },
                  },
                  key: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 19, column: 9 },
                      end: { line: 19, column: 18 },
                    },
                    operator: "+",
                    left: {
                      type: "Literal",
                      loc: {
                        start: { line: 19, column: 9 },
                        end: { line: 19, column: 12 },
                      },
                      value: "c",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 19, column: 15 },
                        end: { line: 19, column: 18 },
                      },
                      value: "d",
                    },
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 19, column: 21 },
                      end: { line: 19, column: 22 },
                    },
                    value: 3,
                  },
                  kind: "init",
                  computed: true,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 12 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 20, column: 9 },
                    },
                    name: "a",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 20, column: 11 },
                      end: { line: 20, column: 12 },
                    },
                    value: 4,
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
      {
        code: 'export default () => {\n    const base = { a: 1, b: 2 };\n    const name = "b";\n    return {\n        ...base,\n        [name]: 9,\n        ["c" + "d"]: 3,\n        a: 4,\n    };\n};',
        map: '{"version":3,"file":"computed-key.test.jsx","sourceRoot":"","sources":["computed-key.test.tsx"],"names":[],"mappings":"eAYO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IAC5B,MAAM,IAAI,GAAG,GAAG,CAAC;IACjB,OAAO;QACL,GAAG,IAAI;QACP,CAAC,IAAI,CAAC,EAAE,CAAC;QACT,CAAC,GAAG,GAAG,GAAG,CAAC,EAAE,CAAC;QACd,CAAC,EAAE,CAAC;KACL,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
