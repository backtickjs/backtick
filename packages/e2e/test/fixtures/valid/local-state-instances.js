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
          declarations: [],
          spliceScopes: { $size: [] },
        },
        (v) =>
          v.call(
            [11, 29, 11, 41],
            v.propertyAccess(
              [11, 29, 11, 39],
              v.splice([11, 29, 11, 34], "$size"),
              "read",
            ),
            [],
          ),
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
        declarations: [],
        spliceScopes: { $size: [] },
      },
      (v) =>
        v.arrow(
          [12, 19, 14, 8],
          [],
          v.block(
            [12, 25, 14, 8],
            [
              v.call(
                [13, 9, 13, 38],
                v.propertyAccess(
                  [13, 9, 13, 20],
                  v.splice([13, 9, 13, 14], "$size"),
                  "write",
                ),
                [
                  v.binop(
                    [13, 21, 13, 37],
                    v.call(
                      [13, 21, 13, 33],
                      v.propertyAccess(
                        [13, 21, 13, 31],
                        v.splice([13, 21, 13, 26], "$size"),
                        "read",
                      ),
                      [],
                    ),
                    "+",
                    v.number([13, 36, 13, 37], 1),
                  ),
                ],
              ),
            ],
          ),
        ),
    ),
    children: "press",
  });
}
export default _jsxs(View, {
  children: [_jsx(Counter, {}), _jsx(Counter, {})],
});
