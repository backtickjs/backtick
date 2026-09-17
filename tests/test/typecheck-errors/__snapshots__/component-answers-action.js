import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.create(
    [7, 10, 10, 5],
    {
      version: "0.0.0",
      filePath: "typecheck-errors/component-answers-action.test.tsx",
      fileHash: "1y32lnuqpkjgj",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 10, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 25],
          name: {
            kind: "id",
            loc: [8, 11, 8, 12],
            text: "n",
            bindingKey: "n$1y32lnuqpkjgj$0",
          },
          initializer: {
            kind: "()",
            loc: [8, 15, 8, 24],
            expression: {
              kind: "splice",
              loc: [8, 15, 8, 21],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [8, 22, 8, 23],
                value: 2,
              },
            ],
          },
        },
        {
          kind: "()",
          loc: [9, 5, 9, 13],
          expression: {
            kind: ".",
            loc: [9, 5, 9, 10],
            expression: {
              kind: "id",
              loc: [9, 5, 9, 6],
              text: "n",
              bindingKey: "n$1y32lnuqpkjgj$0",
            },
            name: "set",
          },
          arguments: [
            {
              kind: "number",
              loc: [9, 11, 9, 12],
              value: 3,
            },
          ],
        },
      ],
    }),
  );
}
// @ts-expect-error: 'Panel' cannot be used as a JSX component.
export default _jsx(Panel, {});
