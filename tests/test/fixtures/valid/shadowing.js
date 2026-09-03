import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "shadowing.ts",
    fileHash: "wjl0rp4901n3",
    splices: {
      $0splice0: {
        value: add(
          cs.create(
            [5, 16, 5, 25],
            {
              version: "0.0.0",
              filePath: "shadowing.ts",
              fileHash: "wjl0rp4901n3",
              splices: {},
              captures: ["total$wjl0rp4901n3$0"],
            },
            () => ({
              kind: "id",
              loc: [5, 19, 5, 24],
              text: "total",
              bindingKey: "total$wjl0rp4901n3$0",
            }),
          ),
          100,
        ),
        params: ["total$wjl0rp4901n3$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [3, 19, 6, 2],
    statements: [
      {
        kind: "const",
        loc: [4, 3, 4, 19],
        name: {
          kind: "id",
          loc: [4, 9, 4, 14],
          text: "total",
          bindingKey: "total$wjl0rp4901n3$0",
        },
        initializer: {
          kind: "number",
          loc: [4, 17, 4, 18],
          value: 1,
        },
      },
      {
        kind: "return",
        loc: [5, 3, 5, 33],
        expression: {
          kind: "splice",
          loc: [5, 10, 5, 32],
          key: "$0splice0",
        },
      },
    ],
  }),
);
function add(lhs, rhs) {
  return cs.create(
    [9, 10, 14, 5],
    {
      version: "0.0.0",
      filePath: "shadowing.ts",
      fileHash: "wjl0rp4901n3",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [9, 13, 14, 4],
      statements: [
        {
          kind: "let",
          loc: [10, 5, 10, 19],
          name: {
            kind: "id",
            loc: [10, 9, 10, 14],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          initializer: {
            kind: "number",
            loc: [10, 17, 10, 18],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [11, 5, 11, 25],
          left: {
            kind: "id",
            loc: [11, 5, 11, 10],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [11, 13, 11, 25],
            left: {
              kind: "id",
              loc: [11, 13, 11, 18],
              text: "total",
              bindingKey: "total$wjl0rp4901n3$1",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [11, 21, 11, 25],
              key: "$lhs",
            },
          },
        },
        {
          kind: "binop",
          loc: [12, 5, 12, 25],
          left: {
            kind: "id",
            loc: [12, 5, 12, 10],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [12, 13, 12, 25],
            left: {
              kind: "id",
              loc: [12, 13, 12, 18],
              text: "total",
              bindingKey: "total$wjl0rp4901n3$1",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [12, 21, 12, 25],
              key: "$rhs",
            },
          },
        },
        {
          kind: "return",
          loc: [13, 5, 13, 18],
          expression: {
            kind: "id",
            loc: [13, 12, 13, 17],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
        },
      ],
    }),
  );
}
