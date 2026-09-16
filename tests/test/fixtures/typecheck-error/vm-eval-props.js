import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }) {
  return cs.create(
    [14, 10, 14, 41],
    {
      version: "0.0.0",
      filePath: "vm-eval-props.tsx",
      fileHash: "3pmtvaz1lxn7",
      splices: { $count: { value: count, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [14, 13, 14, 40],
      type: {
        kind: "string",
        loc: [14, 14, 14, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "binop",
          loc: [14, 18, 14, 34],
          left: {
            kind: "string",
            loc: [14, 18, 14, 25],
            text: "rows ",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [14, 28, 14, 34],
            key: "$count",
          },
        },
      ],
    }),
  );
}
async function Nothing() {
  return cs.create(
    [18, 10, 18, 45],
    {
      version: "0.0.0",
      filePath: "vm-eval-props.tsx",
      fileHash: "3pmtvaz1lxn7",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [18, 13, 18, 44],
      type: {
        kind: "string",
        loc: [18, 14, 18, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [18, 18, 18, 38],
          text: "nothing to hand it",
        },
      ],
    }),
  );
}
const rows = await bundler.run(
  cs.create(
    [21, 33, 23, 4],
    {
      version: "0.0.0",
      filePath: "vm-eval-props.tsx",
      fileHash: "3pmtvaz1lxn7",
      splices: {
        $0splice0: {
          value: _jsx(Row, {
            count: cs.create(
              [22, 15, 22, 30],
              {
                version: "0.0.0",
                filePath: "vm-eval-props.tsx",
                fileHash: "3pmtvaz1lxn7",
                splices: {},
                captures: ["props$3pmtvaz1lxn7$0"],
              },
              () => ({
                kind: ".",
                loc: [22, 18, 22, 29],
                expression: {
                  kind: "id",
                  loc: [22, 18, 22, 23],
                  text: "props",
                  bindingKey: "props$3pmtvaz1lxn7$0",
                },
                name: "count",
              }),
            ),
          }),
          params: ["props$3pmtvaz1lxn7$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [21, 36, 23, 3],
      parameters: [
        {
          kind: "param",
          loc: [21, 37, 21, 61],
          name: {
            kind: "id",
            loc: [21, 37, 21, 42],
            text: "props",
            bindingKey: "props$3pmtvaz1lxn7$0",
          },
        },
      ],
      body: {
        kind: "splice",
        loc: [21, 66, 23, 3],
        key: "$0splice0",
      },
    }),
  ),
);
const empty = await bundler.run(_jsx(Nothing, {}));
export default cs.create(
  [27, 16, 50, 3],
  {
    version: "0.0.0",
    filePath: "vm-eval-props.tsx",
    fileHash: "3pmtvaz1lxn7",
    splices: {
      $vm: { value: vm, params: [] },
      $rows: { value: rows, params: [] },
      $empty: { value: empty, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [27, 19, 50, 2],
    statements: [
      {
        kind: "const",
        loc: [28, 3, 28, 32],
        name: {
          kind: "id",
          loc: [28, 9, 28, 13],
          text: "Rows",
          bindingKey: "Rows$3pmtvaz1lxn7$1",
        },
        initializer: {
          kind: "()",
          loc: [28, 16, 28, 31],
          expression: {
            kind: ".",
            loc: [28, 16, 28, 24],
            expression: {
              kind: "splice",
              loc: [28, 16, 28, 19],
              key: "$vm",
            },
            name: "eval",
          },
          arguments: [
            {
              kind: "splice",
              loc: [28, 25, 28, 30],
              key: "$rows",
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [29, 3, 29, 34],
        name: {
          kind: "id",
          loc: [29, 9, 29, 14],
          text: "Empty",
          bindingKey: "Empty$3pmtvaz1lxn7$2",
        },
        initializer: {
          kind: "()",
          loc: [29, 17, 29, 33],
          expression: {
            kind: ".",
            loc: [29, 17, 29, 25],
            expression: {
              kind: "splice",
              loc: [29, 17, 29, 20],
              key: "$vm",
            },
            name: "eval",
          },
          arguments: [
            {
              kind: "splice",
              loc: [29, 26, 29, 32],
              key: "$empty",
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [31, 3, 49, 5],
        expression: {
          kind: "jsx",
          loc: [32, 5, 48, 11],
          type: {
            kind: "string",
            loc: [32, 6, 32, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [34, 7, 34, 25],
              type: {
                kind: "id",
                loc: [34, 8, 34, 12],
                text: "Rows",
                bindingKey: "Rows$3pmtvaz1lxn7$1",
              },
              attributes: [
                {
                  name: "count",
                  initializer: {
                    kind: "number",
                    loc: [34, 20, 34, 21],
                    value: 1,
                  },
                },
              ],
              children: [],
            },
            {
              kind: "id",
              loc: [35, 8, 35, 13],
              text: "Empty",
              bindingKey: "Empty$3pmtvaz1lxn7$2",
            },
            {
              kind: "jsx",
              loc: [38, 7, 38, 29],
              type: {
                kind: "id",
                loc: [38, 8, 38, 12],
                text: "Rows",
                bindingKey: "Rows$3pmtvaz1lxn7$1",
              },
              attributes: [
                {
                  name: "count",
                  initializer: {
                    kind: "string",
                    loc: [38, 20, 38, 25],
                    text: "one",
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [39, 7, 39, 24],
              type: {
                kind: "id",
                loc: [39, 8, 39, 12],
                text: "Rows",
                bindingKey: "Rows$3pmtvaz1lxn7$1",
              },
              attributes: [
                {
                  name: "nope",
                  initializer: {
                    kind: "number",
                    loc: [39, 19, 39, 20],
                    value: 1,
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [40, 7, 40, 15],
              type: {
                kind: "id",
                loc: [40, 8, 40, 12],
                text: "Rows",
                bindingKey: "Rows$3pmtvaz1lxn7$1",
              },
              attributes: [],
              children: [],
            },
            {
              kind: "jsx",
              loc: [43, 7, 43, 26],
              type: {
                kind: "id",
                loc: [43, 8, 43, 13],
                text: "Empty",
                bindingKey: "Empty$3pmtvaz1lxn7$2",
              },
              attributes: [
                {
                  name: "count",
                  initializer: {
                    kind: "number",
                    loc: [43, 21, 43, 22],
                    value: 1,
                  },
                },
              ],
              children: [],
            },
            {
              kind: "()",
              loc: [46, 8, 46, 22],
              expression: {
                kind: ".",
                loc: [46, 8, 46, 16],
                expression: {
                  kind: "splice",
                  loc: [46, 8, 46, 11],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [46, 17, 46, 21],
                },
              ],
            },
            {
              kind: "()",
              loc: [47, 8, 47, 36],
              expression: {
                kind: ".",
                loc: [47, 8, 47, 16],
                expression: {
                  kind: "splice",
                  loc: [47, 8, 47, 11],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "()",
                  loc: [47, 17, 47, 35],
                  expression: {
                    kind: "bltn",
                    loc: [47, 17, 47, 31],
                    name: "JSON.stringify",
                  },
                  arguments: [
                    {
                      kind: "obj",
                      loc: [47, 32, 47, 34],
                      properties: [],
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
