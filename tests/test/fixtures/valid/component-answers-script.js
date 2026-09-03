import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs.create(
    [11, 10, 14, 5],
    {
      version: "0.0.0",
      filePath: "component-answers-script.tsx",
      fileHash: "3fv7xpc8x0efp",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [11, 13, 14, 4],
      statements: [
        {
          kind: "const",
          loc: [12, 5, 12, 25],
          name: {
            kind: "id",
            loc: [12, 11, 12, 12],
            text: "n",
            bindingKey: "n$3fv7xpc8x0efp$0",
          },
          initializer: {
            kind: "()",
            loc: [12, 15, 12, 24],
            expression: {
              kind: "splice",
              loc: [12, 15, 12, 21],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [12, 22, 12, 23],
                value: 2,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [13, 5, 13, 32],
          expression: {
            kind: "jsx",
            loc: [13, 12, 13, 31],
            type: {
              kind: "string",
              loc: [13, 13, 13, 15],
              text: "em",
            },
            attributes: [],
            children: [
              {
                kind: "()",
                loc: [13, 17, 13, 25],
                expression: {
                  kind: ".",
                  loc: [13, 17, 13, 23],
                  expression: {
                    kind: "id",
                    loc: [13, 17, 13, 18],
                    text: "n",
                    bindingKey: "n$3fv7xpc8x0efp$0",
                  },
                  name: "read",
                },
                arguments: [],
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx("div", { children: _jsx(Panel, {}) });
