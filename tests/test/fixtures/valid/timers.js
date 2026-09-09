import { cs } from "@backtickjs/core";
import { window } from "@backtickjs/web-schema";
// A clock, which is the target's rather than the language's: a script reaches
// one by splicing the window, the same as anything else a target hands over.
//
// And the shape of a member read off a handle. `$window.clearInterval` is read
// as a value and handed on, which is what a name has to survive being — the
// call site below reaches it through a variable, not through the window.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is where
// a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this is
// evaluated: what it pins is the lowering and the names, not the waiting. And
// either clear cancels either kind, which is why one of them is reached through
// the other's id.
export default cs.create(
  [19, 16, 24, 3],
  {
    version: "0.0.0",
    filePath: "timers.ts",
    fileHash: "2a1dmu3pxvhzt",
    splices: { $window: { value: window, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [19, 19, 24, 2],
    statements: [
      {
        kind: "const",
        loc: [20, 3, 20, 38],
        name: {
          kind: "id",
          loc: [20, 9, 20, 13],
          text: "stop",
          bindingKey: "stop$2a1dmu3pxvhzt$0",
        },
        initializer: {
          kind: ".",
          loc: [20, 16, 20, 37],
          expression: {
            kind: "splice",
            loc: [20, 16, 20, 23],
            key: "$window",
          },
          name: "clearInterval",
        },
      },
      {
        kind: "const",
        loc: [21, 3, 21, 56],
        name: {
          kind: "id",
          loc: [21, 9, 21, 18],
          text: "repeating",
          bindingKey: "repeating$2a1dmu3pxvhzt$1",
        },
        initializer: {
          kind: "()",
          loc: [21, 21, 21, 55],
          expression: {
            kind: ".",
            loc: [21, 21, 21, 40],
            expression: {
              kind: "splice",
              loc: [21, 21, 21, 28],
              key: "$window",
            },
            name: "setInterval",
          },
          arguments: [
            {
              kind: "=>",
              loc: [21, 41, 21, 48],
              parameters: [],
              body: {
                kind: "number",
                loc: [21, 47, 21, 48],
                value: 0,
              },
            },
            {
              kind: "number",
              loc: [21, 50, 21, 54],
              value: 1000,
            },
          ],
        },
      },
      {
        kind: "()",
        loc: [22, 3, 22, 18],
        expression: {
          kind: "id",
          loc: [22, 3, 22, 7],
          text: "stop",
          bindingKey: "stop$2a1dmu3pxvhzt$0",
        },
        arguments: [
          {
            kind: "id",
            loc: [22, 8, 22, 17],
            text: "repeating",
            bindingKey: "repeating$2a1dmu3pxvhzt$1",
          },
        ],
      },
      {
        kind: "()",
        loc: [23, 3, 23, 58],
        expression: {
          kind: ".",
          loc: [23, 3, 23, 23],
          expression: {
            kind: "splice",
            loc: [23, 3, 23, 10],
            key: "$window",
          },
          name: "clearTimeout",
        },
        arguments: [
          {
            kind: "()",
            loc: [23, 24, 23, 57],
            expression: {
              kind: ".",
              loc: [23, 24, 23, 42],
              expression: {
                kind: "splice",
                loc: [23, 24, 23, 31],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [23, 43, 23, 50],
                parameters: [],
                body: {
                  kind: "number",
                  loc: [23, 49, 23, 50],
                  value: 0,
                },
              },
              {
                kind: "number",
                loc: [23, 52, 23, 56],
                value: 1000,
              },
            ],
          },
        ],
      },
    ],
  }),
);
