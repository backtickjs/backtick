import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const lying = cs.create(
  [11, 36, 11, 50],
  {
    version: "0.0.0",
    filePath: "expressions/undefined-return.test.tsx",
    fileHash: "2qb372nig0g3z",
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
it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.create(
      [17, 5, 21, 7],
      {
        version: "0.0.0",
        filePath: "expressions/undefined-return.test.tsx",
        fileHash: "2qb372nig0g3z",
        splices: { $lying: { value: lying, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [17, 8, 21, 6],
        statements: [
          {
            kind: "const",
            loc: [18, 7, 18, 29],
            name: {
              kind: "id",
              loc: [18, 13, 18, 19],
              text: "stored",
              bindingKey: "stored$2qb372nig0g3z$0",
            },
            initializer: {
              kind: "splice",
              loc: [18, 22, 18, 28],
              key: "$lying",
            },
          },
          {
            kind: "const",
            loc: [19, 7, 19, 31],
            name: {
              kind: "id",
              loc: [19, 13, 19, 19],
              text: "caught",
              bindingKey: "caught$2qb372nig0g3z$1",
            },
            initializer: {
              kind: "()",
              loc: [19, 22, 19, 30],
              expression: {
                kind: "splice",
                loc: [19, 22, 19, 28],
                key: "$lying",
              },
              arguments: [],
            },
          },
          {
            kind: "return",
            loc: [20, 7, 20, 16],
            expression: {
              kind: "number",
              loc: [20, 14, 20, 15],
              value: 1,
            },
          },
        ],
      }),
    ),
  );
});
