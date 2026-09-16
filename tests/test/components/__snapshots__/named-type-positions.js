import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
async function Rows() {
  return cs.create(
    [18, 10, 36, 5],
    {
      version: "0.0.0",
      filePath: "components/named-type-positions.test.tsx",
      fileHash: "2pelpbh8omet0",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [18, 13, 36, 4],
      statements: [
        {
          kind: "const",
          loc: [19, 5, 19, 36],
          name: {
            kind: "id",
            loc: [19, 11, 19, 15],
            text: "rows",
            bindingKey: "rows$2pelpbh8omet0$0",
          },
          initializer: {
            kind: "()",
            loc: [19, 18, 19, 35],
            expression: {
              kind: "splice",
              loc: [19, 18, 19, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [19, 32, 19, 34],
                elements: [],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [20, 5, 22, 7],
          name: {
            kind: "id",
            loc: [20, 11, 20, 14],
            text: "add",
            bindingKey: "add$2pelpbh8omet0$1",
          },
          initializer: {
            kind: "=>",
            loc: [20, 17, 22, 6],
            parameters: [
              {
                kind: "param",
                loc: [20, 18, 20, 26],
                name: {
                  kind: "id",
                  loc: [20, 18, 20, 21],
                  text: "row",
                  bindingKey: "row$2pelpbh8omet0$3",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [20, 31, 22, 6],
              statements: [
                {
                  kind: "()",
                  loc: [21, 7, 21, 24],
                  expression: {
                    kind: ".",
                    loc: [21, 7, 21, 17],
                    expression: {
                      kind: "id",
                      loc: [21, 7, 21, 11],
                      text: "rows",
                      bindingKey: "rows$2pelpbh8omet0$0",
                    },
                    name: "write",
                  },
                  arguments: [
                    {
                      kind: "arr",
                      loc: [21, 18, 21, 23],
                      elements: [
                        {
                          kind: "id",
                          loc: [21, 19, 21, 22],
                          text: "row",
                          bindingKey: "row$2pelpbh8omet0$3",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "const",
          loc: [23, 5, 25, 7],
          name: {
            kind: "id",
            loc: [23, 11, 23, 16],
            text: "label",
            bindingKey: "label$2pelpbh8omet0$2",
          },
          initializer: {
            kind: "=>",
            loc: [23, 19, 25, 6],
            parameters: [
              {
                kind: "param",
                loc: [23, 20, 23, 28],
                name: {
                  kind: "id",
                  loc: [23, 20, 23, 23],
                  text: "row",
                  bindingKey: "row$2pelpbh8omet0$4",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [23, 33, 25, 6],
              statements: [
                {
                  kind: "return",
                  loc: [24, 7, 24, 24],
                  expression: {
                    kind: ".",
                    loc: [24, 14, 24, 23],
                    expression: {
                      kind: "id",
                      loc: [24, 14, 24, 17],
                      text: "row",
                      bindingKey: "row$2pelpbh8omet0$4",
                    },
                    name: "label",
                  },
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [26, 5, 35, 7],
          expression: {
            kind: "jsx",
            loc: [27, 7, 34, 13],
            type: {
              kind: "string",
              loc: [27, 8, 27, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [28, 9, 28, 70],
                type: {
                  kind: "string",
                  loc: [28, 10, 28, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [28, 24, 28, 58],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [28, 30, 28, 58],
                        expression: {
                          kind: "id",
                          loc: [28, 30, 28, 33],
                          text: "add",
                          bindingKey: "add$2pelpbh8omet0$1",
                        },
                        arguments: [
                          {
                            kind: "obj",
                            loc: [28, 34, 28, 57],
                            properties: [
                              {
                                kind: ":",
                                loc: [28, 36, 28, 41],
                                name: "id",
                                initializer: {
                                  kind: "number",
                                  loc: [28, 40, 28, 41],
                                  value: 1,
                                },
                              },
                              {
                                kind: ":",
                                loc: [28, 43, 28, 55],
                                name: "label",
                                initializer: {
                                  kind: "string",
                                  loc: [28, 50, 28, 55],
                                  text: "one",
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [28, 60, 28, 63],
                    text: "add",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [29, 9, 33, 15],
                type: {
                  kind: "string",
                  loc: [29, 10, 29, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [30, 11, 32, 17],
                    type: {
                      kind: "splice",
                      loc: [30, 12, 30, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [30, 22, 30, 33],
                          expression: {
                            kind: ".",
                            loc: [30, 22, 30, 31],
                            expression: {
                              kind: "id",
                              loc: [30, 22, 30, 26],
                              text: "rows",
                              bindingKey: "rows$2pelpbh8omet0$0",
                            },
                            name: "read",
                          },
                          arguments: [],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "=>",
                        loc: [31, 14, 31, 53],
                        parameters: [
                          {
                            kind: "param",
                            loc: [31, 15, 31, 23],
                            name: {
                              kind: "id",
                              loc: [31, 15, 31, 18],
                              text: "row",
                              bindingKey: "row$2pelpbh8omet0$5",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [31, 28, 31, 53],
                          type: {
                            kind: "string",
                            loc: [31, 29, 31, 33],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "()",
                              loc: [31, 35, 31, 45],
                              expression: {
                                kind: "id",
                                loc: [31, 35, 31, 40],
                                text: "label",
                                bindingKey: "label$2pelpbh8omet0$2",
                              },
                              arguments: [
                                {
                                  kind: "id",
                                  loc: [31, 41, 31, 44],
                                  text: "row",
                                  bindingKey: "row$2pelpbh8omet0$5",
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
            ],
          },
        },
      ],
    }),
  );
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
