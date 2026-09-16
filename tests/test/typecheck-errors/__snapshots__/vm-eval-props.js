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
      filePath: "typecheck-errors/vm-eval-props.test.tsx",
      fileHash: "vvfnmeuqv3tm",
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
      filePath: "typecheck-errors/vm-eval-props.test.tsx",
      fileHash: "vvfnmeuqv3tm",
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
    [22, 3, 22, 73],
    {
      version: "0.0.0",
      filePath: "typecheck-errors/vm-eval-props.test.tsx",
      fileHash: "vvfnmeuqv3tm",
      splices: {
        $0splice0: {
          value: _jsx(Row, {
            count: cs.create(
              [22, 51, 22, 66],
              {
                version: "0.0.0",
                filePath: "typecheck-errors/vm-eval-props.test.tsx",
                fileHash: "vvfnmeuqv3tm",
                splices: {},
                captures: ["props$vvfnmeuqv3tm$0"],
              },
              () => ({
                kind: ".",
                loc: [22, 54, 22, 65],
                expression: {
                  kind: "id",
                  loc: [22, 54, 22, 59],
                  text: "props",
                  bindingKey: "props$vvfnmeuqv3tm$0",
                },
                name: "count",
              }),
            ),
          }),
          params: ["props$vvfnmeuqv3tm$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [22, 6, 22, 72],
      parameters: [
        {
          kind: "param",
          loc: [22, 7, 22, 31],
          name: {
            kind: "id",
            loc: [22, 7, 22, 12],
            text: "props",
            bindingKey: "props$vvfnmeuqv3tm$0",
          },
        },
      ],
      body: {
        kind: "splice",
        loc: [22, 36, 22, 72],
        key: "$0splice0",
      },
    }),
  ),
);
const empty = await bundler.run(_jsx(Nothing, {}));
export default cs.create(
  [27, 16, 63, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/vm-eval-props.test.tsx",
    fileHash: "vvfnmeuqv3tm",
    splices: {
      $vm: { value: vm, params: [] },
      $rows: { value: rows, params: [] },
      $empty: { value: empty, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [27, 19, 63, 2],
    statements: [
      {
        kind: "const",
        loc: [28, 3, 28, 32],
        name: {
          kind: "id",
          loc: [28, 9, 28, 13],
          text: "Rows",
          bindingKey: "Rows$vvfnmeuqv3tm$1",
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
          bindingKey: "Empty$vvfnmeuqv3tm$2",
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
        kind: "const",
        loc: [33, 3, 33, 44],
        name: {
          kind: "id",
          loc: [33, 9, 33, 18],
          text: "wrongType",
          bindingKey: "wrongType$vvfnmeuqv3tm$3",
        },
        initializer: {
          kind: "jsx",
          loc: [33, 21, 33, 43],
          type: {
            kind: "id",
            loc: [33, 22, 33, 26],
            text: "Rows",
            bindingKey: "Rows$vvfnmeuqv3tm$1",
          },
          attributes: [
            {
              name: "count",
              initializer: {
                kind: "string",
                loc: [33, 34, 33, 39],
                text: "one",
              },
            },
          ],
          children: [],
        },
      },
      {
        kind: "const",
        loc: [35, 3, 35, 41],
        name: {
          kind: "id",
          loc: [35, 9, 35, 20],
          text: "unknownName",
          bindingKey: "unknownName$vvfnmeuqv3tm$4",
        },
        initializer: {
          kind: "jsx",
          loc: [35, 23, 35, 40],
          type: {
            kind: "id",
            loc: [35, 24, 35, 28],
            text: "Rows",
            bindingKey: "Rows$vvfnmeuqv3tm$1",
          },
          attributes: [
            {
              name: "nope",
              initializer: {
                kind: "number",
                loc: [35, 35, 35, 36],
                value: 1,
              },
            },
          ],
          children: [],
        },
      },
      {
        kind: "const",
        loc: [37, 3, 37, 28],
        name: {
          kind: "id",
          loc: [37, 9, 37, 16],
          text: "missing",
          bindingKey: "missing$vvfnmeuqv3tm$5",
        },
        initializer: {
          kind: "jsx",
          loc: [37, 19, 37, 27],
          type: {
            kind: "id",
            loc: [37, 20, 37, 24],
            text: "Rows",
            bindingKey: "Rows$vvfnmeuqv3tm$1",
          },
          attributes: [],
          children: [],
        },
      },
      {
        kind: "const",
        loc: [41, 3, 41, 38],
        name: {
          kind: "id",
          loc: [41, 9, 41, 15],
          text: "called",
          bindingKey: "called$vvfnmeuqv3tm$6",
        },
        initializer: {
          kind: "jsx",
          loc: [41, 18, 41, 37],
          type: {
            kind: "id",
            loc: [41, 19, 41, 24],
            text: "Empty",
            bindingKey: "Empty$vvfnmeuqv3tm$2",
          },
          attributes: [
            {
              name: "count",
              initializer: {
                kind: "number",
                loc: [41, 32, 41, 33],
                value: 1,
              },
            },
          ],
          children: [],
        },
      },
      {
        kind: "return",
        loc: [43, 3, 62, 5],
        expression: {
          kind: "jsx",
          loc: [44, 5, 61, 11],
          type: {
            kind: "string",
            loc: [44, 6, 44, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [46, 7, 46, 25],
              type: {
                kind: "id",
                loc: [46, 8, 46, 12],
                text: "Rows",
                bindingKey: "Rows$vvfnmeuqv3tm$1",
              },
              attributes: [
                {
                  name: "count",
                  initializer: {
                    kind: "number",
                    loc: [46, 20, 46, 21],
                    value: 1,
                  },
                },
              ],
              children: [],
            },
            {
              kind: "id",
              loc: [47, 8, 47, 13],
              text: "Empty",
              bindingKey: "Empty$vvfnmeuqv3tm$2",
            },
            {
              kind: "id",
              loc: [48, 8, 48, 17],
              text: "wrongType",
              bindingKey: "wrongType$vvfnmeuqv3tm$3",
            },
            {
              kind: "id",
              loc: [49, 8, 49, 19],
              text: "unknownName",
              bindingKey: "unknownName$vvfnmeuqv3tm$4",
            },
            {
              kind: "id",
              loc: [50, 8, 50, 15],
              text: "missing",
              bindingKey: "missing$vvfnmeuqv3tm$5",
            },
            {
              kind: "id",
              loc: [51, 8, 51, 14],
              text: "called",
              bindingKey: "called$vvfnmeuqv3tm$6",
            },
            {
              kind: "()",
              loc: [55, 9, 55, 23],
              expression: {
                kind: ".",
                loc: [55, 9, 55, 17],
                expression: {
                  kind: "splice",
                  loc: [55, 9, 55, 12],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [55, 18, 55, 22],
                },
              ],
            },
            {
              kind: "()",
              loc: [59, 9, 59, 37],
              expression: {
                kind: ".",
                loc: [59, 9, 59, 17],
                expression: {
                  kind: "splice",
                  loc: [59, 9, 59, 12],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "()",
                  loc: [59, 18, 59, 36],
                  expression: {
                    kind: "bltn",
                    loc: [59, 18, 59, 32],
                    name: "JSON.stringify",
                  },
                  arguments: [
                    {
                      kind: "obj",
                      loc: [59, 33, 59, 35],
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
