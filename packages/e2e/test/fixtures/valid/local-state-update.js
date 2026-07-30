import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, state, Text } from "@backtickjs/core";
// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function Stepper() {
  const size = state(16);
  return _jsx(Text, {
    style: {
      fontSize: cs.create(
        [10, 26, 10, 42],
        {
          version: "0.0.0",
          filePath: "local-state-update.tsx",
          fileHash: "1rqun2dr71nzq",
          kind: "value",
          splices: { $size: size },
          captures: [],
          spliceParams: { $size: [] },
        },
        () => ({
          kind: 214,
          loc: [10, 29, 10, 41],
          expression: {
            kind: 212,
            loc: [10, 29, 10, 39],
            expression: {
              kind: 1000,
              loc: [10, 29, 10, 34],
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
      [11, 16, 13, 9],
      {
        version: "0.0.0",
        filePath: "local-state-update.tsx",
        fileHash: "1rqun2dr71nzq",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: 220,
        loc: [11, 19, 13, 8],
        parameters: [],
        body: {
          kind: 242,
          loc: [11, 25, 13, 8],
          statements: [
            {
              kind: 214,
              loc: [12, 9, 12, 55],
              expression: {
                kind: 212,
                loc: [12, 9, 12, 21],
                expression: {
                  kind: 1000,
                  loc: [12, 9, 12, 14],
                  key: "$size",
                },
                questionDotToken: false,
                name: "update",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 220,
                  loc: [12, 22, 12, 54],
                  parameters: [
                    {
                      kind: 170,
                      loc: [12, 23, 12, 38],
                      name: {
                        kind: 80,
                        loc: [12, 23, 12, 30],
                        text: "current",
                        bindingKey: "current$1rqun2dr71nzq$0",
                      },
                    },
                  ],
                  body: {
                    kind: 227,
                    loc: [12, 43, 12, 54],
                    left: {
                      kind: 80,
                      loc: [12, 43, 12, 50],
                      text: "current",
                      bindingKey: "current$1rqun2dr71nzq$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: 9,
                      loc: [12, 53, 12, 54],
                      value: 1,
                    },
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
