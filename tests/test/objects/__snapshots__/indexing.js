import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "@backtickjs/web-testing";
// What `a[k]` does with a key of the wrong type.
//
// TypeScript reads a numeric string literal as a numeric index, so `coins["0"]`
// passes the typechecker — it is `5` in JavaScript, where an array is an object
// and every key is a string. Nothing coerces here, so the read has no meaning
// and says so. The reads the typechecker refuses are written anyway, under
// `@ts-expect-error`, since what the client does with them is the question.
//
// A key that is not a place the value has anything is the other case, and it
// stays `undefined`: `indexPastEnd` and `indexAbsent` pin that, and the two
// must not be told apart by the same rule.
describe("a read by key", () => {
  it("refuses a string where an array takes a number", async () => {
    await assert.rejects(
      evaluate(
        cs.create(
          [21, 16, 21, 35],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "3dgkmki4ysav0",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [21, 19, 21, 34],
            expression: {
              kind: "arr",
              loc: [21, 19, 21, 29],
              elements: [
                {
                  kind: "number",
                  loc: [21, 20, 21, 21],
                  value: 5,
                },
                {
                  kind: "number",
                  loc: [21, 23, 21, 25],
                  value: 31,
                },
                {
                  kind: "number",
                  loc: [21, 27, 21, 28],
                  value: 7,
                },
              ],
            },
            argumentExpression: {
              kind: "string",
              loc: [21, 30, 21, 33],
              text: "0",
            },
          }),
        ),
      ),
      /an array is read by a number: this bundle produced "0"\./,
    );
  });
  it("refuses a string where a string takes a number", async () => {
    await assert.rejects(
      evaluate(
        cs.create(
          [28, 16, 28, 30],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "3dgkmki4ysav0",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [28, 19, 28, 29],
            expression: {
              kind: "string",
              loc: [28, 19, 28, 24],
              text: "abc",
            },
            argumentExpression: {
              kind: "string",
              loc: [28, 25, 28, 28],
              text: "0",
            },
          }),
        ),
      ),
      /a string is read by a number: this bundle produced "0"\./,
    );
  });
  it("refuses a number where an object takes a string", async () => {
    await assert.rejects(
      // @ts-expect-error: an object is read by a string
      evaluate(
        cs.create(
          [36, 16, 36, 33],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "3dgkmki4ysav0",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [36, 19, 36, 32],
            expression: {
              kind: "obj",
              loc: [36, 20, 36, 28],
              properties: [
                {
                  kind: ":",
                  loc: [36, 22, 36, 26],
                  name: {
                    kind: "string",
                    loc: [36, 22, 36, 23],
                    text: "x",
                  },
                  initializer: {
                    kind: "number",
                    loc: [36, 25, 36, 26],
                    value: 1,
                  },
                },
              ],
            },
            argumentExpression: {
              kind: "number",
              loc: [36, 30, 36, 31],
              value: 0,
            },
          }),
        ),
      ),
      /an object is read by a string: this bundle produced 0\./,
    );
  });
  it("refuses a target that holds nothing by key at all", async () => {
    await assert.rejects(
      evaluate(
        cs.create(
          [43, 16, 43, 49],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "3dgkmki4ysav0",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [43, 19, 43, 48],
            expression: {
              kind: "number",
              loc: [43, 20, 43, 21],
              value: 7,
            },
            argumentExpression: {
              kind: "number",
              loc: [43, 46, 43, 47],
              value: 0,
            },
          }),
        ),
      ),
      /only an array, a string or an object can be read by key/,
    );
  });
  // The other half of the rule, so the two cases are pinned together: a
  // well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads = [
      cs.create(
        [52, 7, 52, 24],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "3dgkmki4ysav0",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [52, 10, 52, 23],
          expression: {
            kind: "arr",
            loc: [52, 10, 52, 20],
            elements: [
              {
                kind: "number",
                loc: [52, 11, 52, 12],
                value: 5,
              },
              {
                kind: "number",
                loc: [52, 14, 52, 16],
                value: 31,
              },
              {
                kind: "number",
                loc: [52, 18, 52, 19],
                value: 7,
              },
            ],
          },
          argumentExpression: {
            kind: "number",
            loc: [52, 21, 52, 22],
            value: 9,
          },
        }),
      ),
      cs.create(
        [53, 7, 53, 26],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "3dgkmki4ysav0",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [53, 10, 53, 25],
          expression: {
            kind: "arr",
            loc: [53, 10, 53, 20],
            elements: [
              {
                kind: "number",
                loc: [53, 11, 53, 12],
                value: 5,
              },
              {
                kind: "number",
                loc: [53, 14, 53, 16],
                value: 31,
              },
              {
                kind: "number",
                loc: [53, 18, 53, 19],
                value: 7,
              },
            ],
          },
          argumentExpression: {
            kind: "number",
            loc: [53, 21, 53, 24],
            value: 1.5,
          },
        }),
      ),
      cs.create(
        [54, 7, 54, 25],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "3dgkmki4ysav0",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [54, 10, 54, 24],
          expression: {
            kind: "arr",
            loc: [54, 10, 54, 20],
            elements: [
              {
                kind: "number",
                loc: [54, 11, 54, 12],
                value: 5,
              },
              {
                kind: "number",
                loc: [54, 14, 54, 16],
                value: 31,
              },
              {
                kind: "number",
                loc: [54, 18, 54, 19],
                value: 7,
              },
            ],
          },
          argumentExpression: {
            kind: "prefixop",
            loc: [54, 21, 54, 23],
            operator: "-",
            operand: {
              kind: "number",
              loc: [54, 22, 54, 23],
              value: 1,
            },
          },
        }),
      ),
      cs.create(
        [55, 7, 55, 57],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "3dgkmki4ysav0",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [55, 10, 55, 56],
          expression: {
            kind: "obj",
            loc: [55, 12, 55, 20],
            properties: [
              {
                kind: ":",
                loc: [55, 14, 55, 18],
                name: {
                  kind: "string",
                  loc: [55, 14, 55, 15],
                  text: "x",
                },
                initializer: {
                  kind: "number",
                  loc: [55, 17, 55, 18],
                  value: 1,
                },
              },
            ],
          },
          argumentExpression: {
            kind: "string",
            loc: [55, 52, 55, 55],
            text: "y",
          },
        }),
      ),
      cs.create(
        [56, 7, 56, 19],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "3dgkmki4ysav0",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [56, 10, 56, 18],
          expression: {
            kind: "string",
            loc: [56, 10, 56, 15],
            text: "abc",
          },
          argumentExpression: {
            kind: "number",
            loc: [56, 16, 56, 17],
            value: 9,
          },
        }),
      ),
    ];
    for (const value of reads) {
      assert.equal(await evaluate(value), undefined);
    }
  });
});
