import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    [9, 10, 9, 22],
    {
      version: "0.0.0",
      filePath: "jsx/jsx-polymorphic-prop.test.tsx",
      fileHash: "9toqhs9m4ayz",
      splices: { $n: { value: n, params: [] } },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [9, 13, 9, 21],
      parameters: [],
      body: {
        kind: "splice",
        loc: [9, 19, 9, 21],
        key: "$n",
      },
    }),
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
