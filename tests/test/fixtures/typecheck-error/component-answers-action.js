import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.create(
    [7, 10, 10, 5],
    {
      version: "0.0.0",
      filePath: "component-answers-action.tsx",
      fileHash: "3ae6qmlztnd1u",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: 242,
      loc: [7, 13, 10, 4],
      statements: [
        {
          kind: 244,
          loc: [8, 5, 8, 25],
          declarationList: {
            kind: 262,
            loc: [8, 5, 8, 24],
            declarations: [
              {
                kind: 261,
                loc: [8, 11, 8, 24],
                name: {
                  kind: 80,
                  loc: [8, 11, 8, 12],
                  text: "n",
                  bindingKey: "n$3ae6qmlztnd1u$0",
                },
                initializer: {
                  kind: 214,
                  loc: [8, 15, 8, 24],
                  expression: {
                    kind: 1000,
                    loc: [8, 15, 8, 21],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [8, 22, 8, 23],
                      value: 2,
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 214,
          loc: [9, 5, 9, 15],
          expression: {
            kind: 212,
            loc: [9, 5, 9, 12],
            expression: {
              kind: 80,
              loc: [9, 5, 9, 6],
              text: "n",
              bindingKey: "n$3ae6qmlztnd1u$0",
            },
            questionDotToken: false,
            name: "write",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 9,
              loc: [9, 13, 9, 14],
              value: 3,
            },
          ],
        },
      ],
    }),
  );
}
export default _jsx(Panel, {});
