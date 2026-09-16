import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  [8, 28, 11, 3],
  {
    version: "0.0.0",
    filePath: "control-flow/handler-object.test.tsx",
    fileHash: "1dqhax1do6u08",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [8, 31, 11, 2],
    statements: [
      {
        kind: "let",
        loc: [9, 3, 9, 13],
        name: {
          kind: "id",
          loc: [9, 7, 9, 8],
          text: "n",
          bindingKey: "n$1dqhax1do6u08$0",
        },
        initializer: {
          kind: "number",
          loc: [9, 11, 9, 12],
          value: 0,
        },
      },
      {
        kind: "binop",
        loc: [10, 3, 10, 8],
        left: {
          kind: "id",
          loc: [10, 3, 10, 4],
          text: "n",
          bindingKey: "n$1dqhax1do6u08$0",
        },
        operatorToken: "=",
        right: {
          kind: "number",
          loc: [10, 7, 10, 8],
          value: 1,
        },
      },
    ],
  }),
);
const onTap = cs.create(
  [13, 45, 15, 3],
  {
    version: "0.0.0",
    filePath: "control-flow/handler-object.test.tsx",
    fileHash: "1dqhax1do6u08",
    splices: { $beep: { value: beep, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [13, 48, 15, 2],
    parameters: [
      {
        kind: "param",
        loc: [13, 49, 13, 59],
        name: {
          kind: "id",
          loc: [13, 49, 13, 51],
          text: "id",
          bindingKey: "id$1dqhax1do6u08$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [13, 64, 15, 2],
      statements: [
        {
          kind: "splice",
          loc: [14, 3, 14, 8],
          key: "$beep",
        },
      ],
    },
  }),
);
it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.create(
      [21, 5, 27, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/handler-object.test.tsx",
        fileHash: "1dqhax1do6u08",
        splices: { $onTap: { value: onTap, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [21, 8, 27, 6],
        statements: [
          {
            kind: "const",
            loc: [22, 7, 25, 9],
            name: {
              kind: "id",
              loc: [22, 13, 22, 21],
              text: "handlers",
              bindingKey: "handlers$1dqhax1do6u08$2",
            },
            initializer: {
              kind: "obj",
              loc: [22, 24, 25, 8],
              properties: [
                {
                  kind: ":",
                  loc: [23, 9, 23, 20],
                  name: "tap",
                  initializer: {
                    kind: "splice",
                    loc: [23, 14, 23, 20],
                    key: "$onTap",
                  },
                },
                {
                  kind: ":",
                  loc: [24, 9, 24, 21],
                  name: "hold",
                  initializer: {
                    kind: "splice",
                    loc: [24, 15, 24, 21],
                    key: "$onTap",
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [26, 7, 26, 23],
            expression: {
              kind: "id",
              loc: [26, 14, 26, 22],
              text: "handlers",
              bindingKey: "handlers$1dqhax1do6u08$2",
            },
          },
        ],
      }),
    ),
  );
});
