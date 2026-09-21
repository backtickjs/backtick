import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object's values in key order, and whether it holds a key: the check a
// script would otherwise write as `Object.keys(o).includes(k)`.
it("objectValues", async (t) => {
  await snapshotCase(
    t,
    "objectValues",
    cs.create(
      [11, 5, 17, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/object-values.test.tsx",
        fileHash: "1lmwvcf4zc2ir",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 17, 6],
        statements: [
          {
            kind: "const",
            loc: [12, 7, 12, 44],
            name: {
              kind: "id",
              loc: [12, 13, 12, 19],
              text: "prices",
              bindingKey: "prices$1lmwvcf4zc2ir$0",
            },
            initializer: {
              kind: "obj",
              loc: [12, 22, 12, 43],
              properties: [
                {
                  kind: ":",
                  loc: [12, 24, 12, 32],
                  name: {
                    kind: "string",
                    loc: [12, 24, 12, 29],
                    text: "apple",
                  },
                  initializer: {
                    kind: "number",
                    loc: [12, 31, 12, 32],
                    value: 1,
                  },
                },
                {
                  kind: ":",
                  loc: [12, 34, 12, 41],
                  name: {
                    kind: "string",
                    loc: [12, 34, 12, 38],
                    text: "pear",
                  },
                  initializer: {
                    kind: "number",
                    loc: [12, 40, 12, 41],
                    value: 2,
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [13, 7, 16, 9],
            expression: {
              kind: "obj",
              loc: [13, 14, 16, 8],
              properties: [
                {
                  kind: ":",
                  loc: [14, 9, 14, 38],
                  name: {
                    kind: "string",
                    loc: [14, 9, 14, 15],
                    text: "values",
                  },
                  initializer: {
                    kind: "()",
                    loc: [14, 17, 14, 38],
                    expression: {
                      kind: "bltn",
                      loc: [14, 17, 14, 30],
                      name: "Object.values",
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [14, 31, 14, 37],
                        text: "prices",
                        bindingKey: "prices$1lmwvcf4zc2ir$0",
                      },
                    ],
                  },
                },
                {
                  kind: ":",
                  loc: [15, 9, 15, 78],
                  name: {
                    kind: "string",
                    loc: [15, 9, 15, 14],
                    text: "holds",
                  },
                  initializer: {
                    kind: "arr",
                    loc: [15, 16, 15, 78],
                    elements: [
                      {
                        kind: "()",
                        loc: [15, 17, 15, 46],
                        expression: {
                          kind: "bltn",
                          loc: [15, 17, 15, 30],
                          name: "Object.hasOwn",
                        },
                        arguments: [
                          {
                            kind: "id",
                            loc: [15, 31, 15, 37],
                            text: "prices",
                            bindingKey: "prices$1lmwvcf4zc2ir$0",
                          },
                          {
                            kind: "string",
                            loc: [15, 39, 15, 45],
                            text: "pear",
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [15, 48, 15, 77],
                        expression: {
                          kind: "bltn",
                          loc: [15, 48, 15, 61],
                          name: "Object.hasOwn",
                        },
                        arguments: [
                          {
                            kind: "id",
                            loc: [15, 62, 15, 68],
                            text: "prices",
                            bindingKey: "prices$1lmwvcf4zc2ir$0",
                          },
                          {
                            kind: "string",
                            loc: [15, 70, 15, 76],
                            text: "plum",
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
