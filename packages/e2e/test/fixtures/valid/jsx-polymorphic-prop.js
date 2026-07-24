import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
const Button = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Button",
  props,
});
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each prop's `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    [13, 10, 13, 22],
    {
      version: "0.0.0",
      filePath: "jsx-polymorphic-prop.tsx",
      fileHash: "2t0s9pyns1u1f",
      kind: "value",
      splices: { $n: n },
      captures: [],
      declarations: [],
    },
    (v) => v.arrow([13, 13, 13, 21], [], v.splice([13, 19, 13, 21], "$n")),
  );
}
export default _jsx(Button, { onA: make(1), onB: make(2) });
