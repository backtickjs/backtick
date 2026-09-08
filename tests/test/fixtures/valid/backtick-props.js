import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
// Two bundles written elsewhere, each a function of what it is handed — which
// is what a bundle that takes props is, and drawing one is calling it.
//
// Both read a member plainly, and both stay right after a write: a member is
// read where the drawing reads it, the same as a prop on a component. Nothing
// here is written as a thunk, and the second is handed a cell's read.
//
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice.
async function Greets({ who }) {
  return cs.create(
    [15, 10, 15, 40],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "1e0v5kuapk9ct",
      splices: { $who: { value: who, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [15, 13, 15, 39],
      type: {
        kind: "string",
        loc: [15, 14, 15, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "binop",
          loc: [15, 18, 15, 33],
          left: {
            kind: "string",
            loc: [15, 18, 15, 26],
            text: "hello ",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [15, 29, 15, 33],
            key: "$who",
          },
        },
      ],
    }),
  );
}
async function Counts({ count }) {
  return cs.create(
    [19, 10, 19, 40],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "1e0v5kuapk9ct",
      splices: { $count: { value: count, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [19, 13, 19, 39],
      type: {
        kind: "string",
        loc: [19, 14, 19, 15],
        text: "b",
      },
      attributes: [],
      children: [
        {
          kind: "binop",
          loc: [19, 17, 19, 34],
          left: {
            kind: "string",
            loc: [19, 17, 19, 25],
            text: "count ",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [19, 28, 19, 34],
            key: "$count",
          },
        },
      ],
    }),
  );
}
const greets = JSON.stringify(
  await bundler.run(
    cs.create(
      [23, 21, 25, 6],
      {
        version: "0.0.0",
        filePath: "backtick-props.tsx",
        fileHash: "1e0v5kuapk9ct",
        splices: {
          $0splice0: {
            value: _jsx(Greets, {
              who: cs.create(
                [24, 18, 24, 31],
                {
                  version: "0.0.0",
                  filePath: "backtick-props.tsx",
                  fileHash: "1e0v5kuapk9ct",
                  splices: {},
                  captures: ["props$1e0v5kuapk9ct$0"],
                },
                () => ({
                  kind: ".",
                  loc: [24, 21, 24, 30],
                  expression: {
                    kind: "id",
                    loc: [24, 21, 24, 26],
                    text: "props",
                    bindingKey: "props$1e0v5kuapk9ct$0",
                  },
                  name: "who",
                }),
              ),
            }),
            params: ["props$1e0v5kuapk9ct$0"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [23, 24, 25, 5],
        parameters: [
          {
            kind: "param",
            loc: [23, 25, 23, 47],
            name: {
              kind: "id",
              loc: [23, 25, 23, 30],
              text: "props",
              bindingKey: "props$1e0v5kuapk9ct$0",
            },
          },
        ],
        body: {
          kind: "splice",
          loc: [23, 52, 25, 5],
          key: "$0splice0",
        },
      }),
    ),
  ),
);
const counts = JSON.stringify(
  await bundler.run(
    cs.create(
      [29, 21, 31, 6],
      {
        version: "0.0.0",
        filePath: "backtick-props.tsx",
        fileHash: "1e0v5kuapk9ct",
        splices: {
          $0splice0: {
            value: _jsx(Counts, {
              count: cs.create(
                [30, 20, 30, 35],
                {
                  version: "0.0.0",
                  filePath: "backtick-props.tsx",
                  fileHash: "1e0v5kuapk9ct",
                  splices: {},
                  captures: ["props$1e0v5kuapk9ct$1"],
                },
                () => ({
                  kind: ".",
                  loc: [30, 23, 30, 34],
                  expression: {
                    kind: "id",
                    loc: [30, 23, 30, 28],
                    text: "props",
                    bindingKey: "props$1e0v5kuapk9ct$1",
                  },
                  name: "count",
                }),
              ),
            }),
            params: ["props$1e0v5kuapk9ct$1"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [29, 24, 31, 5],
        parameters: [
          {
            kind: "param",
            loc: [29, 25, 29, 49],
            name: {
              kind: "id",
              loc: [29, 25, 29, 30],
              text: "props",
              bindingKey: "props$1e0v5kuapk9ct$1",
            },
          },
        ],
        body: {
          kind: "splice",
          loc: [29, 54, 31, 5],
          key: "$0splice0",
        },
      }),
    ),
  ),
);
export default cs.create(
  [34, 16, 44, 3],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "1e0v5kuapk9ct",
    splices: {
      $state: { value: state, params: [] },
      $greets: { value: greets, params: [] },
      $counts: { value: counts, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [34, 19, 44, 2],
    statements: [
      {
        kind: "const",
        loc: [35, 3, 35, 27],
        name: {
          kind: "id",
          loc: [35, 9, 35, 14],
          text: "count",
          bindingKey: "count$1e0v5kuapk9ct$2",
        },
        initializer: {
          kind: "()",
          loc: [35, 17, 35, 26],
          expression: {
            kind: "splice",
            loc: [35, 17, 35, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [35, 24, 35, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [37, 3, 43, 5],
        expression: {
          kind: "jsx",
          loc: [38, 5, 42, 11],
          type: {
            kind: "string",
            loc: [38, 6, 38, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [39, 7, 39, 61],
              type: {
                kind: "string",
                loc: [39, 8, 39, 16],
                text: "backtick",
              },
              attributes: [
                {
                  name: "bundle",
                  initializer: {
                    kind: "splice",
                    loc: [39, 25, 39, 32],
                    key: "$greets",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [39, 41, 39, 57],
                    properties: [
                      {
                        kind: ":",
                        loc: [39, 43, 39, 55],
                        name: "who",
                        initializer: {
                          kind: "string",
                          loc: [39, 48, 39, 55],
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
              loc: [40, 7, 40, 68],
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
                    key: "$counts",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [40, 41, 40, 64],
                    properties: [
                      {
                        kind: ":",
                        loc: [40, 43, 40, 62],
                        name: "count",
                        initializer: {
                          kind: "()",
                          loc: [40, 50, 40, 62],
                          expression: {
                            kind: ".",
                            loc: [40, 50, 40, 60],
                            expression: {
                              kind: "id",
                              loc: [40, 50, 40, 55],
                              text: "count",
                              bindingKey: "count$1e0v5kuapk9ct$2",
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
              loc: [41, 7, 41, 74],
              type: {
                kind: "string",
                loc: [41, 8, 41, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [41, 24, 41, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [41, 30, 41, 59],
                      expression: {
                        kind: ".",
                        loc: [41, 30, 41, 41],
                        expression: {
                          kind: "id",
                          loc: [41, 30, 41, 35],
                          text: "count",
                          bindingKey: "count$1e0v5kuapk9ct$2",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [41, 42, 41, 58],
                          left: {
                            kind: "()",
                            loc: [41, 42, 41, 54],
                            expression: {
                              kind: ".",
                              loc: [41, 42, 41, 52],
                              expression: {
                                kind: "id",
                                loc: [41, 42, 41, 47],
                                text: "count",
                                bindingKey: "count$1e0v5kuapk9ct$2",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [41, 57, 41, 58],
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
                  loc: [41, 61, 41, 65],
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
