import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "@backtickjs/web-testing";
// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "3265muyjx857r:9:32",
          { params: [] },
          () => ({
            type: "BinaryExpression",
            loc: {
              start: { line: 9, column: 35 },
              end: { line: 9, column: 48 },
            },
            operator: "===",
            left: {
              type: "Literal",
              loc: {
                start: { line: 9, column: 35 },
                end: { line: 9, column: 39 },
              },
              value: null,
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 9, column: 44 },
                end: { line: 9, column: 48 },
              },
              value: null,
            },
          }),
          "export default () => null === null;",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["null-undefined-equality.test.tsx"],"names":[],"mappings":"eAQmC,MAAA,IAAI,KAAK,IAAI"}',
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "3265muyjx857r:10:32",
          { params: [] },
          () => ({
            type: "BinaryExpression",
            loc: {
              start: { line: 10, column: 35 },
              end: { line: 10, column: 58 },
            },
            operator: "===",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 10, column: 35 },
                end: { line: 10, column: 44 },
              },
              name: "undefined",
            },
            right: {
              type: "Identifier",
              loc: {
                start: { line: 10, column: 49 },
                end: { line: 10, column: 58 },
              },
              name: "undefined",
            },
          }),
          "export default () => undefined === undefined;",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["null-undefined-equality.test.tsx"],"names":[],"mappings":"eASmC,MAAA,SAAS,KAAK,SAAS"}',
        ),
      ),
      true,
    );
  });
  it("are not equal to each other", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "3265muyjx857r:14:32",
          { params: [] },
          () => ({
            type: "BinaryExpression",
            loc: {
              start: { line: 14, column: 35 },
              end: { line: 14, column: 53 },
            },
            operator: "!==",
            left: {
              type: "Literal",
              loc: {
                start: { line: 14, column: 35 },
                end: { line: 14, column: 39 },
              },
              value: null,
            },
            right: {
              type: "Identifier",
              loc: {
                start: { line: 14, column: 44 },
                end: { line: 14, column: 53 },
              },
              name: "undefined",
            },
          }),
          "export default () => null !== undefined;",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["null-undefined-equality.test.tsx"],"names":[],"mappings":"eAamC,MAAA,IAAI,KAAK,SAAS"}',
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "3265muyjx857r:15:32",
          { params: [] },
          () => ({
            type: "BinaryExpression",
            loc: {
              start: { line: 15, column: 35 },
              end: { line: 15, column: 53 },
            },
            operator: "===",
            left: {
              type: "Literal",
              loc: {
                start: { line: 15, column: 35 },
                end: { line: 15, column: 39 },
              },
              value: null,
            },
            right: {
              type: "Identifier",
              loc: {
                start: { line: 15, column: 44 },
                end: { line: 15, column: 53 },
              },
              name: "undefined",
            },
          }),
          "export default () => null === undefined;",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["null-undefined-equality.test.tsx"],"names":[],"mappings":"eAcmC,MAAA,IAAI,KAAK,SAAS"}',
        ),
      ),
      false,
    );
  });
  // The same holds wherever the value came from: a splice, or a read past
  // the end of an array.
  it("compare the same when they arrive another way", async () => {
    const nothing = undefined;
    const empty = null;
    assert.deepEqual(
      await evaluate(
        cs.create(
          "3265muyjx857r:24:21",
          {
            params: [
              { kind: "splice", value: nothing, bindings: [] },
              { kind: "splice", value: empty, bindings: [] },
            ],
          },
          () => ({
            type: "BlockStatement",
            loc: {
              start: { line: 24, column: 24 },
              end: { line: 34, column: 7 },
            },
            body: [
              {
                type: "VariableDeclaration",
                loc: {
                  start: { line: 25, column: 8 },
                  end: { line: 25, column: 28 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 25, column: 14 },
                      end: { line: 25, column: 27 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 25, column: 14 },
                        end: { line: 25, column: 19 },
                      },
                      name: "names",
                      key: "names$3265muyjx857r$0",
                    },
                    init: {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 25, column: 22 },
                        end: { line: 25, column: 27 },
                      },
                      elements: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 25, column: 23 },
                            end: { line: 25, column: 26 },
                          },
                          value: "a",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 26, column: 8 },
                  end: { line: 33, column: 10 },
                },
                argument: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 26, column: 15 },
                    end: { line: 33, column: 9 },
                  },
                  elements: [
                    {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 27, column: 10 },
                        end: { line: 27, column: 32 },
                      },
                      operator: "===",
                      left: {
                        type: "Splice",
                        loc: {
                          start: { line: 27, column: 10 },
                          end: { line: 27, column: 18 },
                        },
                        param: 0,
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 23 },
                          end: { line: 27, column: 32 },
                        },
                        name: "undefined",
                      },
                    },
                    {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 28, column: 10 },
                        end: { line: 28, column: 27 },
                      },
                      operator: "!==",
                      left: {
                        type: "Splice",
                        loc: {
                          start: { line: 28, column: 10 },
                          end: { line: 28, column: 18 },
                        },
                        param: 0,
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 28, column: 23 },
                          end: { line: 28, column: 27 },
                        },
                        value: null,
                      },
                    },
                    {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 29, column: 10 },
                        end: { line: 29, column: 25 },
                      },
                      operator: "===",
                      left: {
                        type: "Splice",
                        loc: {
                          start: { line: 29, column: 10 },
                          end: { line: 29, column: 16 },
                        },
                        param: 1,
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 29, column: 21 },
                          end: { line: 29, column: 25 },
                        },
                        value: null,
                      },
                    },
                    {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 30, column: 10 },
                        end: { line: 30, column: 30 },
                      },
                      operator: "!==",
                      left: {
                        type: "Splice",
                        loc: {
                          start: { line: 30, column: 10 },
                          end: { line: 30, column: 16 },
                        },
                        param: 1,
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 30, column: 21 },
                          end: { line: 30, column: 30 },
                        },
                        name: "undefined",
                      },
                    },
                    {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 31, column: 10 },
                        end: { line: 31, column: 32 },
                      },
                      operator: "===",
                      left: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 31, column: 10 },
                          end: { line: 31, column: 18 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 31, column: 10 },
                            end: { line: 31, column: 15 },
                          },
                          name: "names",
                          key: "names$3265muyjx857r$0",
                        },
                        property: {
                          type: "Literal",
                          loc: {
                            start: { line: 31, column: 16 },
                            end: { line: 31, column: 17 },
                          },
                          value: 1,
                        },
                        computed: true,
                        optional: false,
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 31, column: 23 },
                          end: { line: 31, column: 32 },
                        },
                        name: "undefined",
                      },
                    },
                    {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 32, column: 10 },
                        end: { line: 32, column: 27 },
                      },
                      operator: "!==",
                      left: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 32, column: 10 },
                          end: { line: 32, column: 18 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 32, column: 10 },
                            end: { line: 32, column: 15 },
                          },
                          name: "names",
                          key: "names$3265muyjx857r$0",
                        },
                        property: {
                          type: "Literal",
                          loc: {
                            start: { line: 32, column: 16 },
                            end: { line: 32, column: 17 },
                          },
                          value: 1,
                        },
                        computed: true,
                        optional: false,
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 32, column: 23 },
                          end: { line: 32, column: 27 },
                        },
                        value: null,
                      },
                    },
                  ],
                },
              },
            ],
          }),
          'export default ($0, $1) => {\n    const names = ["a"];\n    return [\n        $0() === undefined,\n        $0() !== null,\n        $1() === null,\n        $1() !== undefined,\n        names[1] === undefined,\n        names[1] !== null,\n    ];\n};',
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["null-undefined-equality.test.tsx"],"names":[],"mappings":"eAuBwB;IAChB,MAAM,KAAK,GAAG,CAAC,GAAG,CAAC,CAAC;IACpB,OAAO;QACL,IAAQ,KAAK,SAAS;QACtB,IAAQ,KAAK,IAAI;QACjB,IAAM,KAAK,IAAI;QACf,IAAM,KAAK,SAAS;QACpB,KAAK,CAAC,CAAC,CAAC,KAAK,SAAS;QACtB,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI;KAClB,CAAC;AACJ,CAAC"}',
        ),
      ),
      [true, true, true, true, true, true],
    );
  });
});
