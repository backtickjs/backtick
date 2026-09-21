import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `++` and `--` step a variable by one. A prefix step answers the value after
// the step, and a postfix step the value before it — exactly, for a fraction
// too.
it("step", async (t) => {
  await snapshotCase(
    t,
    "step",
    cs.create(
      [12, 5, 22, 7],
      {
        version: "0.0.0",
        filePath: "expressions/step.test.tsx",
        fileHash: "l4vdws2hl3xc",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 22, 6],
        statements: [
          {
            kind: "let",
            loc: [13, 7, 13, 21],
            name: {
              kind: "id",
              loc: [13, 11, 13, 16],
              text: "total",
              bindingKey: "total$l4vdws2hl3xc$0",
            },
            initializer: {
              kind: "number",
              loc: [13, 19, 13, 20],
              value: 0,
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
                bindingKey: "i$l4vdws2hl3xc$5",
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
                bindingKey: "i$l4vdws2hl3xc$5",
              },
              operatorToken: "<",
              right: {
                kind: "number",
                loc: [14, 27, 14, 28],
                value: 3,
              },
            },
            incrementor: {
              kind: "postfixop",
              loc: [14, 30, 14, 33],
              operator: "++",
              operand: {
                kind: "id",
                loc: [14, 30, 14, 31],
                text: "i",
                bindingKey: "i$l4vdws2hl3xc$5",
              },
            },
            statement: {
              kind: "{}",
              loc: [14, 35, 16, 8],
              statements: [
                {
                  kind: "binop",
                  loc: [15, 9, 15, 26],
                  left: {
                    kind: "id",
                    loc: [15, 9, 15, 14],
                    text: "total",
                    bindingKey: "total$l4vdws2hl3xc$0",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [15, 17, 15, 26],
                    left: {
                      kind: "id",
                      loc: [15, 17, 15, 22],
                      text: "total",
                      bindingKey: "total$l4vdws2hl3xc$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [15, 25, 15, 26],
                      text: "i",
                      bindingKey: "i$l4vdws2hl3xc$5",
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "let",
            loc: [17, 7, 17, 19],
            name: {
              kind: "id",
              loc: [17, 11, 17, 12],
              text: "n",
              bindingKey: "n$l4vdws2hl3xc$1",
            },
            initializer: {
              kind: "number",
              loc: [17, 15, 17, 18],
              value: 0.1,
            },
          },
          {
            kind: "const",
            loc: [18, 7, 18, 26],
            name: {
              kind: "id",
              loc: [18, 13, 18, 19],
              text: "before",
              bindingKey: "before$l4vdws2hl3xc$2",
            },
            initializer: {
              kind: "postfixop",
              loc: [18, 22, 18, 25],
              operator: "++",
              operand: {
                kind: "id",
                loc: [18, 22, 18, 23],
                text: "n",
                bindingKey: "n$l4vdws2hl3xc$1",
              },
            },
          },
          {
            kind: "const",
            loc: [19, 7, 19, 25],
            name: {
              kind: "id",
              loc: [19, 13, 19, 18],
              text: "after",
              bindingKey: "after$l4vdws2hl3xc$3",
            },
            initializer: {
              kind: "prefixop",
              loc: [19, 21, 19, 24],
              operator: "++",
              operand: {
                kind: "id",
                loc: [19, 23, 19, 24],
                text: "n",
                bindingKey: "n$l4vdws2hl3xc$1",
              },
            },
          },
          {
            kind: "const",
            loc: [20, 7, 20, 24],
            name: {
              kind: "id",
              loc: [20, 13, 20, 17],
              text: "down",
              bindingKey: "down$l4vdws2hl3xc$4",
            },
            initializer: {
              kind: "postfixop",
              loc: [20, 20, 20, 23],
              operator: "--",
              operand: {
                kind: "id",
                loc: [20, 20, 20, 21],
                text: "n",
                bindingKey: "n$l4vdws2hl3xc$1",
              },
            },
          },
          {
            kind: "return",
            loc: [21, 7, 21, 46],
            expression: {
              kind: "arr",
              loc: [21, 14, 21, 45],
              elements: [
                {
                  kind: "id",
                  loc: [21, 15, 21, 20],
                  text: "total",
                  bindingKey: "total$l4vdws2hl3xc$0",
                },
                {
                  kind: "id",
                  loc: [21, 22, 21, 28],
                  text: "before",
                  bindingKey: "before$l4vdws2hl3xc$2",
                },
                {
                  kind: "id",
                  loc: [21, 30, 21, 35],
                  text: "after",
                  bindingKey: "after$l4vdws2hl3xc$3",
                },
                {
                  kind: "id",
                  loc: [21, 37, 21, 41],
                  text: "down",
                  bindingKey: "down$l4vdws2hl3xc$4",
                },
                {
                  kind: "id",
                  loc: [21, 43, 21, 44],
                  text: "n",
                  bindingKey: "n$l4vdws2hl3xc$1",
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
