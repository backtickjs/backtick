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
// A host-built JSX tree with only static props bundles as pure data: one tree
// entry, an empty function table, and a nested element inlined in place.
export default _jsx(Flexbox, {
  direction: "row",
  children: _jsx(Label, { text: "hi" }, "a"),
});
