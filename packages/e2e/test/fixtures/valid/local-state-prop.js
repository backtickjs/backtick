import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, state, Text, View } from "@backtickjs/core";
// A cell crossing a component boundary: declared once by the parent, handed to
// each child as a prop, so both read one storage. Ownership follows the
// declaration rather than the readers, so `Panel`'s entry declares the cell and
// each `Counter` receives the handle as a slot — which is what makes a write
// through either child reach the same storage.
const Counter = async ({ size }) =>
  _jsx(Text, {
    style: {
      fontSize: cs.create(
        [11, 24, 11, 40],
        {
          version: "0.0.0",
          filePath: "local-state-prop.tsx",
          fileHash: "2js8otjs3p707",
          kind: "value",
          splices: { $size: size },
          captures: [],
          spliceParams: { $size: [] },
        },
        () => ({
          kind: "AstScriptCallExpression",
          loc: [11, 27, 11, 39],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [11, 27, 11, 37],
            expression: {
              kind: "AstScriptSplice",
              loc: [11, 27, 11, 32],
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
      [12, 14, 14, 7],
      {
        version: "0.0.0",
        filePath: "local-state-prop.tsx",
        fileHash: "2js8otjs3p707",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: "AstScriptArrowFunction",
        loc: [12, 17, 14, 6],
        parameters: [],
        body: {
          kind: "AstScriptBlock",
          loc: [12, 23, 14, 6],
          statements: [
            {
              kind: "AstScriptCallExpression",
              loc: [13, 7, 13, 36],
              expression: {
                kind: "AstScriptPropertyAccessExpression",
                loc: [13, 7, 13, 18],
                expression: {
                  kind: "AstScriptSplice",
                  loc: [13, 7, 13, 12],
                  key: "$size",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: "AstScriptBinaryExpression",
                  loc: [13, 19, 13, 35],
                  left: {
                    kind: "AstScriptCallExpression",
                    loc: [13, 19, 13, 31],
                    expression: {
                      kind: "AstScriptPropertyAccessExpression",
                      loc: [13, 19, 13, 29],
                      expression: {
                        kind: "AstScriptSplice",
                        loc: [13, 19, 13, 24],
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
                    loc: [13, 34, 13, 35],
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
async function Panel() {
  const size = state(16);
  return _jsxs(View, {
    children: [_jsx(Counter, { size: size }), _jsx(Counter, { size: size })],
  });
}
export default _jsx(Panel, {});
