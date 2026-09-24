import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;
it("splicedComparison", async (t) => {
  await snapshotCase(
    t,
    "splicedComparison",
    cs.create(
      { start: { line: 15, column: 4 }, end: { line: 20, column: 7 } },
      {
        filePath: "splices/spliced-comparison.test.tsx",
        fileHash: "3jdm2y7f9tpf",
        splices: {
          $low: { value: low, params: [] },
          $high: { value: high, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 15, column: 8 }, end: { line: 20, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 25 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 11 },
              },
              name: "under",
            },
            value: {
              type: "BinaryExpression",
              loc: {
                start: { line: 16, column: 13 },
                end: { line: 16, column: 25 },
              },
              operator: "<",
              left: {
                type: "Splice",
                loc: {
                  start: { line: 16, column: 13 },
                  end: { line: 16, column: 17 },
                },
                key: "$low",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 16, column: 20 },
                  end: { line: 16, column: 25 },
                },
                key: "$high",
              },
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 27 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 12 },
              },
              name: "atMost",
            },
            value: {
              type: "BinaryExpression",
              loc: {
                start: { line: 17, column: 14 },
                end: { line: 17, column: 27 },
              },
              operator: "<=",
              left: {
                type: "Splice",
                loc: {
                  start: { line: 17, column: 14 },
                  end: { line: 17, column: 18 },
                },
                key: "$low",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 17, column: 22 },
                  end: { line: 17, column: 27 },
                },
                key: "$high",
              },
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
              end: { line: 18, column: 24 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 10 },
              },
              name: "over",
            },
            value: {
              type: "BinaryExpression",
              loc: {
                start: { line: 18, column: 12 },
                end: { line: 18, column: 24 },
              },
              operator: ">",
              left: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 17 },
                },
                key: "$high",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 20 },
                  end: { line: 18, column: 24 },
                },
                key: "$low",
              },
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
              end: { line: 19, column: 43 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 13 },
              },
              name: "between",
            },
            value: {
              type: "LogicalExpression",
              loc: {
                start: { line: 19, column: 15 },
                end: { line: 19, column: 43 },
              },
              operator: "&&",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 19, column: 15 },
                  end: { line: 19, column: 27 },
                },
                operator: "<",
                left: {
                  type: "Splice",
                  loc: {
                    start: { line: 19, column: 15 },
                    end: { line: 19, column: 19 },
                  },
                  key: "$low",
                },
                right: {
                  type: "Splice",
                  loc: {
                    start: { line: 19, column: 22 },
                    end: { line: 19, column: 27 },
                  },
                  key: "$high",
                },
              },
              right: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 19, column: 31 },
                  end: { line: 19, column: 43 },
                },
                operator: ">",
                left: {
                  type: "Splice",
                  loc: {
                    start: { line: 19, column: 31 },
                    end: { line: 19, column: 36 },
                  },
                  key: "$high",
                },
                right: {
                  type: "Splice",
                  loc: {
                    start: { line: 19, column: 39 },
                    end: { line: 19, column: 43 },
                  },
                  key: "$low",
                },
              },
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      "($0, $1) => ({\n    under: $0() < $1(),\n    atMost: $0() <= $1(),\n    over: $1() > $0(),\n    between: $0() < $1() && $1() > $0(),\n})",
      '{"version":3,"file":"spliced-comparison.test.jsx","sourceRoot":"","sources":["spliced-comparison.test.tsx"],"names":[],"mappings":"AAcO,YAAA,CAAC;IACF,KAAK,EAAE,IAAI,GAAG,IAAK;IACnB,MAAM,EAAE,IAAI,IAAI,IAAK;IACrB,IAAI,EAAE,IAAK,GAAG,IAAI;IAClB,OAAO,EAAE,IAAI,GAAG,IAAK,IAAI,IAAK,GAAG,IAAI;CACtC,CAAC,CAAA"}',
    ),
  );
});
