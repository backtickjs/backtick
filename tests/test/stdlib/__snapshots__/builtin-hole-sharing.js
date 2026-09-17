import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const make = (f) =>
  cs.create(
    [7, 3, 9, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/builtin-hole-sharing.test.tsx",
      fileHash: "3vatah1osfcoe",
      splices: { $f: { value: f, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 6, 9, 4],
      statements: [
        {
          kind: "return",
          loc: [8, 5, 8, 24],
          expression: {
            kind: "()",
            loc: [8, 12, 8, 23],
            expression: {
              kind: ".",
              loc: [8, 12, 8, 21],
              expression: {
                kind: "()",
                loc: [8, 12, 8, 17],
                expression: {
                  kind: "splice",
                  loc: [8, 12, 8, 14],
                  key: "$f",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [8, 15, 8, 16],
                    value: 1,
                  },
                ],
              },
              name: "get",
            },
            arguments: [],
          },
        },
      ],
    }),
  );
const wrapped = cs.create(
  [11, 17, 11, 50],
  {
    version: "0.0.0",
    filePath: "stdlib/builtin-hole-sharing.test.tsx",
    fileHash: "3vatah1osfcoe",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [11, 20, 11, 49],
    parameters: [
      {
        kind: "param",
        loc: [11, 21, 11, 30],
        name: {
          kind: "id",
          loc: [11, 21, 11, 22],
          text: "n",
          bindingKey: "n$3vatah1osfcoe$0",
        },
      },
    ],
    body: {
      kind: "()",
      loc: [11, 35, 11, 49],
      expression: {
        kind: "splice",
        loc: [11, 35, 11, 41],
        key: "$state",
      },
      arguments: [
        {
          kind: "binop",
          loc: [11, 42, 11, 48],
          left: {
            kind: "id",
            loc: [11, 42, 11, 43],
            text: "n",
            bindingKey: "n$3vatah1osfcoe$0",
          },
          operatorToken: "+",
          right: {
            kind: "number",
            loc: [11, 46, 11, 48],
            value: 10,
          },
        },
      ],
    },
  }),
);
it("builtinHoleSharing", async (t) => {
  await snapshotCase(
    t,
    "builtinHoleSharing",
    cs.create(
      [17, 5, 19, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/builtin-hole-sharing.test.tsx",
        fileHash: "3vatah1osfcoe",
        splices: {
          $0splice0: { value: make(state), params: [] },
          $0splice1: { value: make(wrapped), params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [17, 8, 19, 6],
        statements: [
          {
            kind: "return",
            loc: [18, 7, 18, 48],
            expression: {
              kind: "binop",
              loc: [18, 14, 18, 47],
              left: {
                kind: "splice",
                loc: [18, 14, 18, 28],
                key: "$0splice0",
              },
              operatorToken: "+",
              right: {
                kind: "splice",
                loc: [18, 31, 18, 47],
                key: "$0splice1",
              },
            },
          },
        ],
      }),
    ),
  );
});
