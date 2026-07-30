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
          kind: 214,
          loc: [11, 29, 11, 41],
          expression: {
            kind: 212,
            loc: [11, 29, 11, 39],
            expression: {
              kind: 1000,
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
        kind: 220,
        loc: [12, 19, 14, 8],
        parameters: [],
        body: {
          kind: 242,
          loc: [12, 25, 14, 8],
          statements: [
            {
              kind: 214,
              loc: [13, 9, 13, 38],
              expression: {
                kind: 212,
                loc: [13, 9, 13, 20],
                expression: {
                  kind: 1000,
                  loc: [13, 9, 13, 14],
                  key: "$size",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 227,
                  loc: [13, 21, 13, 37],
                  left: {
                    kind: 214,
                    loc: [13, 21, 13, 33],
                    expression: {
                      kind: 212,
                      loc: [13, 21, 13, 31],
                      expression: {
                        kind: 1000,
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
                    kind: 9,
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
