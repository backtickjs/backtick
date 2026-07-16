import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
const shared = _jsx("label", { text: "hi" });
// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
export default _jsx("flexbox", {
  direction: "column",
  children: [shared, shared],
});
