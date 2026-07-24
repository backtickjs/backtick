import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each prop's `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    [7, 10, 7, 22],
    {
      version: "0.0.0",
      filePath: "jsx-polymorphic-prop.tsx",
      fileHash: "2utzrnix6a7i5",
      kind: "value",
      splices: { $n: n },
      captures: [],
      declarations: [],
    },
    (v) => v.arrow([7, 13, 7, 21], [], v.splice([7, 19, 7, 21], "$n")),
  );
}
export default _jsx("button", { onA: make(1), onB: make(2) });
