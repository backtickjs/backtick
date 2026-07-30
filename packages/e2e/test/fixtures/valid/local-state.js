import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, state, Text } from "@backtickjs/core";
// A per-instance state cell. The component that declared it owns it, so that
// component's entry carries the initial value and each instance allocates its
// own storage. The display and the handler splice the same handle, so they
// share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
//
// A cell reaches each script as an argument, so the handler entry takes it as
// a parameter and the tree wires it in with `cells`, exactly as a capture
// threads through `slots`.
async function Stepper() {
  const size = state(16);
  return _jsx(Text, {
    style: {
      fontSize: cs.create(
        [16, 26, 16, 42],
        {
          version: "0.0.0",
          filePath: "local-state.tsx",
          fileHash: "3f74kgyltbjcu",
          kind: "value",
          splices: { $size: size },
          captures: [],
          spliceParams: { $size: [] },
        },
        () => ({
          kind: "AstScriptCallExpression",
          loc: [16, 29, 16, 41],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [16, 29, 16, 39],
            expression: {
              kind: "AstScriptSplice",
              loc: [16, 29, 16, 34],
              key: "$size",
            },
            questionDotToken: false,
            name: "read",
          },
          questionDotToken: false,
          arguments: [],
        }),
      ),
    },
    onPress: cs.create(
      [17, 16, 19, 9],
      {
        version: "0.0.0",
        filePath: "local-state.tsx",
        fileHash: "3f74kgyltbjcu",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: "AstScriptArrowFunction",
        loc: [17, 19, 19, 8],
        parameters: [],
        body: {
          kind: "AstScriptBlock",
          loc: [17, 25, 19, 8],
          statements: [
            {
              kind: "AstScriptCallExpression",
              loc: [18, 9, 18, 38],
              expression: {
                kind: "AstScriptPropertyAccessExpression",
                loc: [18, 9, 18, 20],
                expression: {
                  kind: "AstScriptSplice",
                  loc: [18, 9, 18, 14],
                  key: "$size",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: "AstScriptBinaryExpression",
                  loc: [18, 21, 18, 37],
                  left: {
                    kind: "AstScriptCallExpression",
                    loc: [18, 21, 18, 33],
                    expression: {
                      kind: "AstScriptPropertyAccessExpression",
                      loc: [18, 21, 18, 31],
                      expression: {
                        kind: "AstScriptSplice",
                        loc: [18, 21, 18, 26],
                        key: "$size",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: "AstScriptNumericLiteral",
                    loc: [18, 36, 18, 37],
                    value: 1,
                  },
                },
              ],
            },
          ],
        },
      }),
    ),
    children: "press",
  });
}
export default _jsx(Stepper, {});
