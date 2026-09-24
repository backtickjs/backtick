import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    "9toqhs9m4ayz:9:9",
    { splices: { $n: { value: n, params: [] } }, captures: [] },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 9, column: 12 }, end: { line: 9, column: 20 } },
      params: [],
      body: {
        type: "Splice",
        loc: { start: { line: 9, column: 18 }, end: { line: 9, column: 20 } },
        key: "$n",
      },
      expression: true,
    }),
    "$0 => () => $0()",
    '{"version":3,"file":"jsx-polymorphic-prop.test.jsx","sourceRoot":"","sources":["jsx-polymorphic-prop.test.tsx"],"names":[],"mappings":"AAQY,MAAA,GAAG,EAAE,CAAC,IAAE,CAAA"}',
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
