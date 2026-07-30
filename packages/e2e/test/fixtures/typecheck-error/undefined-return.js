import { cs } from "@backtickjs/core";
const lying = cs.create(
  [11, 36, 11, 50],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "19ws50ksjspoc",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [11, 39, 11, 49],
    parameters: [],
    body: {
      kind: 11,
      loc: [11, 45, 11, 49],
      text: "hi",
    },
  }),
);
export default cs.create(
  [13, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "19ws50ksjspoc",
    kind: "value",
    splices: { $lying: lying },
    captures: [],
    spliceParams: { $lying: [] },
  },
  () => ({
    kind: 242,
    loc: [13, 19, 17, 2],
    statements: [
      {
        kind: 261,
        loc: [14, 3, 14, 25],
        name: {
          kind: 80,
          loc: [14, 9, 14, 15],
          text: "stored",
          bindingKey: "stored$19ws50ksjspoc$0",
        },
        initializer: {
          kind: 1000,
          loc: [14, 18, 14, 24],
          key: "$lying",
        },
        keyword: "const",
      },
      {
        kind: 261,
        loc: [15, 3, 15, 27],
        name: {
          kind: 80,
          loc: [15, 9, 15, 15],
          text: "caught",
          bindingKey: "caught$19ws50ksjspoc$1",
        },
        initializer: {
          kind: 214,
          loc: [15, 18, 15, 26],
          expression: {
            kind: 1000,
            loc: [15, 18, 15, 24],
            key: "$lying",
          },
          questionDotToken: false,
          arguments: [],
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [16, 3, 16, 12],
        expression: {
          kind: 9,
          loc: [16, 10, 16, 11],
          value: 1,
        },
      },
    ],
  }),
);
