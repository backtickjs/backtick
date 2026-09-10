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
      fileHash: "eseyl0zakb7d",
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
      fileHash: "eseyl0zakb7d",
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
const greets = await bundler.run(
  cs.create(
    [22, 34, 24, 6],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "eseyl0zakb7d",
      splices: {
        $0splice0: {
          value: _jsx(Greets, {
            who: cs.create(
              [23, 18, 23, 31],
              {
                version: "0.0.0",
                filePath: "backtick-props.tsx",
                fileHash: "eseyl0zakb7d",
                splices: {},
                captures: ["props$eseyl0zakb7d$0"],
              },
              () => ({
                kind: ".",
                loc: [23, 21, 23, 30],
                expression: {
                  kind: "id",
                  loc: [23, 21, 23, 26],
                  text: "props",
                  bindingKey: "props$eseyl0zakb7d$0",
                },
                name: "who",
              }),
            ),
          }),
          params: ["props$eseyl0zakb7d$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [22, 37, 24, 5],
      parameters: [
        {
          kind: "param",
          loc: [22, 38, 22, 60],
          name: {
            kind: "id",
            loc: [22, 38, 22, 43],
            text: "props",
            bindingKey: "props$eseyl0zakb7d$0",
          },
        },
      ],
      body: {
        kind: "splice",
        loc: [22, 65, 24, 5],
        key: "$0splice0",
      },
    }),
  ),
);
const counts = await bundler.run(
  cs.create(
    [26, 34, 28, 6],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "eseyl0zakb7d",
      splices: {
        $0splice0: {
          value: _jsx(Counts, {
            count: cs.create(
              [27, 20, 27, 35],
              {
                version: "0.0.0",
                filePath: "backtick-props.tsx",
                fileHash: "eseyl0zakb7d",
                splices: {},
                captures: ["props$eseyl0zakb7d$1"],
              },
              () => ({
                kind: ".",
                loc: [27, 23, 27, 34],
                expression: {
                  kind: "id",
                  loc: [27, 23, 27, 28],
                  text: "props",
                  bindingKey: "props$eseyl0zakb7d$1",
                },
                name: "count",
              }),
            ),
          }),
          params: ["props$eseyl0zakb7d$1"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [26, 37, 28, 5],
      parameters: [
        {
          kind: "param",
          loc: [26, 38, 26, 62],
          name: {
            kind: "id",
            loc: [26, 38, 26, 43],
            text: "props",
            bindingKey: "props$eseyl0zakb7d$1",
          },
        },
      ],
      body: {
        kind: "splice",
        loc: [26, 67, 28, 5],
        key: "$0splice0",
      },
    }),
  ),
);
export default cs.create(
  [30, 16, 40, 3],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "eseyl0zakb7d",
    splices: {
      $state: { value: state, params: [] },
      $greets: { value: greets, params: [] },
      $counts: { value: counts, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [30, 19, 40, 2],
    statements: [
      {
        kind: "const",
        loc: [31, 3, 31, 27],
        name: {
          kind: "id",
          loc: [31, 9, 31, 14],
          text: "count",
          bindingKey: "count$eseyl0zakb7d$2",
        },
        initializer: {
          kind: "()",
          loc: [31, 17, 31, 26],
          expression: {
            kind: "splice",
            loc: [31, 17, 31, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [31, 24, 31, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [33, 3, 39, 5],
        expression: {
          kind: "jsx",
          loc: [34, 5, 38, 11],
          type: {
            kind: "string",
            loc: [34, 6, 34, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [35, 7, 35, 61],
              type: {
                kind: "string",
                loc: [35, 8, 35, 16],
                text: "backtick",
              },
              attributes: [
                {
                  name: "bundle",
                  initializer: {
                    kind: "splice",
                    loc: [35, 25, 35, 32],
                    key: "$greets",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [35, 41, 35, 57],
                    properties: [
                      {
                        kind: ":",
                        loc: [35, 43, 35, 55],
                        name: "who",
                        initializer: {
                          kind: "string",
                          loc: [35, 48, 35, 55],
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
              loc: [36, 7, 36, 68],
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
                    key: "$counts",
                  },
                },
                {
                  name: "props",
                  initializer: {
                    kind: "obj",
                    loc: [36, 41, 36, 64],
                    properties: [
                      {
                        kind: ":",
                        loc: [36, 43, 36, 62],
                        name: "count",
                        initializer: {
                          kind: "()",
                          loc: [36, 50, 36, 62],
                          expression: {
                            kind: ".",
                            loc: [36, 50, 36, 60],
                            expression: {
                              kind: "id",
                              loc: [36, 50, 36, 55],
                              text: "count",
                              bindingKey: "count$eseyl0zakb7d$2",
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
              loc: [37, 7, 37, 74],
              type: {
                kind: "string",
                loc: [37, 8, 37, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [37, 24, 37, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [37, 30, 37, 59],
                      expression: {
                        kind: ".",
                        loc: [37, 30, 37, 41],
                        expression: {
                          kind: "id",
                          loc: [37, 30, 37, 35],
                          text: "count",
                          bindingKey: "count$eseyl0zakb7d$2",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [37, 42, 37, 58],
                          left: {
                            kind: "()",
                            loc: [37, 42, 37, 54],
                            expression: {
                              kind: ".",
                              loc: [37, 42, 37, 52],
                              expression: {
                                kind: "id",
                                loc: [37, 42, 37, 47],
                                text: "count",
                                bindingKey: "count$eseyl0zakb7d$2",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [37, 57, 37, 58],
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
                  loc: [37, 61, 37, 65],
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
