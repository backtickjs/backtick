import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";
// A server component's invocation is an instance boundary, so it hoists into a
// tree entry of its own even though each `<TextLabel />` is referenced once and
// would otherwise inline into the `View`. The entry is what a per-instance cell
// will belong to, so it can't depend on how many places reference the element.
//
// The component leaves no named trace: the payload carries `Text`, never
// `TextLabel`.
async function TextLabel(props) {
  return _jsx("span", { children: props.text });
}
it("componentBoundary", async (t) => {
  await snapshotCase(
    t,
    "componentBoundary",
    _jsxs("div", {
      children: [
        _jsx(TextLabel, { text: "one" }),
        _jsx(TextLabel, { text: "two" }),
      ],
    }),
  );
});
