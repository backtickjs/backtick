import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { Text, View } from "@backtickjs/core";
// Invocations nest, and each one is an instance. `Outer` renders `Inner`, which
// renders the `Text`, so there are three entries — and `Outer`'s content is a
// reference to `Inner`'s rather than an element of its own.
//
// A flag on the resolved element couldn't express this: the outer mark would
// overwrite the inner one and both invocations would collapse into a single
// entry, sharing one instance and therefore one lifetime for any state they
// declared.
async function Inner() {
  return _jsx(Text, { children: "x" });
}
async function Outer() {
  return _jsx(Inner, {});
}
export default _jsx(View, { children: _jsx(Outer, {}) });
