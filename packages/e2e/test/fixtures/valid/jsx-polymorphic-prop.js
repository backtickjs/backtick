import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create(
    [7, 10, 7, 22],
    {
      version: "0.0.0",
      filePath: "jsx-polymorphic-prop.tsx",
      fileHash: "29qub6x9fptt4",
      kind: "value",
      splices: { $n: n },
      captures: [],
      spliceParams: { $n: [] },
    },
    () => ({
      kind: 220,
      loc: [7, 13, 7, 21],
      parameters: [],
      body: {
        kind: 1000,
        loc: [7, 19, 7, 21],
        key: "$n",
      },
    }),
  );
}
export default _jsxs("div", {
  children: [
    _jsx("span", { onclick: make(1) }),
    _jsx("span", { onclick: make(2) }),
  ],
});
