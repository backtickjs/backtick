import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A record read as pairs and built back from them: how a script makes a
// record whose keys it only learns when it runs.
it("objectEntries", async (t) => {
  await snapshotCase(
    t,
    "objectEntries",
    cs.create(
      [11, 5, 17, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/object-entries.test.tsx",
        fileHash: "txb5yf5uyd2o",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 17, 6],
        statements: [
          {
            kind: "const",
            loc: [12, 7, 12, 39],
            name: {
              kind: "id",
              loc: [12, 13, 12, 17],
              text: "held",
              bindingKey: "held$txb5yf5uyd2o$0",
            },
            initializer: {
              kind: "obj",
              loc: [12, 20, 12, 38],
              properties: [
                {
                  kind: ":",
                  loc: [12, 22, 12, 26],
                  name: {
                    kind: "string",
                    loc: [12, 22, 12, 23],
                    text: "n",
                  },
                  initializer: {
                    kind: "number",
                    loc: [12, 25, 12, 26],
                    value: 1,
                  },
                },
                {
                  kind: ":",
                  loc: [12, 28, 12, 36],
                  name: {
                    kind: "string",
                    loc: [12, 28, 12, 29],
                    text: "q",
                  },
                  initializer: {
                    kind: "string",
                    loc: [12, 31, 12, 36],
                    text: "ada",
                  },
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [13, 7, 15, 9],
            name: {
              kind: "id",
              loc: [13, 13, 13, 20],
              text: "written",
              bindingKey: "written$txb5yf5uyd2o$1",
            },
            initializer: {
              kind: "()",
              loc: [13, 23, 15, 8],
              expression: {
                kind: "bltn",
                loc: [13, 23, 13, 41],
                name: "Object.fromEntries",
              },
              arguments: [
                {
                  kind: "()",
                  loc: [14, 9, 14, 79],
                  expression: {
                    kind: ".",
                    loc: [14, 9, 14, 33],
                    expression: {
                      kind: "()",
                      loc: [14, 9, 14, 29],
                      expression: {
                        kind: "bltn",
                        loc: [14, 9, 14, 23],
                        name: "Object.entries",
                      },
                      arguments: [
                        {
                          kind: "id",
                          loc: [14, 24, 14, 28],
                          text: "held",
                          bindingKey: "held$txb5yf5uyd2o$0",
                        },
                      ],
                    },
                    name: "map",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [14, 34, 14, 78],
                      parameters: [
                        {
                          kind: "param",
                          loc: [14, 35, 14, 39],
                          name: {
                            kind: "id",
                            loc: [14, 35, 14, 39],
                            text: "pair",
                            bindingKey: "pair$txb5yf5uyd2o$2",
                          },
                        },
                      ],
                      body: {
                        kind: "arr",
                        loc: [14, 44, 14, 78],
                        elements: [
                          {
                            kind: "[]",
                            loc: [14, 45, 14, 52],
                            expression: {
                              kind: "id",
                              loc: [14, 45, 14, 49],
                              text: "pair",
                              bindingKey: "pair$txb5yf5uyd2o$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [14, 50, 14, 51],
                              value: 0,
                            },
                          },
                          {
                            kind: "()",
                            loc: [14, 54, 14, 77],
                            expression: {
                              kind: "bltn",
                              loc: [14, 54, 14, 68],
                              name: "JSON.stringify",
                            },
                            arguments: [
                              {
                                kind: "[]",
                                loc: [14, 69, 14, 76],
                                expression: {
                                  kind: "id",
                                  loc: [14, 69, 14, 73],
                                  text: "pair",
                                  bindingKey: "pair$txb5yf5uyd2o$2",
                                },
                                argumentExpression: {
                                  kind: "number",
                                  loc: [14, 74, 14, 75],
                                  value: 1,
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [16, 7, 16, 42],
            expression: {
              kind: "binop",
              loc: [16, 14, 16, 41],
              left: {
                kind: "binop",
                loc: [16, 14, 16, 29],
                left: {
                  kind: ".",
                  loc: [16, 14, 16, 23],
                  expression: {
                    kind: "id",
                    loc: [16, 14, 16, 21],
                    text: "written",
                    bindingKey: "written$txb5yf5uyd2o$1",
                  },
                  name: "n",
                },
                operatorToken: "+",
                right: {
                  kind: "string",
                  loc: [16, 26, 16, 29],
                  text: " ",
                },
              },
              operatorToken: "+",
              right: {
                kind: ".",
                loc: [16, 32, 16, 41],
                expression: {
                  kind: "id",
                  loc: [16, 32, 16, 39],
                  text: "written",
                  bindingKey: "written$txb5yf5uyd2o$1",
                },
                name: "q",
              },
            },
          },
        ],
      }),
    ),
  );
});
