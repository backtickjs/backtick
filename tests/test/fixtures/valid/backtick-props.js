import { cs, state } from "@backtickjs/core";
// Two bundles written elsewhere, each a function of what it is handed — which
// is what a bundle that takes props is, and drawing one is calling it.
//
// Both read a member plainly, and both stay right after a write: a member is
// read where the drawing reads it, the same as a prop on a component. Nothing
// here is written as a thunk, and the second is handed a cell's read.
const greets = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [["param", "props"]],
      ["el", "em", {}, ["+", "hello ", [".", ["id", "props"], "who"]]],
    ],
  },
  root: ["fn", "0"],
});
const counts = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [["param", "props"]],
      ["el", "b", {}, ["+", "count ", [".", ["id", "props"], "count"]]],
    ],
  },
  root: ["fn", "0"],
});
export default cs.create(
  [31, 16, 41, 3],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "3sd4m4eg1u82u",
    splices: {
      $state: { value: state, params: [] },
      $greets: { value: greets, params: [] },
      $counts: { value: counts, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [31, 19, 41, 2],
    statements: [
      {
        kind: "const",
        loc: [32, 3, 32, 27],
        name: {
          kind: "id",
          loc: [32, 9, 32, 14],
          text: "count",
          bindingKey: "count$3sd4m4eg1u82u$0",
        },
        initializer: {
          kind: "()",
          loc: [32, 17, 32, 26],
          expression: {
            kind: "splice",
            loc: [32, 17, 32, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [32, 24, 32, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [34, 3, 40, 5],
        expression: {
          kind: "jsx",
          loc: [35, 5, 39, 11],
          type: {
            kind: "string",
            loc: [35, 6, 35, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [36, 7, 36, 61],
              type: {
                kind: "string",
                loc: [36, 8, 36, 16],
                text: "backtick",
              },
              attributes: [
                {
                  name: "bundle",
                  initializer: {
                    kind: "splice",
                    loc: [36, 25, 36, 32],
                    key: "$greets",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [36, 41, 36, 57],
                    properties: [
                      {
                        kind: ":",
                        loc: [36, 43, 36, 55],
                        name: "who",
                        initializer: {
                          kind: "string",
                          loc: [36, 48, 36, 55],
                          text: "world",
                        },
                      },
                    ],
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [37, 7, 37, 68],
              type: {
                kind: "string",
                loc: [37, 8, 37, 16],
                text: "backtick",
              },
              attributes: [
                {
                  name: "bundle",
                  initializer: {
                    kind: "splice",
                    loc: [37, 25, 37, 32],
                    key: "$counts",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [37, 41, 37, 64],
                    properties: [
                      {
                        kind: ":",
                        loc: [37, 43, 37, 62],
                        name: "count",
                        initializer: {
                          kind: "()",
                          loc: [37, 50, 37, 62],
                          expression: {
                            kind: ".",
                            loc: [37, 50, 37, 60],
                            expression: {
                              kind: "id",
                              loc: [37, 50, 37, 55],
                              text: "count",
                              bindingKey: "count$3sd4m4eg1u82u$0",
                            },
                            name: "read",
                          },
                          arguments: [],
                        },
                      },
                    ],
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [38, 7, 38, 74],
              type: {
                kind: "string",
                loc: [38, 8, 38, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [38, 24, 38, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [38, 30, 38, 59],
                      expression: {
                        kind: ".",
                        loc: [38, 30, 38, 41],
                        expression: {
                          kind: "id",
                          loc: [38, 30, 38, 35],
                          text: "count",
                          bindingKey: "count$3sd4m4eg1u82u$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [38, 42, 38, 58],
                          left: {
                            kind: "()",
                            loc: [38, 42, 38, 54],
                            expression: {
                              kind: ".",
                              loc: [38, 42, 38, 52],
                              expression: {
                                kind: "id",
                                loc: [38, 42, 38, 47],
                                text: "count",
                                bindingKey: "count$3sd4m4eg1u82u$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [38, 57, 38, 58],
                            value: 1,
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [38, 61, 38, 65],
                  text: "more",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
