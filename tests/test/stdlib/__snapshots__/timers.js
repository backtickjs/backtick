import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import { snapshotCase } from "../snapshotCase.ts";
// A clock, which is the target's rather than the language's: a script reaches
// one by splicing the window, the same as anything else a target hands over.
//
// And the shape of a member read off a handle. `$window.clearInterval` is
// read as a value and handed on, which is what a name has to survive being —
// the call site below reaches it through a variable, not through the window.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is
// where a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this
// is evaluated: what it pins is the lowering and the names, not the waiting.
// And either clear cancels either kind, which is why one of them is reached
// through the other's id.
it("timers", async (t) => {
  await snapshotCase(
    t,
    "timers",
    cs.create(
      [25, 5, 30, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/timers.test.tsx",
        fileHash: "ujjuhj1csnkk",
        splices: { $window: { value: window, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [25, 8, 30, 6],
        statements: [
          {
            kind: "const",
            loc: [26, 7, 26, 42],
            name: {
              kind: "id",
              loc: [26, 13, 26, 17],
              text: "stop",
              bindingKey: "stop$ujjuhj1csnkk$0",
            },
            initializer: {
              kind: ".",
              loc: [26, 20, 26, 41],
              expression: {
                kind: "splice",
                loc: [26, 20, 26, 27],
                key: "$window",
              },
              name: "clearInterval",
            },
          },
          {
            kind: "const",
            loc: [27, 7, 27, 60],
            name: {
              kind: "id",
              loc: [27, 13, 27, 22],
              text: "repeating",
              bindingKey: "repeating$ujjuhj1csnkk$1",
            },
            initializer: {
              kind: "()",
              loc: [27, 25, 27, 59],
              expression: {
                kind: ".",
                loc: [27, 25, 27, 44],
                expression: {
                  kind: "splice",
                  loc: [27, 25, 27, 32],
                  key: "$window",
                },
                name: "setInterval",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [27, 45, 27, 52],
                  parameters: [],
                  body: {
                    kind: "number",
                    loc: [27, 51, 27, 52],
                    value: 0,
                  },
                },
                {
                  kind: "number",
                  loc: [27, 54, 27, 58],
                  value: 1000,
                },
              ],
            },
          },
          {
            kind: "()",
            loc: [28, 7, 28, 22],
            expression: {
              kind: "id",
              loc: [28, 7, 28, 11],
              text: "stop",
              bindingKey: "stop$ujjuhj1csnkk$0",
            },
            arguments: [
              {
                kind: "id",
                loc: [28, 12, 28, 21],
                text: "repeating",
                bindingKey: "repeating$ujjuhj1csnkk$1",
              },
            ],
          },
          {
            kind: "()",
            loc: [29, 7, 29, 62],
            expression: {
              kind: ".",
              loc: [29, 7, 29, 27],
              expression: {
                kind: "splice",
                loc: [29, 7, 29, 14],
                key: "$window",
              },
              name: "clearTimeout",
            },
            arguments: [
              {
                kind: "()",
                loc: [29, 28, 29, 61],
                expression: {
                  kind: ".",
                  loc: [29, 28, 29, 46],
                  expression: {
                    kind: "splice",
                    loc: [29, 28, 29, 35],
                    key: "$window",
                  },
                  name: "setTimeout",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [29, 47, 29, 54],
                    parameters: [],
                    body: {
                      kind: "number",
                      loc: [29, 53, 29, 54],
                      value: 0,
                    },
                  },
                  {
                    kind: "number",
                    loc: [29, 56, 29, 60],
                    value: 1000,
                  },
                ],
              },
            ],
          },
        ],
      }),
    ),
  );
});
