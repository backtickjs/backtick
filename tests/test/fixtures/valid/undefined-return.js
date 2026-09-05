import { cs } from "@backtickjs/core";
const lying = cs.create(
  [9, 36, 9, 50],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "1a0g2ssam79ov",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [9, 39, 9, 49],
    parameters: [],
    body: {
      kind: "string",
      loc: [9, 45, 9, 49],
      text: "hi",
    },
  }),
);
export default cs.create(
  [11, 16, 15, 3],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "1a0g2ssam79ov",
    splices: { $lying: { value: lying, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 19, 15, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 25],
        name: {
          kind: "id",
          loc: [12, 9, 12, 15],
          text: "stored",
          bindingKey: "stored$1a0g2ssam79ov$0",
        },
        initializer: {
          kind: "splice",
          loc: [12, 18, 12, 24],
          key: "$lying",
        },
      },
      {
        kind: "const",
        loc: [13, 3, 13, 27],
        name: {
          kind: "id",
          loc: [13, 9, 13, 15],
          text: "caught",
          bindingKey: "caught$1a0g2ssam79ov$1",
        },
        initializer: {
          kind: "()",
          loc: [13, 18, 13, 26],
          expression: {
            kind: "splice",
            loc: [13, 18, 13, 24],
            key: "$lying",
          },
          arguments: [],
        },
      },
      {
        kind: "return",
        loc: [14, 3, 14, 12],
        expression: {
          kind: "number",
          loc: [14, 10, 14, 11],
          value: 1,
        },
      },
    ],
  }),
);
