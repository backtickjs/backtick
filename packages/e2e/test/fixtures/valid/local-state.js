import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
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
  return _jsx("span", {
    style: cs.create(
      [16, 14, 16, 53],
      {
        version: "0.0.0",
        filePath: "local-state.tsx",
        fileHash: "32fwldp12hoh5",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: 227,
        loc: [16, 17, 16, 52],
        left: {
          kind: 227,
          loc: [16, 17, 16, 45],
          left: {
            kind: 11,
            loc: [16, 17, 16, 30],
            text: "font-size: ",
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [16, 33, 16, 45],
            expression: {
              kind: 212,
              loc: [16, 33, 16, 43],
              expression: {
                kind: 1000,
                loc: [16, 33, 16, 38],
                key: "$size",
              },
              questionDotToken: false,
              name: "read",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
        operatorToken: "+",
        right: {
          kind: 11,
          loc: [16, 48, 16, 52],
          text: "px",
        },
      }),
    ),
    onclick: cs.create(
      [17, 16, 19, 9],
      {
        version: "0.0.0",
        filePath: "local-state.tsx",
        fileHash: "32fwldp12hoh5",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: 220,
        loc: [17, 19, 19, 8],
        parameters: [],
        body: {
          kind: 242,
          loc: [17, 25, 19, 8],
          statements: [
            {
              kind: 214,
              loc: [18, 9, 18, 38],
              expression: {
                kind: 212,
                loc: [18, 9, 18, 20],
                expression: {
                  kind: 1000,
                  loc: [18, 9, 18, 14],
                  key: "$size",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 227,
                  loc: [18, 21, 18, 37],
                  left: {
                    kind: 214,
                    loc: [18, 21, 18, 33],
                    expression: {
                      kind: 212,
                      loc: [18, 21, 18, 31],
                      expression: {
                        kind: 1000,
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
                    kind: 9,
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
