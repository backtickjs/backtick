import { cs } from "@backtickjs/core";
const shadowing = cs.create(
  [4, 19, 7, 3],
  {
    version: "0.0.0",
    filePath: "shadowing.tsx",
    fileHash: "nzlx7l17gy7j",
    splices: {
      $0splice0: {
        value: addOwnTotal(
          cs.create(
            [6, 24, 6, 33],
            {
              version: "0.0.0",
              filePath: "shadowing.tsx",
              fileHash: "nzlx7l17gy7j",
              splices: {},
              captures: ["total$nzlx7l17gy7j$0"],
            },
            () => ({
              kind: "id",
              loc: [6, 27, 6, 32],
              text: "total",
              bindingKey: "total$nzlx7l17gy7j$0",
            }),
          ),
          100,
        ),
        params: ["total$nzlx7l17gy7j$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [4, 22, 7, 2],
    statements: [
      {
        kind: "const",
        loc: [5, 3, 5, 19],
        name: {
          kind: "id",
          loc: [5, 9, 5, 14],
          text: "total",
          bindingKey: "total$nzlx7l17gy7j$0",
        },
        initializer: {
          kind: "number",
          loc: [5, 17, 5, 18],
          value: 1,
        },
      },
      {
        kind: "return",
        loc: [6, 3, 6, 41],
        expression: {
          kind: "splice",
          loc: [6, 10, 6, 40],
          key: "$0splice0",
        },
      },
    ],
  }),
);
function addOwnTotal(lhs, rhs) {
  return cs.create(
    [10, 10, 15, 5],
    {
      version: "0.0.0",
      filePath: "shadowing.tsx",
      fileHash: "nzlx7l17gy7j",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [10, 13, 15, 4],
      statements: [
        {
          kind: "let",
          loc: [11, 5, 11, 19],
          name: {
            kind: "id",
            loc: [11, 9, 11, 14],
            text: "total",
            bindingKey: "total$nzlx7l17gy7j$1",
          },
          initializer: {
            kind: "number",
            loc: [11, 17, 11, 18],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [12, 5, 12, 25],
          left: {
            kind: "id",
            loc: [12, 5, 12, 10],
            text: "total",
            bindingKey: "total$nzlx7l17gy7j$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [12, 13, 12, 25],
            left: {
              kind: "id",
              loc: [12, 13, 12, 18],
              text: "total",
              bindingKey: "total$nzlx7l17gy7j$1",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [12, 21, 12, 25],
              key: "$lhs",
            },
          },
        },
        {
          kind: "binop",
          loc: [13, 5, 13, 25],
          left: {
            kind: "id",
            loc: [13, 5, 13, 10],
            text: "total",
            bindingKey: "total$nzlx7l17gy7j$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [13, 13, 13, 25],
            left: {
              kind: "id",
              loc: [13, 13, 13, 18],
              text: "total",
              bindingKey: "total$nzlx7l17gy7j$1",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [13, 21, 13, 25],
              key: "$rhs",
            },
          },
        },
        {
          kind: "return",
          loc: [14, 5, 14, 18],
          expression: {
            kind: "id",
            loc: [14, 12, 14, 17],
            text: "total",
            bindingKey: "total$nzlx7l17gy7j$1",
          },
        },
      ],
    }),
  );
}
