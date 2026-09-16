import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A script that returns a value may still run an action: what a statement
// discards has to be nothing, and an action is what answers with nothing.
//
// The check is `cs.statement`'s and not the compiler's — the position is what
// decides, not the kind of script it sits in. A value in statement position is
// a mistake wherever it stands (see `discarded-value`), and an action is the
// point of the position rather than something a value script has to go without.
const valueScriptEffects = cs.create(
  [13, 42, 15, 3],
  {
    version: "0.0.0",
    filePath: "control-flow/action-in-value-script.test.tsx",
    fileHash: "cliqugg05c8d",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [13, 45, 15, 2],
    statements: [
      {
        kind: "const",
        loc: [14, 3, 14, 15],
        name: {
          kind: "id",
          loc: [14, 9, 14, 10],
          text: "x",
          bindingKey: "x$cliqugg05c8d$0",
        },
        initializer: {
          kind: "number",
          loc: [14, 13, 14, 14],
          value: 1,
        },
      },
    ],
  }),
);
const ping = cs.create(
  [17, 34, 20, 3],
  {
    version: "0.0.0",
    filePath: "control-flow/action-in-value-script.test.tsx",
    fileHash: "cliqugg05c8d",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [17, 37, 20, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [17, 43, 20, 2],
      statements: [
        {
          kind: "let",
          loc: [18, 3, 18, 13],
          name: {
            kind: "id",
            loc: [18, 7, 18, 8],
            text: "n",
            bindingKey: "n$cliqugg05c8d$1",
          },
          initializer: {
            kind: "number",
            loc: [18, 11, 18, 12],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [19, 3, 19, 8],
          left: {
            kind: "id",
            loc: [19, 3, 19, 4],
            text: "n",
            bindingKey: "n$cliqugg05c8d$1",
          },
          operatorToken: "=",
          right: {
            kind: "number",
            loc: [19, 7, 19, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs.create(
      [26, 5, 34, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/action-in-value-script.test.tsx",
        fileHash: "cliqugg05c8d",
        splices: {
          $valueScriptEffects: { value: valueScriptEffects, params: [] },
          $ping: { value: ping, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [26, 8, 34, 6],
        parameters: [
          {
            kind: "param",
            loc: [26, 9, 26, 19],
            name: {
              kind: "id",
              loc: [26, 9, 26, 10],
              text: "b",
              bindingKey: "b$cliqugg05c8d$2",
            },
          },
        ],
        body: {
          kind: "{}",
          loc: [26, 24, 34, 6],
          statements: [
            {
              kind: "let",
              loc: [27, 7, 27, 17],
              name: {
                kind: "id",
                loc: [27, 11, 27, 12],
                text: "n",
                bindingKey: "n$cliqugg05c8d$3",
              },
              initializer: {
                kind: "number",
                loc: [27, 15, 27, 16],
                value: 0,
              },
            },
            {
              kind: "splice",
              loc: [28, 7, 28, 26],
              key: "$valueScriptEffects",
            },
            {
              kind: "if",
              loc: [29, 7, 32, 8],
              expression: {
                kind: "id",
                loc: [29, 11, 29, 12],
                text: "b",
                bindingKey: "b$cliqugg05c8d$2",
              },
              thenStatement: {
                kind: "{}",
                loc: [29, 14, 32, 8],
                statements: [
                  {
                    kind: "()",
                    loc: [30, 9, 30, 16],
                    expression: {
                      kind: "splice",
                      loc: [30, 9, 30, 14],
                      key: "$ping",
                    },
                    arguments: [],
                  },
                  {
                    kind: "binop",
                    loc: [31, 9, 31, 14],
                    left: {
                      kind: "id",
                      loc: [31, 9, 31, 10],
                      text: "n",
                      bindingKey: "n$cliqugg05c8d$3",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "number",
                      loc: [31, 13, 31, 14],
                      value: 1,
                    },
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: "return",
              loc: [33, 7, 33, 16],
              expression: {
                kind: "id",
                loc: [33, 14, 33, 15],
                text: "n",
                bindingKey: "n$cliqugg05c8d$3",
              },
            },
          ],
        },
      }),
    ),
  );
});
