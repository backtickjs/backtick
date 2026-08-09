import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A cell crossing a component boundary: declared once by the parent, handed to
// each child as a prop, so both read one storage. Ownership follows the
// declaration rather than the readers, so `Panel`'s entry declares the cell and
// each `Counter` receives the handle as a slot — which is what makes a write
// through either child reach the same storage.
const Counter = async ({ size }) =>
  _jsx("span", {
    style: cs.create(
      [11, 12, 11, 51],
      {
        version: "0.0.0",
        filePath: "local-state-prop.tsx",
        fileHash: "gb10io8ydqeb",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: 227,
        loc: [11, 15, 11, 50],
        left: {
          kind: 227,
          loc: [11, 15, 11, 43],
          left: {
            kind: 11,
            loc: [11, 15, 11, 28],
            text: "font-size: ",
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [11, 31, 11, 43],
            expression: {
              kind: 212,
              loc: [11, 31, 11, 41],
              expression: {
                kind: 1000,
                loc: [11, 31, 11, 36],
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
          loc: [11, 46, 11, 50],
          text: "px",
        },
      }),
    ),
    onclick: cs.create(
      [12, 14, 14, 7],
      {
        version: "0.0.0",
        filePath: "local-state-prop.tsx",
        fileHash: "gb10io8ydqeb",
        kind: "value",
        splices: { $size: size },
        captures: [],
        spliceParams: { $size: [] },
      },
      () => ({
        kind: 220,
        loc: [12, 17, 14, 6],
        parameters: [],
        body: {
          kind: 242,
          loc: [12, 23, 14, 6],
          statements: [
            {
              kind: 214,
              loc: [13, 7, 13, 36],
              expression: {
                kind: 212,
                loc: [13, 7, 13, 18],
                expression: {
                  kind: 1000,
                  loc: [13, 7, 13, 12],
                  key: "$size",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 227,
                  loc: [13, 19, 13, 35],
                  left: {
                    kind: 214,
                    loc: [13, 19, 13, 31],
                    expression: {
                      kind: 212,
                      loc: [13, 19, 13, 29],
                      expression: {
                        kind: 1000,
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
                    kind: 9,
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
  return _jsxs("div", {
    children: [_jsx(Counter, { size: size }), _jsx(Counter, { size: size })],
  });
}
export default _jsx(Panel, {});
