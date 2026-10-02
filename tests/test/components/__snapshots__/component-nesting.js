import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Invocations nest, and each one is an instance. `Outer` renders `Inner`, which
// renders the `Text`, so there are three entries — and `Outer`'s content is a
// reference to `Inner`'s rather than an element of its own.
//
// A flag on the resolved element couldn't express this: the outer mark would
// overwrite the inner one and both invocations would collapse into a single
// entry, sharing one instance and therefore one lifetime for any state they
// declared.
async function Inner() {
  return cs.create(
    "2l5eb0u3jx2g5:14:9",
    { params: [] },
    "() => <span>x</span>",
    '{"version":3,"file":"component-nesting.test.jsx","sourceRoot":"","sources":["components/component-nesting.test.tsx"],"names":[],"mappings":"AAaY,MAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC"}',
  );
}
async function Outer() {
  return _jsx(Inner, {});
}
it("componentNesting", async (t) => {
  await snapshotCase(
    t,
    "componentNesting",
    cs.create(
      "2l5eb0u3jx2g5:22:44",
      { params: [{ kind: "splice", value: _jsx(Outer, {}), bindings: [] }] },
      "($splice0) => <div>{$splice0()}</div>",
      '{"version":3,"file":"component-nesting.test.jsx","sourceRoot":"","sources":["components/component-nesting.test.tsx"],"names":[],"mappings":"AAqB+C,cAAA,CAAC,GAAG,CAAC,CAAC,UAAc,CAAC,EAAE,GAAG,CAAC"}',
    ),
  );
});
