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
          declarations: [],
          captured: [],
        },
        (v) =>
          v.call(
            [10, 29, 10, 41],
            v.propertyAccess(
              [10, 29, 10, 39],
              v.splice([10, 29, 10, 34], "$size"),
              "read",
            ),
            [],
          ),
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
        declarations: ["current$1rqun2dr71nzq$0"],
        captured: [],
      },
      (v) =>
        v.arrow(
          [11, 19, 13, 8],
          [],
          v.block(
            [11, 25, 13, 8],
            [
              v.call(
                [12, 9, 12, 55],
                v.propertyAccess(
                  [12, 9, 12, 21],
                  v.splice([12, 9, 12, 14], "$size"),
                  "update",
                ),
                [
                  v.arrow(
                    [12, 22, 12, 54],
                    [
                      v.identifier(
                        [12, 23, 12, 30],
                        "current",
                        "current$1rqun2dr71nzq$0",
                      ),
                    ],
                    v.binop(
                      [12, 43, 12, 54],
                      v.identifier(
                        [12, 43, 12, 50],
                        "current",
                        "current$1rqun2dr71nzq$0",
                      ),
                      "+",
                      v.number([12, 53, 12, 54], 1),
                    ),
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
