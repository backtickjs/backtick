import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, state, Text, View } from "@backtickjs/core";
// State belongs to the component that declared it. `Counter` calls `state`
// once per invocation, so two `<Counter />` tags are two cells — and each
// invocation is its own tree entry, so neither depends on how many places
// reference an element.
async function Counter() {
  const size = state(16);
  return _jsx(Text, {
    style: {
      fontSize: cs.create(
        [11, 26, 11, 42],
        {
          version: "0.0.0",
          filePath: "local-state-instances.tsx",
          fileHash: "3pcu8arhicczh",
          kind: "value",
          splices: { $size: size },
          captures: [],
          spliceParams: { $size: [] },
        },
        () => ({
          kind: "AstScriptCallExpression",
          loc: [11, 29, 11, 41],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [11, 29, 11, 39],
            expression: {
              kind: "AstScriptSplice",
              loc: [11, 29, 11, 34],
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
      [12, 16, 14, 9],
      {
        version: "0.0.0",
        filePath: "local-state-instances.tsx",
        fileHash: "3pcu8arhicczh",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: "AstScriptArrowFunction",
        loc: [12, 19, 14, 8],
        parameters: [],
        body: {
          kind: "AstScriptBlock",
          loc: [12, 25, 14, 8],
          statements: [
            {
              kind: "AstScriptCallExpression",
              loc: [13, 9, 13, 38],
              expression: {
                kind: "AstScriptPropertyAccessExpression",
                loc: [13, 9, 13, 20],
                expression: {
                  kind: "AstScriptSplice",
                  loc: [13, 9, 13, 14],
                  key: "$size",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: "AstScriptBinaryExpression",
                  loc: [13, 21, 13, 37],
                  left: {
                    kind: "AstScriptCallExpression",
                    loc: [13, 21, 13, 33],
                    expression: {
                      kind: "AstScriptPropertyAccessExpression",
                      loc: [13, 21, 13, 31],
                      expression: {
                        kind: "AstScriptSplice",
                        loc: [13, 21, 13, 26],
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
                    loc: [13, 36, 13, 37],
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
export default _jsxs(View, {
  children: [_jsx(Counter, {}), _jsx(Counter, {})],
});
