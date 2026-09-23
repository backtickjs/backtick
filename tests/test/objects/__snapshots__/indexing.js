import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "@backtickjs/web-testing";
// What `a[k]` does with a key of another type: what JavaScript does.
describe("a read by key", () => {
  it("reads a key of another type as JavaScript does", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          [10, 33, 10, 52],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [10, 36, 10, 51],
            expression: {
              kind: "arr",
              loc: [10, 36, 10, 46],
              elements: [
                {
                  kind: "number",
                  loc: [10, 37, 10, 38],
                  value: 5,
                },
                {
                  kind: "number",
                  loc: [10, 40, 10, 42],
                  value: 31,
                },
                {
                  kind: "number",
                  loc: [10, 44, 10, 45],
                  value: 7,
                },
              ],
            },
            argumentExpression: {
              kind: "string",
              loc: [10, 47, 10, 50],
              text: "0",
            },
          }),
        ),
      ),
      5,
    );
    assert.equal(
      await evaluate(
        cs.create(
          [11, 33, 11, 47],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [11, 36, 11, 46],
            expression: {
              kind: "string",
              loc: [11, 36, 11, 41],
              text: "abc",
            },
            argumentExpression: {
              kind: "string",
              loc: [11, 42, 11, 45],
              text: "0",
            },
          }),
        ),
      ),
      "a",
    );
    // @ts-expect-error: an object's type names its keys
    assert.equal(
      await evaluate(
        cs.create(
          [13, 33, 13, 50],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [13, 36, 13, 49],
            expression: {
              kind: "obj",
              loc: [13, 37, 13, 45],
              properties: [
                {
                  kind: ":",
                  loc: [13, 39, 13, 43],
                  name: {
                    kind: "string",
                    loc: [13, 39, 13, 40],
                    text: "x",
                  },
                  initializer: {
                    kind: "number",
                    loc: [13, 42, 13, 43],
                    value: 1,
                  },
                },
              ],
            },
            argumentExpression: {
              kind: "number",
              loc: [13, 47, 13, 48],
              value: 0,
            },
          }),
        ),
      ),
      undefined,
    );
    assert.equal(
      await evaluate(
        cs.create(
          [14, 33, 14, 66],
          {
            version: "0.0.0",
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "[]",
            loc: [14, 36, 14, 65],
            expression: {
              kind: "number",
              loc: [14, 37, 14, 38],
              value: 7,
            },
            argumentExpression: {
              kind: "number",
              loc: [14, 63, 14, 64],
              value: 0,
            },
          }),
        ),
      ),
      undefined,
    );
  });
  // A well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads = [
      cs.create(
        [20, 7, 20, 24],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [20, 10, 20, 23],
          expression: {
            kind: "arr",
            loc: [20, 10, 20, 20],
            elements: [
              {
                kind: "number",
                loc: [20, 11, 20, 12],
                value: 5,
              },
              {
                kind: "number",
                loc: [20, 14, 20, 16],
                value: 31,
              },
              {
                kind: "number",
                loc: [20, 18, 20, 19],
                value: 7,
              },
            ],
          },
          argumentExpression: {
            kind: "number",
            loc: [20, 21, 20, 22],
            value: 9,
          },
        }),
      ),
      cs.create(
        [21, 7, 21, 26],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [21, 10, 21, 25],
          expression: {
            kind: "arr",
            loc: [21, 10, 21, 20],
            elements: [
              {
                kind: "number",
                loc: [21, 11, 21, 12],
                value: 5,
              },
              {
                kind: "number",
                loc: [21, 14, 21, 16],
                value: 31,
              },
              {
                kind: "number",
                loc: [21, 18, 21, 19],
                value: 7,
              },
            ],
          },
          argumentExpression: {
            kind: "number",
            loc: [21, 21, 21, 24],
            value: 1.5,
          },
        }),
      ),
      cs.create(
        [22, 7, 22, 25],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [22, 10, 22, 24],
          expression: {
            kind: "arr",
            loc: [22, 10, 22, 20],
            elements: [
              {
                kind: "number",
                loc: [22, 11, 22, 12],
                value: 5,
              },
              {
                kind: "number",
                loc: [22, 14, 22, 16],
                value: 31,
              },
              {
                kind: "number",
                loc: [22, 18, 22, 19],
                value: 7,
              },
            ],
          },
          argumentExpression: {
            kind: "prefixop",
            loc: [22, 21, 22, 23],
            operator: "-",
            operand: {
              kind: "number",
              loc: [22, 22, 22, 23],
              value: 1,
            },
          },
        }),
      ),
      cs.create(
        [23, 7, 23, 57],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [23, 10, 23, 56],
          expression: {
            kind: "obj",
            loc: [23, 12, 23, 20],
            properties: [
              {
                kind: ":",
                loc: [23, 14, 23, 18],
                name: {
                  kind: "string",
                  loc: [23, 14, 23, 15],
                  text: "x",
                },
                initializer: {
                  kind: "number",
                  loc: [23, 17, 23, 18],
                  value: 1,
                },
              },
            ],
          },
          argumentExpression: {
            kind: "string",
            loc: [23, 52, 23, 55],
            text: "y",
          },
        }),
      ),
      cs.create(
        [24, 7, 24, 19],
        {
          version: "0.0.0",
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "[]",
          loc: [24, 10, 24, 18],
          expression: {
            kind: "string",
            loc: [24, 10, 24, 15],
            text: "abc",
          },
          argumentExpression: {
            kind: "number",
            loc: [24, 16, 24, 17],
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
