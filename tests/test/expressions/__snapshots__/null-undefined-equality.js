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
          [9, 33, 9, 50],
          {
            version: "0.0.0",
            filePath: "expressions/null-undefined-equality.test.tsx",
            fileHash: "3265muyjx857r",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [9, 36, 9, 49],
            left: {
              kind: "null",
              loc: [9, 36, 9, 40],
            },
            operatorToken: "===",
            right: {
              kind: "null",
              loc: [9, 45, 9, 49],
            },
          }),
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          [10, 33, 10, 60],
          {
            version: "0.0.0",
            filePath: "expressions/null-undefined-equality.test.tsx",
            fileHash: "3265muyjx857r",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [10, 36, 10, 59],
            left: {
              kind: "undefined",
              loc: [10, 36, 10, 45],
            },
            operatorToken: "===",
            right: {
              kind: "undefined",
              loc: [10, 50, 10, 59],
            },
          }),
        ),
      ),
      true,
    );
  });
  it("are not equal to each other", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          [14, 33, 14, 55],
          {
            version: "0.0.0",
            filePath: "expressions/null-undefined-equality.test.tsx",
            fileHash: "3265muyjx857r",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [14, 36, 14, 54],
            left: {
              kind: "null",
              loc: [14, 36, 14, 40],
            },
            operatorToken: "!==",
            right: {
              kind: "undefined",
              loc: [14, 45, 14, 54],
            },
          }),
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          [15, 33, 15, 55],
          {
            version: "0.0.0",
            filePath: "expressions/null-undefined-equality.test.tsx",
            fileHash: "3265muyjx857r",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "binop",
            loc: [15, 36, 15, 54],
            left: {
              kind: "null",
              loc: [15, 36, 15, 40],
            },
            operatorToken: "===",
            right: {
              kind: "undefined",
              loc: [15, 45, 15, 54],
            },
          }),
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
          [24, 22, 34, 9],
          {
            version: "0.0.0",
            filePath: "expressions/null-undefined-equality.test.tsx",
            fileHash: "3265muyjx857r",
            splices: {
              $nothing: { value: nothing, params: [] },
              $empty: { value: empty, params: [] },
            },
            captures: [],
          },
          () => ({
            kind: "{}",
            loc: [24, 25, 34, 8],
            statements: [
              {
                kind: "const",
                loc: [25, 9, 25, 29],
                name: {
                  kind: "id",
                  loc: [25, 15, 25, 20],
                  text: "names",
                  bindingKey: "names$3265muyjx857r$0",
                },
                initializer: {
                  kind: "arr",
                  loc: [25, 23, 25, 28],
                  elements: [
                    {
                      kind: "string",
                      loc: [25, 24, 25, 27],
                      text: "a",
                    },
                  ],
                },
              },
              {
                kind: "return",
                loc: [26, 9, 33, 11],
                expression: {
                  kind: "arr",
                  loc: [26, 16, 33, 10],
                  elements: [
                    {
                      kind: "binop",
                      loc: [27, 11, 27, 33],
                      left: {
                        kind: "splice",
                        loc: [27, 11, 27, 19],
                        key: "$nothing",
                      },
                      operatorToken: "===",
                      right: {
                        kind: "undefined",
                        loc: [27, 24, 27, 33],
                      },
                    },
                    {
                      kind: "binop",
                      loc: [28, 11, 28, 28],
                      left: {
                        kind: "splice",
                        loc: [28, 11, 28, 19],
                        key: "$nothing",
                      },
                      operatorToken: "!==",
                      right: {
                        kind: "null",
                        loc: [28, 24, 28, 28],
                      },
                    },
                    {
                      kind: "binop",
                      loc: [29, 11, 29, 26],
                      left: {
                        kind: "splice",
                        loc: [29, 11, 29, 17],
                        key: "$empty",
                      },
                      operatorToken: "===",
                      right: {
                        kind: "null",
                        loc: [29, 22, 29, 26],
                      },
                    },
                    {
                      kind: "binop",
                      loc: [30, 11, 30, 31],
                      left: {
                        kind: "splice",
                        loc: [30, 11, 30, 17],
                        key: "$empty",
                      },
                      operatorToken: "!==",
                      right: {
                        kind: "undefined",
                        loc: [30, 22, 30, 31],
                      },
                    },
                    {
                      kind: "binop",
                      loc: [31, 11, 31, 33],
                      left: {
                        kind: "[]",
                        loc: [31, 11, 31, 19],
                        expression: {
                          kind: "id",
                          loc: [31, 11, 31, 16],
                          text: "names",
                          bindingKey: "names$3265muyjx857r$0",
                        },
                        argumentExpression: {
                          kind: "number",
                          loc: [31, 17, 31, 18],
                          value: 1,
                        },
                      },
                      operatorToken: "===",
                      right: {
                        kind: "undefined",
                        loc: [31, 24, 31, 33],
                      },
                    },
                    {
                      kind: "binop",
                      loc: [32, 11, 32, 28],
                      left: {
                        kind: "[]",
                        loc: [32, 11, 32, 19],
                        expression: {
                          kind: "id",
                          loc: [32, 11, 32, 16],
                          text: "names",
                          bindingKey: "names$3265muyjx857r$0",
                        },
                        argumentExpression: {
                          kind: "number",
                          loc: [32, 17, 32, 18],
                          value: 1,
                        },
                      },
                      operatorToken: "!==",
                      right: {
                        kind: "null",
                        loc: [32, 24, 32, 28],
                      },
                    },
                  ],
                },
              },
            ],
          }),
        ),
      ),
      [true, true, true, true, true, true],
    );
  });
});
