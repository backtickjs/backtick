import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-client/jsx-runtime";
// A server component's invocation is an instance boundary, so it hoists into a
// tree entry of its own even though each `<Label />` is referenced once and
// would otherwise inline into the `View`. The entry is what a per-instance cell
// will belong to, so it can't depend on how many places reference the element.
//
// The component leaves no named trace: the payload carries `Text`, never
// `Label`.
async function Label(props) {
  return _jsx("span", { children: props.text });
}
export default _jsxs("div", {
  children: [_jsx(Label, { text: "one" }), _jsx(Label, { text: "two" })],
});
