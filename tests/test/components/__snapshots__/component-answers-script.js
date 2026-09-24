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
    { start: { line: 13, column: 9 }, end: { line: 16, column: 4 } },
    {
      version: "0.0.0",
      filePath: "components/component-answers-script.test.tsx",
      fileHash: "2g65d04vf49d2",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 13, column: 12 }, end: { line: 16, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 14, column: 4 },
            end: { line: 14, column: 24 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 14, column: 10 },
                end: { line: 14, column: 23 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 10 },
                  end: { line: 14, column: 11 },
                },
                name: "n",
                bindingKey: "n$2g65d04vf49d2$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 14, column: 14 },
                  end: { line: 14, column: 23 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 14, column: 14 },
                    end: { line: 14, column: 20 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 14, column: 21 },
                      end: { line: 14, column: 22 },
                    },
                    value: 2,
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 15, column: 4 },
            end: { line: 15, column: 30 },
          },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 15, column: 11 },
              end: { line: 15, column: 29 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 15, column: 11 },
                end: { line: 15, column: 15 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 14 },
                },
                name: "em",
              },
              attributes: [],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 15, column: 15 },
                  end: { line: 15, column: 24 },
                },
                expression: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 15, column: 16 },
                    end: { line: 15, column: 23 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 15, column: 16 },
                      end: { line: 15, column: 21 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 16 },
                        end: { line: 15, column: 17 },
                      },
                      name: "n",
                      bindingKey: "n$2g65d04vf49d2$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 18 },
                        end: { line: 15, column: 21 },
                      },
                      name: "get",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [],
                  optional: false,
                },
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 15, column: 24 },
                end: { line: 15, column: 29 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 15, column: 26 },
                  end: { line: 15, column: 28 },
                },
                name: "em",
              },
            },
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
