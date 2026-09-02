import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "shadowing.ts",
    fileHash: "wjl0rp4901n3",
    splices: {
      $0splice0: add(
        cs.create(
          [5, 16, 5, 25],
          {
            version: "0.0.0",
            filePath: "shadowing.ts",
            fileHash: "wjl0rp4901n3",
            splices: {},
            captures: ["total$wjl0rp4901n3$0"],
            spliceParams: {},
          },
          () => ({
            kind: 80,
            loc: [5, 19, 5, 24],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$0",
          }),
        ),
        100,
      ),
    },
    captures: [],
    spliceParams: { $0splice0: ["total$wjl0rp4901n3$0"] },
  },
  () => ({
    kind: 242,
    loc: [3, 19, 6, 2],
    statements: [
      {
        kind: 244,
        loc: [4, 3, 4, 19],
        declarationList: {
          kind: 262,
          loc: [4, 3, 4, 18],
          declarations: [
            {
              kind: 261,
              loc: [4, 9, 4, 18],
              name: {
                kind: 80,
                loc: [4, 9, 4, 14],
                text: "total",
                bindingKey: "total$wjl0rp4901n3$0",
              },
              initializer: {
                kind: 9,
                loc: [4, 17, 4, 18],
                value: 1,
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [5, 3, 5, 33],
        expression: {
          kind: 1000,
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
      splices: { $lhs: lhs, $rhs: rhs },
      captures: [],
      spliceParams: { $lhs: [], $rhs: [] },
    },
    () => ({
      kind: 242,
      loc: [9, 13, 14, 4],
      statements: [
        {
          kind: 244,
          loc: [10, 5, 10, 19],
          declarationList: {
            kind: 262,
            loc: [10, 5, 10, 18],
            declarations: [
              {
                kind: 261,
                loc: [10, 9, 10, 18],
                name: {
                  kind: 80,
                  loc: [10, 9, 10, 14],
                  text: "total",
                  bindingKey: "total$wjl0rp4901n3$1",
                },
                initializer: {
                  kind: 9,
                  loc: [10, 17, 10, 18],
                  value: 0,
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 227,
          loc: [11, 5, 11, 25],
          left: {
            kind: 80,
            loc: [11, 5, 11, 10],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          operatorToken: "=",
          right: {
            kind: 227,
            loc: [11, 13, 11, 25],
            left: {
              kind: 80,
              loc: [11, 13, 11, 18],
              text: "total",
              bindingKey: "total$wjl0rp4901n3$1",
            },
            operatorToken: "+",
            right: {
              kind: 1000,
              loc: [11, 21, 11, 25],
              key: "$lhs",
            },
          },
        },
        {
          kind: 227,
          loc: [12, 5, 12, 25],
          left: {
            kind: 80,
            loc: [12, 5, 12, 10],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
          operatorToken: "=",
          right: {
            kind: 227,
            loc: [12, 13, 12, 25],
            left: {
              kind: 80,
              loc: [12, 13, 12, 18],
              text: "total",
              bindingKey: "total$wjl0rp4901n3$1",
            },
            operatorToken: "+",
            right: {
              kind: 1000,
              loc: [12, 21, 12, 25],
              key: "$rhs",
            },
          },
        },
        {
          kind: 254,
          loc: [13, 5, 13, 18],
          expression: {
            kind: 80,
            loc: [13, 12, 13, 17],
            text: "total",
            bindingKey: "total$wjl0rp4901n3$1",
          },
        },
      ],
    }),
  );
}
