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
        (v) =>
          v.callExpression(
            [16, 29, 16, 41],
            v.propertyAccessExpression(
              [16, 29, 16, 39],
              v.splice([16, 29, 16, 34], "$size"),
              false,
              "read",
            ),
            false,
            [],
          ),
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
      (v) =>
        v.arrowFunction(
          [17, 19, 19, 8],
          [],
          v.block(
            [17, 25, 19, 8],
            [
              v.callExpression(
                [18, 9, 18, 38],
                v.propertyAccessExpression(
                  [18, 9, 18, 20],
                  v.splice([18, 9, 18, 14], "$size"),
                  false,
                  "write",
                ),
                false,
                [
                  v.binaryExpression(
                    [18, 21, 18, 37],
                    v.callExpression(
                      [18, 21, 18, 33],
                      v.propertyAccessExpression(
                        [18, 21, 18, 31],
                        v.splice([18, 21, 18, 26], "$size"),
                        false,
                        "read",
                      ),
                      false,
                      [],
                    ),
                    "+",
                    v.numericLiteral([18, 36, 18, 37], 1),
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
export default _jsx(Stepper, {});
