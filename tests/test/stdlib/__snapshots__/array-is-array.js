import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Any value may be asked about, and only an array answers true: a string has
// a length and indexes, and is still not one.
it("arrayIsArray", async (t) => {
  await snapshotCase(
    t,
    "arrayIsArray",
    cs.create(
      [11, 5, 19, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/array-is-array.test.tsx",
        fileHash: "311zee6pw10s9",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 19, 6],
        statements: [
          {
            kind: "return",
            loc: [12, 7, 18, 9],
            expression: {
              kind: "arr",
              loc: [12, 14, 18, 8],
              elements: [
                {
                  kind: "()",
                  loc: [13, 9, 13, 26],
                  expression: {
                    kind: "bltn",
                    loc: [13, 9, 13, 22],
                    name: "Array.isArray",
                  },
                  arguments: [
                    {
                      kind: "arr",
                      loc: [13, 23, 13, 25],
                      elements: [],
                    },
                  ],
                },
                {
                  kind: "()",
                  loc: [14, 9, 14, 30],
                  expression: {
                    kind: "bltn",
                    loc: [14, 9, 14, 22],
                    name: "Array.isArray",
                  },
                  arguments: [
                    {
                      kind: "arr",
                      loc: [14, 23, 14, 29],
                      elements: [
                        {
                          kind: "number",
                          loc: [14, 24, 14, 25],
                          value: 1,
                        },
                        {
                          kind: "number",
                          loc: [14, 27, 14, 28],
                          value: 2,
                        },
                      ],
                    },
                  ],
                },
                {
                  kind: "()",
                  loc: [15, 9, 15, 28],
                  expression: {
                    kind: "bltn",
                    loc: [15, 9, 15, 22],
                    name: "Array.isArray",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [15, 23, 15, 27],
                      text: "ab",
                    },
                  ],
                },
                {
                  kind: "()",
                  loc: [16, 9, 16, 37],
                  expression: {
                    kind: "bltn",
                    loc: [16, 9, 16, 22],
                    name: "Array.isArray",
                  },
                  arguments: [
                    {
                      kind: "obj",
                      loc: [16, 23, 16, 36],
                      properties: [
                        {
                          kind: ":",
                          loc: [16, 25, 16, 34],
                          name: {
                            kind: "string",
                            loc: [16, 25, 16, 31],
                            text: "length",
                          },
                          initializer: {
                            kind: "number",
                            loc: [16, 33, 16, 34],
                            value: 0,
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  kind: "()",
                  loc: [17, 9, 17, 28],
                  expression: {
                    kind: "bltn",
                    loc: [17, 9, 17, 22],
                    name: "Array.isArray",
                  },
                  arguments: [
                    {
                      kind: "null",
                      loc: [17, 23, 17, 27],
                    },
                  ],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
