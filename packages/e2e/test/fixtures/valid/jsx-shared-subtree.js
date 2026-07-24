import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
const Label = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Label",
  props,
});
const Flexbox = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Flexbox",
  props,
});
const shared = _jsx(Label, { text: "hi" });
// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
export default _jsx(Flexbox, {
  direction: "column",
  children: [shared, shared],
});
