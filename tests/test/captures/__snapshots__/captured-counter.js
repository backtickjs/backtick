import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
it("capturedCounter", async (t) => {
  await snapshotCase(
    t,
    "capturedCounter",
    cs.create(
      [11, 5, 18, 7],
      {
        version: "0.0.0",
        filePath: "captures/captured-counter.test.tsx",
        fileHash: "2s7xqailmdcpa",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 18, 6],
        statements: [
          {
            kind: "let",
            loc: [12, 7, 12, 21],
            name: {
              kind: "id",
              loc: [12, 11, 12, 16],
              text: "count",
              bindingKey: "count$2s7xqailmdcpa$0",
            },
            initializer: {
              kind: "number",
              loc: [12, 19, 12, 20],
              value: 0,
            },
          },
          {
            kind: "const",
            loc: [13, 7, 16, 9],
            name: {
              kind: "id",
              loc: [13, 13, 13, 17],
              text: "bump",
              bindingKey: "bump$2s7xqailmdcpa$1",
            },
            initializer: {
              kind: "=>",
              loc: [13, 20, 16, 8],
              parameters: [],
              body: {
                kind: "{}",
                loc: [13, 26, 16, 8],
                statements: [
                  {
                    kind: "binop",
                    loc: [14, 9, 14, 26],
                    left: {
                      kind: "id",
                      loc: [14, 9, 14, 14],
                      text: "count",
                      bindingKey: "count$2s7xqailmdcpa$0",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "binop",
                      loc: [14, 17, 14, 26],
                      left: {
                        kind: "id",
                        loc: [14, 17, 14, 22],
                        text: "count",
                        bindingKey: "count$2s7xqailmdcpa$0",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "number",
                        loc: [14, 25, 14, 26],
                        value: 1,
                      },
                    },
                  },
                  {
                    kind: "return",
                    loc: [15, 9, 15, 22],
                    expression: {
                      kind: "id",
                      loc: [15, 16, 15, 21],
                      text: "count",
                      bindingKey: "count$2s7xqailmdcpa$0",
                    },
                  },
                ],
              },
            },
          },
          {
            kind: "return",
            loc: [17, 7, 17, 30],
            expression: {
              kind: "binop",
              loc: [17, 14, 17, 29],
              left: {
                kind: "()",
                loc: [17, 14, 17, 20],
                expression: {
                  kind: "id",
                  loc: [17, 14, 17, 18],
                  text: "bump",
                  bindingKey: "bump$2s7xqailmdcpa$1",
                },
                arguments: [],
              },
              operatorToken: "+",
              right: {
                kind: "()",
                loc: [17, 23, 17, 29],
                expression: {
                  kind: "id",
                  loc: [17, 23, 17, 27],
                  text: "bump",
                  bindingKey: "bump$2s7xqailmdcpa$1",
                },
                arguments: [],
              },
            },
          },
        ],
      }),
    ),
  );
});
