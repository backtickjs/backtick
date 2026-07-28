import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, View, Text } from "@backtickjs/core";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    [7, 10, 7, 22],
    {
      version: "0.0.0",
      filePath: "jsx-polymorphic-prop.tsx",
      fileHash: "1le9zmhdblst0",
      kind: "value",
      splices: { $n: n },
      captures: [],
      spliceParams: { $n: [] },
    },
    (v) => v.arrow([7, 13, 7, 21], [], v.splice([7, 19, 7, 21], "$n")),
  );
}
export default _jsxs(View, {
  children: [
    _jsx(Text, { onPress: make(1) }),
    _jsx(Text, { onPress: make(2) }),
  ],
});
