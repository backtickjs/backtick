import { cs, state } from "@backtickjs/core";
// Two bundles written elsewhere, each reading `props` — the way any script
// reads a name it did not write.
//
// The second is handed a cell as a splice, so it stays right after a write
// without being built again: reading a splice is calling it.
const greets = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [],
      ["el", "em", {}, ["+", "hello ", [".", ["bltn", "props"], "who"]]],
    ],
  },
  root: ["()", ["fn", "0"], []],
});
const counts = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [],
      [
        "el",
        "b",
        {},
        ["+", "count ", ["()", [".", ["bltn", "props"], "count"], []]],
      ],
    ],
  },
  root: ["()", ["fn", "0"], []],
});
export default cs.create(
  [35, 16, 45, 3],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "1ecentabg3wcr",
    splices: {
      $state: { value: state, params: [] },
      $greets: { value: greets, params: [] },
      $counts: { value: counts, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [35, 19, 45, 2],
    statements: [
      {
        kind: "const",
        loc: [36, 3, 36, 27],
        name: {
          kind: "id",
          loc: [36, 9, 36, 14],
          text: "count",
          bindingKey: "count$1ecentabg3wcr$0",
        },
        initializer: {
          kind: "()",
          loc: [36, 17, 36, 26],
          expression: {
            kind: "splice",
            loc: [36, 17, 36, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [36, 24, 36, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [38, 3, 44, 5],
        expression: {
          kind: "jsx",
          loc: [39, 5, 43, 11],
          type: {
            kind: "string",
            loc: [39, 6, 39, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [40, 7, 40, 61],
              type: {
                kind: "string",
                loc: [40, 8, 40, 16],
                text: "backtick",
              },
              attributes: [
                {
                  name: "bundle",
                  initializer: {
                    kind: "splice",
                    loc: [40, 25, 40, 32],
                    key: "$greets",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [40, 41, 40, 57],
                    properties: [
                      {
                        kind: ":",
                        loc: [40, 43, 40, 55],
                        name: "who",
                        initializer: {
                          kind: "string",
                          loc: [40, 48, 40, 55],
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
              loc: [41, 7, 41, 74],
              type: {
                kind: "string",
                loc: [41, 8, 41, 16],
                text: "backtick",
              },
              attributes: [
                {
                  name: "bundle",
                  initializer: {
                    kind: "splice",
                    loc: [41, 25, 41, 32],
                    key: "$counts",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [41, 41, 41, 70],
                    properties: [
                      {
                        kind: ":",
                        loc: [41, 43, 41, 68],
                        name: "count",
                        initializer: {
                          kind: "=>",
                          loc: [41, 50, 41, 68],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [41, 56, 41, 68],
                            expression: {
                              kind: ".",
                              loc: [41, 56, 41, 66],
                              expression: {
                                kind: "id",
                                loc: [41, 56, 41, 61],
                                text: "count",
                                bindingKey: "count$1ecentabg3wcr$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
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
              loc: [42, 7, 42, 74],
              type: {
                kind: "string",
                loc: [42, 8, 42, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [42, 24, 42, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [42, 30, 42, 59],
                      expression: {
                        kind: ".",
                        loc: [42, 30, 42, 41],
                        expression: {
                          kind: "id",
                          loc: [42, 30, 42, 35],
                          text: "count",
                          bindingKey: "count$1ecentabg3wcr$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [42, 42, 42, 58],
                          left: {
                            kind: "()",
                            loc: [42, 42, 42, 54],
                            expression: {
                              kind: ".",
                              loc: [42, 42, 42, 52],
                              expression: {
                                kind: "id",
                                loc: [42, 42, 42, 47],
                                text: "count",
                                bindingKey: "count$1ecentabg3wcr$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [42, 57, 42, 58],
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
                  loc: [42, 61, 42, 65],
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
