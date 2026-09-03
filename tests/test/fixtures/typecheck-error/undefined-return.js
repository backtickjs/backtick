import { cs } from "@backtickjs/core";
const lying = cs.create(
  [11, 36, 11, 50],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "19ws50ksjspoc",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [11, 39, 11, 49],
    parameters: [],
    body: {
      kind: "string",
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
    splices: { $lying: { value: lying, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [13, 19, 17, 2],
    statements: [
      {
        kind: "const",
        loc: [14, 3, 14, 25],
        name: {
          kind: "id",
          loc: [14, 9, 14, 15],
          text: "stored",
          bindingKey: "stored$19ws50ksjspoc$0",
        },
        initializer: {
          kind: "splice",
          loc: [14, 18, 14, 24],
          key: "$lying",
        },
      },
      {
        kind: "const",
        loc: [15, 3, 15, 27],
        name: {
          kind: "id",
          loc: [15, 9, 15, 15],
          text: "caught",
          bindingKey: "caught$19ws50ksjspoc$1",
        },
        initializer: {
          kind: "()",
          loc: [15, 18, 15, 26],
          expression: {
            kind: "splice",
            loc: [15, 18, 15, 24],
            key: "$lying",
          },
          arguments: [],
        },
      },
      {
        kind: "return",
        loc: [16, 3, 16, 12],
        expression: {
          kind: "number",
          loc: [16, 10, 16, 11],
          value: 1,
        },
      },
    ],
  }),
);
