import { cs } from "@backtickjs/core";
const nestedScripts = cs.create(
  [3, 23, 6, 3],
  {
    version: "0.0.0",
    filePath: "nestedScripts.tsx",
    fileHash: "25fewn7rzqttk",
    splices: {
      $0splice0: {
        value: cs.create(
          [5, 12, 5, 17],
          {
            version: "0.0.0",
            filePath: "nestedScripts.tsx",
            fileHash: "25fewn7rzqttk",
            splices: {},
            captures: ["x$25fewn7rzqttk$0"],
          },
          () => ({
            kind: "id",
            loc: [5, 15, 5, 16],
            text: "x",
            bindingKey: "x$25fewn7rzqttk$0",
          }),
        ),
        params: ["x$25fewn7rzqttk$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [3, 26, 6, 2],
    statements: [
      {
        kind: "const",
        loc: [4, 3, 4, 15],
        name: {
          kind: "id",
          loc: [4, 9, 4, 10],
          text: "x",
          bindingKey: "x$25fewn7rzqttk$0",
        },
        initializer: {
          kind: "number",
          loc: [4, 13, 4, 14],
          value: 0,
        },
      },
      {
        kind: "return",
        loc: [5, 3, 5, 19],
        expression: {
          kind: "splice",
          loc: [5, 10, 5, 18],
          key: "$0splice0",
        },
      },
    ],
  }),
);
