import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
it("forHeaderParts", async (t) => {
  await snapshotCase(
    t,
    "forHeaderParts",
    cs.create(
      { start: { line: 11, column: 4 }, end: { line: 19, column: 6 } },
      {
        filePath: "control-flow/for-header-parts.test.tsx",
        fileHash: "2espgmzktnj99",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 19, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 10 },
                    end: { line: 12, column: 11 },
                  },
                  name: "i",
                  key: "i$2espgmzktnj99$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 12, column: 14 },
                    end: { line: 12, column: 15 },
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
              end: { line: 13, column: 20 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 10 },
                    end: { line: 13, column: 14 },
                  },
                  name: "seen",
                  key: "seen$2espgmzktnj99$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 17 },
                    end: { line: 13, column: 19 },
                  },
                  value: "",
                },
              },
            ],
          },
          {
            type: "ForStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 17, column: 7 },
            },
            init: null,
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 14, column: 13 },
                end: { line: 14, column: 18 },
              },
              operator: "<",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 13 },
                  end: { line: 14, column: 14 },
                },
                name: "i",
                key: "i$2espgmzktnj99$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 14, column: 17 },
                  end: { line: 14, column: 18 },
                },
                value: 3,
              },
            },
            update: null,
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 14, column: 22 },
                end: { line: 17, column: 7 },
              },
              body: [
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 24 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 23 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 8 },
                        end: { line: 15, column: 12 },
                      },
                      name: "seen",
                      key: "seen$2espgmzktnj99$1",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 15, column: 15 },
                        end: { line: 15, column: 23 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 15 },
                          end: { line: 15, column: 19 },
                        },
                        name: "seen",
                        key: "seen$2espgmzktnj99$1",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 22 },
                          end: { line: 15, column: 23 },
                        },
                        name: "i",
                        key: "i$2espgmzktnj99$0",
                      },
                    },
                  },
                },
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 18 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 17 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 8 },
                        end: { line: 16, column: 9 },
                      },
                      name: "i",
                      key: "i$2espgmzktnj99$0",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 16, column: 12 },
                        end: { line: 16, column: 17 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 12 },
                          end: { line: 16, column: 13 },
                        },
                        name: "i",
                        key: "i$2espgmzktnj99$0",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 16, column: 16 },
                          end: { line: 16, column: 17 },
                        },
                        value: 1,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 18 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 13 },
                end: { line: 18, column: 17 },
              },
              name: "seen",
              key: "seen$2espgmzktnj99$1",
            },
          },
        ],
      }),
      '() => {\n    let i = 0;\n    let seen = "";\n    for (; i < 3;) {\n        seen = seen + i;\n        i = i + 1;\n    }\n    return seen;\n}',
      '{"version":3,"file":"for-header-parts.test.jsx","sourceRoot":"","sources":["for-header-parts.test.tsx"],"names":[],"mappings":"AAUO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAI,IAAI,GAAG,EAAE,CAAC;IACd,OAAO,CAAC,GAAG,CAAC,GAAI,CAAC;QACf,IAAI,GAAG,IAAI,GAAG,CAAC,CAAC;QAChB,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC;IACZ,CAAC;IACD,OAAO,IAAI,CAAC;AACd,CAAC,CAAA"}',
    ),
  );
});
