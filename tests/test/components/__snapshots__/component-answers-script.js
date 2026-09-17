import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs.create(
    [13, 10, 16, 5],
    {
      version: "0.0.0",
      filePath: "components/component-answers-script.test.tsx",
      fileHash: "2g65d04vf49d2",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [13, 13, 16, 4],
      statements: [
        {
          kind: "const",
          loc: [14, 5, 14, 25],
          name: {
            kind: "id",
            loc: [14, 11, 14, 12],
            text: "n",
            bindingKey: "n$2g65d04vf49d2$0",
          },
          initializer: {
            kind: "()",
            loc: [14, 15, 14, 24],
            expression: {
              kind: "splice",
              loc: [14, 15, 14, 21],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [14, 22, 14, 23],
                value: 2,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [15, 5, 15, 31],
          expression: {
            kind: "jsx",
            loc: [15, 12, 15, 30],
            type: {
              kind: "string",
              loc: [15, 13, 15, 15],
              text: "em",
            },
            attributes: [],
            children: [
              {
                kind: "()",
                loc: [15, 17, 15, 24],
                expression: {
                  kind: ".",
                  loc: [15, 17, 15, 22],
                  expression: {
                    kind: "id",
                    loc: [15, 17, 15, 18],
                    text: "n",
                    bindingKey: "n$2g65d04vf49d2$0",
                  },
                  name: "get",
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
it("componentAnswersScript", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersScript",
    _jsx("div", { children: _jsx(Panel, {}) }),
  );
});
