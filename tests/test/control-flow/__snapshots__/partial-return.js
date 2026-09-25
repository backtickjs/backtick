import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A value body that falls off the end completes with `undefined`.
it("partialReturnScript", async (t) => {
  await snapshotCase(
    t,
    "partialReturnScript",
    cs.create(
      "x79h35ggz599:10:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 10, column: 7 }, end: { line: 15, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 10 },
                    end: { line: 11, column: 11 },
                  },
                  name: "n",
                  key: "n$x79h35ggz599$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 14 },
                    end: { line: 11, column: 15 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "IfStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 14, column: 7 },
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 12, column: 10 },
                end: { line: 12, column: 17 },
              },
              operator: "===",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 11 },
                },
                name: "n",
                key: "n$x79h35ggz599$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 12, column: 16 },
                  end: { line: 12, column: 17 },
                },
                value: 2,
              },
            },
            consequent: {
              type: "BlockStatement",
              loc: {
                start: { line: 12, column: 19 },
                end: { line: 14, column: 7 },
              },
              body: [
                {
                  type: "ReturnStatement",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 13, column: 22 },
                  },
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 15 },
                      end: { line: 13, column: 21 },
                    },
                    value: "some",
                  },
                },
              ],
            },
            alternate: null,
          },
        ],
      }),
      '() => {\n    let n = 1;\n    if (n === 2) {\n        return "some";\n    }\n}',
      '{"version":3,"file":"partial-return.test.jsx","sourceRoot":"","sources":["partial-return.test.tsx"],"names":[],"mappings":"AASO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;QACZ,OAAO,MAAM,CAAC;IAChB,CAAC;AACH,CAAC,CAAA"}',
    ),
  );
});
it("partialReturnArrow", async (t) => {
  await snapshotCase(
    t,
    "partialReturnArrow",
    cs.create(
      "x79h35ggz599:23:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 23, column: 7 }, end: { line: 30, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 24, column: 6 },
              end: { line: 28, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 24, column: 12 },
                  end: { line: 28, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 24, column: 12 },
                    end: { line: 24, column: 16 },
                  },
                  name: "pick",
                  key: "pick$x79h35ggz599$1",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 24, column: 19 },
                    end: { line: 28, column: 7 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 24, column: 20 },
                        end: { line: 24, column: 21 },
                      },
                      name: "b",
                      key: "b$x79h35ggz599$2",
                    },
                  ],
                  body: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 24, column: 35 },
                      end: { line: 28, column: 7 },
                    },
                    body: [
                      {
                        type: "IfStatement",
                        loc: {
                          start: { line: 25, column: 8 },
                          end: { line: 27, column: 9 },
                        },
                        test: {
                          type: "Identifier",
                          loc: {
                            start: { line: 25, column: 12 },
                            end: { line: 25, column: 13 },
                          },
                          name: "b",
                          key: "b$x79h35ggz599$2",
                        },
                        consequent: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 25, column: 15 },
                            end: { line: 27, column: 9 },
                          },
                          body: [
                            {
                              type: "ReturnStatement",
                              loc: {
                                start: { line: 26, column: 10 },
                                end: { line: 26, column: 25 },
                              },
                              argument: {
                                type: "Literal",
                                loc: {
                                  start: { line: 26, column: 17 },
                                  end: { line: 26, column: 24 },
                                },
                                value: "taken",
                              },
                            },
                          ],
                        },
                        alternate: null,
                      },
                    ],
                  },
                  expression: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 39 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 29, column: 13 },
                end: { line: 29, column: 38 },
              },
              elements: [
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 29, column: 14 },
                    end: { line: 29, column: 24 },
                  },
                  callee: {
                    type: "Identifier",
                    loc: {
                      start: { line: 29, column: 14 },
                      end: { line: 29, column: 18 },
                    },
                    name: "pick",
                    key: "pick$x79h35ggz599$1",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 29, column: 19 },
                        end: { line: 29, column: 23 },
                      },
                      value: true,
                    },
                  ],
                  optional: false,
                },
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 29, column: 26 },
                    end: { line: 29, column: 37 },
                  },
                  callee: {
                    type: "Identifier",
                    loc: {
                      start: { line: 29, column: 26 },
                      end: { line: 29, column: 30 },
                    },
                    name: "pick",
                    key: "pick$x79h35ggz599$1",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 29, column: 31 },
                        end: { line: 29, column: 36 },
                      },
                      value: false,
                    },
                  ],
                  optional: false,
                },
              ],
            },
          },
        ],
      }),
      '() => {\n    const pick = (b) => {\n        if (b) {\n            return "taken";\n        }\n    };\n    return [pick(true), pick(false)];\n}',
      '{"version":3,"file":"partial-return.test.jsx","sourceRoot":"","sources":["partial-return.test.tsx"],"names":[],"mappings":"AAsBO;IACD,MAAM,IAAI,GAAG,CAAC,CAAU,EAAE,EAAE;QAC1B,IAAI,CAAC,EAAE,CAAC;YACN,OAAO,OAAO,CAAC;QACjB,CAAC;IACH,CAAC,CAAC;IACF,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,EAAE,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC;AACnC,CAAC,CAAA"}',
    ),
  );
});
