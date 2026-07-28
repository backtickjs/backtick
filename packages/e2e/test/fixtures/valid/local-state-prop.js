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
          declarations: [],
          captured: [],
        },
        (v) =>
          v.call(
            [11, 27, 11, 39],
            v.propertyAccess(
              [11, 27, 11, 37],
              v.splice([11, 27, 11, 32], "$size"),
              "read",
            ),
            [],
          ),
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
        declarations: [],
        captured: [],
      },
      (v) =>
        v.arrow(
          [12, 17, 14, 6],
          [],
          v.block(
            [12, 23, 14, 6],
            [
              v.call(
                [13, 7, 13, 36],
                v.propertyAccess(
                  [13, 7, 13, 18],
                  v.splice([13, 7, 13, 12], "$size"),
                  "write",
                ),
                [
                  v.binop(
                    [13, 19, 13, 35],
                    v.call(
                      [13, 19, 13, 31],
                      v.propertyAccess(
                        [13, 19, 13, 29],
                        v.splice([13, 19, 13, 24], "$size"),
                        "read",
                      ),
                      [],
                    ),
                    "+",
                    v.number([13, 34, 13, 35], 1),
                  ),
                ],
              ),
            ],
          ),
        ),
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
