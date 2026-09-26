import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
it("capturedCounter", async (t) => {
  await snapshotCase(
    t,
    "capturedCounter",
    cs.create(
      "2s7xqailmdcpa:11:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 18, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 20 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 10 },
                    end: { line: 12, column: 15 },
                  },
                  name: "count",
                  key: "count$2s7xqailmdcpa$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 12, column: 18 },
                    end: { line: 12, column: 19 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 16, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 16, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 16 },
                  },
                  name: "bump",
                  key: "bump$2s7xqailmdcpa$1",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 13, column: 19 },
                    end: { line: 16, column: 7 },
                  },
                  params: [],
                  body: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 13, column: 25 },
                      end: { line: 16, column: 7 },
                    },
                    body: [
                      {
                        type: "ExpressionStatement",
                        loc: {
                          start: { line: 14, column: 8 },
                          end: { line: 14, column: 26 },
                        },
                        expression: {
                          type: "AssignmentExpression",
                          loc: {
                            start: { line: 14, column: 8 },
                            end: { line: 14, column: 25 },
                          },
                          operator: "=",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 8 },
                              end: { line: 14, column: 13 },
                            },
                            name: "count",
                            key: "count$2s7xqailmdcpa$0",
                          },
                          right: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 14, column: 16 },
                              end: { line: 14, column: 25 },
                            },
                            operator: "+",
                            left: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 16 },
                                end: { line: 14, column: 21 },
                              },
                              name: "count",
                              key: "count$2s7xqailmdcpa$0",
                            },
                            right: {
                              type: "Literal",
                              loc: {
                                start: { line: 14, column: 24 },
                                end: { line: 14, column: 25 },
                              },
                              value: 1,
                            },
                          },
                        },
                      },
                      {
                        type: "ReturnStatement",
                        loc: {
                          start: { line: 15, column: 8 },
                          end: { line: 15, column: 21 },
                        },
                        argument: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 15 },
                            end: { line: 15, column: 20 },
                          },
                          name: "count",
                          key: "count$2s7xqailmdcpa$0",
                        },
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
              start: { line: 17, column: 6 },
              end: { line: 17, column: 29 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 17, column: 13 },
                end: { line: 17, column: 28 },
              },
              operator: "+",
              left: {
                type: "CallExpression",
                loc: {
                  start: { line: 17, column: 13 },
                  end: { line: 17, column: 19 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 13 },
                    end: { line: 17, column: 17 },
                  },
                  name: "bump",
                  key: "bump$2s7xqailmdcpa$1",
                },
                arguments: [],
                optional: false,
              },
              right: {
                type: "CallExpression",
                loc: {
                  start: { line: 17, column: 22 },
                  end: { line: 17, column: 28 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 22 },
                    end: { line: 17, column: 26 },
                  },
                  name: "bump",
                  key: "bump$2s7xqailmdcpa$1",
                },
                arguments: [],
                optional: false,
              },
            },
          },
        ],
      }),
      {
        code: "export default () => {\n    let count = 0;\n    const bump = () => {\n        count = count + 1;\n        return count;\n    };\n    return bump() + bump();\n};",
        map: '{"version":3,"file":"captured-counter.test.jsx","sourceRoot":"","sources":["captured-counter.test.tsx"],"names":[],"mappings":"eAUO;IACD,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,MAAM,IAAI,GAAG,GAAG,EAAE;QAChB,KAAK,GAAG,KAAK,GAAG,CAAC,CAAC;QAClB,OAAO,KAAK,CAAC;IACf,CAAC,CAAC;IACF,OAAO,IAAI,EAAE,GAAG,IAAI,EAAE,CAAC;AACzB,CAAC"}',
      },
    ),
  );
});
