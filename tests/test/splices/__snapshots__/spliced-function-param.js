import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
it("splicedFunctionParam", async (t) => {
  await snapshotCase(
    t,
    "splicedFunctionParam",
    cs.create(
      [13, 5, 16, 7],
      {
        version: "0.0.0",
        filePath: "splices/spliced-function-param.test.tsx",
        fileHash: "yz0kiroonaez",
        splices: {
          $0splice0: {
            value: cs.create(
              [15, 22, 15, 33],
              {
                version: "0.0.0",
                filePath: "splices/spliced-function-param.test.tsx",
                fileHash: "yz0kiroonaez",
                splices: {},
                captures: [],
              },
              () => ({
                kind: "=>",
                loc: [15, 25, 15, 32],
                parameters: [],
                body: {
                  kind: "number",
                  loc: [15, 31, 15, 32],
                  value: 2,
                },
              }),
            ),
            params: [],
          },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [13, 8, 16, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 14, 50],
            name: {
              kind: "id",
              loc: [14, 13, 14, 18],
              text: "apply",
              bindingKey: "apply$yz0kiroonaez$0",
            },
            initializer: {
              kind: "=>",
              loc: [14, 21, 14, 49],
              parameters: [
                {
                  kind: "param",
                  loc: [14, 22, 14, 37],
                  name: {
                    kind: "id",
                    loc: [14, 22, 14, 23],
                    text: "f",
                    bindingKey: "f$yz0kiroonaez$1",
                  },
                },
              ],
              body: {
                kind: "binop",
                loc: [14, 42, 14, 49],
                left: {
                  kind: "()",
                  loc: [14, 42, 14, 45],
                  expression: {
                    kind: "id",
                    loc: [14, 42, 14, 43],
                    text: "f",
                    bindingKey: "f$yz0kiroonaez$1",
                  },
                  arguments: [],
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [14, 48, 14, 49],
                  value: 1,
                },
              },
            },
          },
          {
            kind: "return",
            loc: [15, 7, 15, 36],
            expression: {
              kind: "()",
              loc: [15, 14, 15, 35],
              expression: {
                kind: "id",
                loc: [15, 14, 15, 19],
                text: "apply",
                bindingKey: "apply$yz0kiroonaez$0",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [15, 20, 15, 34],
                  key: "$0splice0",
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
