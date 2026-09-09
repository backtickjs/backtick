import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// `render.test.ts` draws this into a target that is already holding something
// and empties it, which a claim to the whole target would take with it.
async function Rows() {
  return cs.create(
    [11, 10, 24, 5],
    {
      version: "0.0.0",
      filePath: "root-list.tsx",
      fileHash: "3u9vjn40mllyh",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [11, 13, 24, 4],
      statements: [
        {
          kind: "const",
          loc: [12, 5, 12, 45],
          name: {
            kind: "id",
            loc: [12, 11, 12, 14],
            text: "ids",
            bindingKey: "ids$3u9vjn40mllyh$0",
          },
          initializer: {
            kind: "()",
            loc: [12, 17, 12, 44],
            expression: {
              kind: "splice",
              loc: [12, 17, 12, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [12, 34, 12, 43],
                elements: [
                  {
                    kind: "number",
                    loc: [12, 35, 12, 36],
                    value: 1,
                  },
                  {
                    kind: "number",
                    loc: [12, 38, 12, 39],
                    value: 2,
                  },
                  {
                    kind: "number",
                    loc: [12, 41, 12, 42],
                    value: 3,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [13, 5, 15, 7],
          name: {
            kind: "id",
            loc: [13, 11, 13, 16],
            text: "clear",
            bindingKey: "clear$3u9vjn40mllyh$1",
          },
          initializer: {
            kind: "=>",
            loc: [13, 19, 15, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [13, 25, 15, 6],
              statements: [
                {
                  kind: "()",
                  loc: [14, 7, 14, 27],
                  expression: {
                    kind: ".",
                    loc: [14, 7, 14, 17],
                    expression: {
                      kind: "id",
                      loc: [14, 7, 14, 10],
                      text: "ids",
                      bindingKey: "ids$3u9vjn40mllyh$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [14, 18, 14, 26],
                      parameters: [],
                      body: {
                        kind: "arr",
                        loc: [14, 24, 14, 26],
                        elements: [],
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [16, 5, 23, 7],
          expression: {
            kind: "jsx",
            loc: [17, 7, 22, 10],
            type: {
              kind: "string",
              loc: [17, 7, 22, 10],
              text: "Fragment",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [18, 9, 18, 43],
                type: {
                  kind: "string",
                  loc: [18, 10, 18, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [18, 24, 18, 29],
                      text: "clear",
                      bindingKey: "clear$3u9vjn40mllyh$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [18, 31, 18, 36],
                    text: "clear",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [19, 9, 21, 15],
                type: {
                  kind: "splice",
                  loc: [19, 10, 19, 13],
                  key: "$For",
                },
                attributes: [
                  {
                    name: "each",
                    initializer: {
                      kind: "()",
                      loc: [19, 20, 19, 30],
                      expression: {
                        kind: ".",
                        loc: [19, 20, 19, 28],
                        expression: {
                          kind: "id",
                          loc: [19, 20, 19, 23],
                          text: "ids",
                          bindingKey: "ids$3u9vjn40mllyh$0",
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
                    loc: [20, 12, 20, 54],
                    parameters: [
                      {
                        kind: "param",
                        loc: [20, 13, 20, 23],
                        name: {
                          kind: "id",
                          loc: [20, 13, 20, 15],
                          text: "id",
                          bindingKey: "id$3u9vjn40mllyh$2",
                        },
                      },
                    ],
                    body: {
                      kind: "jsx",
                      loc: [20, 28, 20, 54],
                      type: {
                        kind: "string",
                        loc: [20, 29, 20, 33],
                        text: "span",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: "binop",
                          loc: [20, 35, 20, 46],
                          left: {
                            kind: "string",
                            loc: [20, 35, 20, 41],
                            text: "row ",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [20, 44, 20, 46],
                            text: "id",
                            bindingKey: "id$3u9vjn40mllyh$2",
                          },
                        },
                      ],
                    },
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
export default _jsx(Rows, {});
