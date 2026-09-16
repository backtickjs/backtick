import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3
// the loop stopped at.
it("forPerTurnBinding", async (t) => {
  await snapshotCase(
    t,
    "forPerTurnBinding",
    cs.create(
      [12, 5, 18, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/for-per-turn-binding.test.tsx",
        fileHash: "2s6lhx8c4k6ow",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 18, 6],
        statements: [
          {
            kind: "let",
            loc: [13, 7, 13, 40],
            name: {
              kind: "id",
              loc: [13, 11, 13, 15],
              text: "last",
              bindingKey: "last$2s6lhx8c4k6ow$0",
            },
            initializer: {
              kind: "=>",
              loc: [13, 32, 13, 39],
              parameters: [],
              body: {
                kind: "number",
                loc: [13, 38, 13, 39],
                value: 0,
              },
            },
          },
          {
            kind: "for",
            loc: [14, 7, 16, 8],
            initializer: {
              kind: "let",
              loc: [14, 12, 14, 21],
              name: {
                kind: "id",
                loc: [14, 16, 14, 17],
                text: "i",
                bindingKey: "i$2s6lhx8c4k6ow$1",
              },
              initializer: {
                kind: "number",
                loc: [14, 20, 14, 21],
                value: 0,
              },
            },
            condition: {
              kind: "binop",
              loc: [14, 23, 14, 28],
              left: {
                kind: "id",
                loc: [14, 23, 14, 24],
                text: "i",
                bindingKey: "i$2s6lhx8c4k6ow$1",
              },
              operatorToken: "<",
              right: {
                kind: "number",
                loc: [14, 27, 14, 28],
                value: 3,
              },
            },
            incrementor: {
              kind: "binop",
              loc: [14, 30, 14, 39],
              left: {
                kind: "id",
                loc: [14, 30, 14, 31],
                text: "i",
                bindingKey: "i$2s6lhx8c4k6ow$1",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [14, 34, 14, 39],
                left: {
                  kind: "id",
                  loc: [14, 34, 14, 35],
                  text: "i",
                  bindingKey: "i$2s6lhx8c4k6ow$1",
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [14, 38, 14, 39],
                  value: 1,
                },
              },
            },
            statement: {
              kind: "{}",
              loc: [14, 41, 16, 8],
              statements: [
                {
                  kind: "binop",
                  loc: [15, 9, 15, 23],
                  left: {
                    kind: "id",
                    loc: [15, 9, 15, 13],
                    text: "last",
                    bindingKey: "last$2s6lhx8c4k6ow$0",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "=>",
                    loc: [15, 16, 15, 23],
                    parameters: [],
                    body: {
                      kind: "id",
                      loc: [15, 22, 15, 23],
                      text: "i",
                      bindingKey: "i$2s6lhx8c4k6ow$1",
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [17, 7, 17, 21],
            expression: {
              kind: "()",
              loc: [17, 14, 17, 20],
              expression: {
                kind: "id",
                loc: [17, 14, 17, 18],
                text: "last",
                bindingKey: "last$2s6lhx8c4k6ow$0",
              },
              arguments: [],
            },
          },
        ],
      }),
    ),
  );
});
