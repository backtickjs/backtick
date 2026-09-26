import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    "9toqhs9m4ayz:9:9",
    { params: [{ kind: "splice", value: n, bindings: [] }] },
    {
      code: "export default ($0) => () => $0();",
      map: '{"version":3,"file":"jsx-polymorphic-prop.test.jsx","sourceRoot":"","sources":["jsx/jsx-polymorphic-prop.test.tsx"],"names":[],"mappings":"eAQY,QAAA,GAAG,EAAE,CAAC,IAAE"}',
    },
  );
}
it("jsxPolymorphicProp", async (t) => {
  await snapshotCase(
    t,
    "jsxPolymorphicProp",
    _jsxs("div", {
      children: [
        _jsx("span", { onclick: make(1) }),
        _jsx("span", { onclick: make(2) }),
      ],
    }),
  );
});
