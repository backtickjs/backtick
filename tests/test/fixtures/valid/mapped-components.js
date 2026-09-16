import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
const items = ["alpha", "beta", "gamma"];
async function Row({ label }) {
  return _jsx("span", { children: label });
}
// The same list, but each item is a component invocation rather than an
// element. Every invocation is an instance, so each gets a tree entry of its
// own and the key rides the `#apply` that instantiates it — the contrast with
// `mapped-elements.tsx`, where the key sits inside an inlined element instead.
export default _jsx("div", {
  children: items.map((item) => _jsx(Row, { label: item })),
});
