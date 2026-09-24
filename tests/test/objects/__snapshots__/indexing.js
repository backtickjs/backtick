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
          { start: { line: 10, column: 32 }, end: { line: 10, column: 51 } },
          {
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            type: "MemberExpression",
            loc: {
              start: { line: 10, column: 35 },
              end: { line: 10, column: 50 },
            },
            object: {
              type: "ArrayExpression",
              loc: {
                start: { line: 10, column: 35 },
                end: { line: 10, column: 45 },
              },
              elements: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 36 },
                    end: { line: 10, column: 37 },
                  },
                  value: 5,
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 39 },
                    end: { line: 10, column: 41 },
                  },
                  value: 31,
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 43 },
                    end: { line: 10, column: 44 },
                  },
                  value: 7,
                },
              ],
            },
            property: {
              type: "Literal",
              loc: {
                start: { line: 10, column: 46 },
                end: { line: 10, column: 49 },
              },
              value: "0",
            },
            computed: true,
            optional: false,
          }),
          '() => [5, 31, 7]["0"]',
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AASmC,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAA"}',
        ),
      ),
      5,
    );
    assert.equal(
      await evaluate(
        cs.create(
          { start: { line: 11, column: 32 }, end: { line: 11, column: 46 } },
          {
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            type: "MemberExpression",
            loc: {
              start: { line: 11, column: 35 },
              end: { line: 11, column: 45 },
            },
            object: {
              type: "Literal",
              loc: {
                start: { line: 11, column: 35 },
                end: { line: 11, column: 40 },
              },
              value: "abc",
            },
            property: {
              type: "Literal",
              loc: {
                start: { line: 11, column: 41 },
                end: { line: 11, column: 44 },
              },
              value: "0",
            },
            computed: true,
            optional: false,
          }),
          '() => "abc"["0"]',
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAUmC,MAAA,KAAK,CAAC,GAAG,CAAC,CAAA"}',
        ),
      ),
      "a",
    );
    // @ts-expect-error: an object's type names its keys
    assert.equal(
      await evaluate(
        cs.create(
          { start: { line: 13, column: 32 }, end: { line: 13, column: 49 } },
          {
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            type: "MemberExpression",
            loc: {
              start: { line: 13, column: 35 },
              end: { line: 13, column: 48 },
            },
            object: {
              type: "ObjectExpression",
              loc: {
                start: { line: 13, column: 36 },
                end: { line: 13, column: 44 },
              },
              properties: [
                {
                  type: "Property",
                  loc: {
                    start: { line: 13, column: 38 },
                    end: { line: 13, column: 42 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 13, column: 38 },
                      end: { line: 13, column: 39 },
                    },
                    name: "x",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 41 },
                      end: { line: 13, column: 42 },
                    },
                    value: 1,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
              ],
            },
            property: {
              type: "Literal",
              loc: {
                start: { line: 13, column: 46 },
                end: { line: 13, column: 47 },
              },
              value: 0,
            },
            computed: true,
            optional: false,
          }),
          "() => ({ x: 1 })[0]",
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAYmC,MAAA,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAA"}',
        ),
      ),
      undefined,
    );
    assert.equal(
      await evaluate(
        cs.create(
          { start: { line: 14, column: 32 }, end: { line: 14, column: 65 } },
          {
            filePath: "objects/indexing.test.tsx",
            fileHash: "kbv0csg6ys4h",
            splices: {},
            captures: [],
          },
          () => ({
            type: "MemberExpression",
            loc: {
              start: { line: 14, column: 35 },
              end: { line: 14, column: 64 },
            },
            object: {
              type: "Literal",
              loc: {
                start: { line: 14, column: 36 },
                end: { line: 14, column: 37 },
              },
              value: 7,
            },
            property: {
              type: "Literal",
              loc: {
                start: { line: 14, column: 62 },
                end: { line: 14, column: 63 },
              },
              value: 0,
            },
            computed: true,
            optional: false,
          }),
          "() => 7[0]",
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAamC,MAAC,CAAyB,CAAC,CAAC,CAAC,CAAA"}',
        ),
      ),
      undefined,
    );
  });
  // A well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads = [
      cs.create(
        { start: { line: 20, column: 6 }, end: { line: 20, column: 23 } },
        {
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          type: "MemberExpression",
          loc: {
            start: { line: 20, column: 9 },
            end: { line: 20, column: 22 },
          },
          object: {
            type: "ArrayExpression",
            loc: {
              start: { line: 20, column: 9 },
              end: { line: 20, column: 19 },
            },
            elements: [
              {
                type: "Literal",
                loc: {
                  start: { line: 20, column: 10 },
                  end: { line: 20, column: 11 },
                },
                value: 5,
              },
              {
                type: "Literal",
                loc: {
                  start: { line: 20, column: 13 },
                  end: { line: 20, column: 15 },
                },
                value: 31,
              },
              {
                type: "Literal",
                loc: {
                  start: { line: 20, column: 17 },
                  end: { line: 20, column: 18 },
                },
                value: 7,
              },
            ],
          },
          property: {
            type: "Literal",
            loc: {
              start: { line: 20, column: 20 },
              end: { line: 20, column: 21 },
            },
            value: 9,
          },
          computed: true,
          optional: false,
        }),
        "() => [5, 31, 7][9]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAmBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAA"}',
      ),
      cs.create(
        { start: { line: 21, column: 6 }, end: { line: 21, column: 25 } },
        {
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          type: "MemberExpression",
          loc: {
            start: { line: 21, column: 9 },
            end: { line: 21, column: 24 },
          },
          object: {
            type: "ArrayExpression",
            loc: {
              start: { line: 21, column: 9 },
              end: { line: 21, column: 19 },
            },
            elements: [
              {
                type: "Literal",
                loc: {
                  start: { line: 21, column: 10 },
                  end: { line: 21, column: 11 },
                },
                value: 5,
              },
              {
                type: "Literal",
                loc: {
                  start: { line: 21, column: 13 },
                  end: { line: 21, column: 15 },
                },
                value: 31,
              },
              {
                type: "Literal",
                loc: {
                  start: { line: 21, column: 17 },
                  end: { line: 21, column: 18 },
                },
                value: 7,
              },
            ],
          },
          property: {
            type: "Literal",
            loc: {
              start: { line: 21, column: 20 },
              end: { line: 21, column: 23 },
            },
            value: 1.5,
          },
          computed: true,
          optional: false,
        }),
        "() => [5, 31, 7][1.5]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAoBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAA"}',
      ),
      cs.create(
        { start: { line: 22, column: 6 }, end: { line: 22, column: 24 } },
        {
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          type: "MemberExpression",
          loc: {
            start: { line: 22, column: 9 },
            end: { line: 22, column: 23 },
          },
          object: {
            type: "ArrayExpression",
            loc: {
              start: { line: 22, column: 9 },
              end: { line: 22, column: 19 },
            },
            elements: [
              {
                type: "Literal",
                loc: {
                  start: { line: 22, column: 10 },
                  end: { line: 22, column: 11 },
                },
                value: 5,
              },
              {
                type: "Literal",
                loc: {
                  start: { line: 22, column: 13 },
                  end: { line: 22, column: 15 },
                },
                value: 31,
              },
              {
                type: "Literal",
                loc: {
                  start: { line: 22, column: 17 },
                  end: { line: 22, column: 18 },
                },
                value: 7,
              },
            ],
          },
          property: {
            type: "UnaryExpression",
            loc: {
              start: { line: 22, column: 20 },
              end: { line: 22, column: 22 },
            },
            operator: "-",
            prefix: true,
            argument: {
              type: "Literal",
              loc: {
                start: { line: 22, column: 21 },
                end: { line: 22, column: 22 },
              },
              value: 1,
            },
          },
          computed: true,
          optional: false,
        }),
        "() => [5, 31, 7][-1]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAqBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAA"}',
      ),
      cs.create(
        { start: { line: 23, column: 6 }, end: { line: 23, column: 56 } },
        {
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          type: "MemberExpression",
          loc: {
            start: { line: 23, column: 9 },
            end: { line: 23, column: 55 },
          },
          object: {
            type: "ObjectExpression",
            loc: {
              start: { line: 23, column: 11 },
              end: { line: 23, column: 19 },
            },
            properties: [
              {
                type: "Property",
                loc: {
                  start: { line: 23, column: 13 },
                  end: { line: 23, column: 17 },
                },
                key: {
                  type: "Identifier",
                  loc: {
                    start: { line: 23, column: 13 },
                    end: { line: 23, column: 14 },
                  },
                  name: "x",
                },
                value: {
                  type: "Literal",
                  loc: {
                    start: { line: 23, column: 16 },
                    end: { line: 23, column: 17 },
                  },
                  value: 1,
                },
                kind: "init",
                computed: false,
                method: false,
                shorthand: false,
              },
            ],
          },
          property: {
            type: "Literal",
            loc: {
              start: { line: 23, column: 51 },
              end: { line: 23, column: 54 },
            },
            value: "y",
          },
          computed: true,
          optional: false,
        }),
        '() => ({ x: 1 })["y"]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAsBS,MAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAA+B,CAAC,GAAG,CAAC,CAAA"}',
      ),
      cs.create(
        { start: { line: 24, column: 6 }, end: { line: 24, column: 18 } },
        {
          filePath: "objects/indexing.test.tsx",
          fileHash: "kbv0csg6ys4h",
          splices: {},
          captures: [],
        },
        () => ({
          type: "MemberExpression",
          loc: {
            start: { line: 24, column: 9 },
            end: { line: 24, column: 17 },
          },
          object: {
            type: "Literal",
            loc: {
              start: { line: 24, column: 9 },
              end: { line: 24, column: 14 },
            },
            value: "abc",
          },
          property: {
            type: "Literal",
            loc: {
              start: { line: 24, column: 15 },
              end: { line: 24, column: 16 },
            },
            value: 9,
          },
          computed: true,
          optional: false,
        }),
        '() => "abc"[9]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"AAuBS,MAAA,KAAK,CAAC,CAAC,CAAC,CAAA"}',
      ),
    ];
    for (const value of reads) {
      assert.equal(await evaluate(value), undefined);
    }
  });
});
