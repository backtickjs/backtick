import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates = { usd: 3, eur: 4 };
it("objectIndex", async (t) => {
  await snapshotCase(
    t,
    "objectIndex",
    cs.create(
      [15, 5, 20, 7],
      {
        version: "0.0.0",
        filePath: "objects/object-index.test.tsx",
        fileHash: "o3ttyh4dq4dw",
        splices: { $rates: { value: rates, params: [] } },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [15, 8, 20, 6],
        parameters: [
          {
            kind: "param",
            loc: [15, 9, 15, 25],
            name: {
              kind: "id",
              loc: [15, 9, 15, 17],
              text: "currency",
              bindingKey: "currency$o3ttyh4dq4dw$0",
            },
          },
        ],
        body: {
          kind: "{}",
          loc: [15, 30, 20, 6],
          statements: [
            {
              kind: "const",
              loc: [16, 7, 16, 28],
              name: {
                kind: "id",
                loc: [16, 13, 16, 18],
                text: "table",
                bindingKey: "table$o3ttyh4dq4dw$1",
              },
              initializer: {
                kind: "splice",
                loc: [16, 21, 16, 27],
                key: "$rates",
              },
            },
            {
              kind: "const",
              loc: [17, 7, 17, 42],
              name: {
                kind: "id",
                loc: [17, 13, 17, 18],
                text: "asked",
                bindingKey: "asked$o3ttyh4dq4dw$2",
              },
              initializer: {
                kind: "binop",
                loc: [17, 21, 17, 41],
                left: {
                  kind: "[]",
                  loc: [17, 21, 17, 36],
                  expression: {
                    kind: "id",
                    loc: [17, 21, 17, 26],
                    text: "table",
                    bindingKey: "table$o3ttyh4dq4dw$1",
                  },
                  argumentExpression: {
                    kind: "id",
                    loc: [17, 27, 17, 35],
                    text: "currency",
                    bindingKey: "currency$o3ttyh4dq4dw$0",
                  },
                },
                operatorToken: "??",
                right: {
                  kind: "number",
                  loc: [17, 40, 17, 41],
                  value: 0,
                },
              },
            },
            {
              kind: "const",
              loc: [18, 7, 18, 37],
              name: {
                kind: "id",
                loc: [18, 13, 18, 16],
                text: "usd",
                bindingKey: "usd$o3ttyh4dq4dw$3",
              },
              initializer: {
                kind: "binop",
                loc: [18, 19, 18, 36],
                left: {
                  kind: "[]",
                  loc: [18, 19, 18, 31],
                  expression: {
                    kind: "id",
                    loc: [18, 19, 18, 24],
                    text: "table",
                    bindingKey: "table$o3ttyh4dq4dw$1",
                  },
                  argumentExpression: {
                    kind: "string",
                    loc: [18, 25, 18, 30],
                    text: "usd",
                  },
                },
                operatorToken: "??",
                right: {
                  kind: "number",
                  loc: [18, 35, 18, 36],
                  value: 0,
                },
              },
            },
            {
              kind: "return",
              loc: [19, 7, 19, 26],
              expression: {
                kind: "binop",
                loc: [19, 14, 19, 25],
                left: {
                  kind: "id",
                  loc: [19, 14, 19, 19],
                  text: "asked",
                  bindingKey: "asked$o3ttyh4dq4dw$2",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [19, 22, 19, 25],
                  text: "usd",
                  bindingKey: "usd$o3ttyh4dq4dw$3",
                },
              },
            },
          ],
        },
      }),
    ),
  );
});
