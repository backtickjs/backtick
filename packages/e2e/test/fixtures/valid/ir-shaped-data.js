import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
const Button = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Button",
  props,
});
// A plain data object that mimics an IR node (`kind`/`target`) stays data:
// the IR carries user data under its own value nodes, so a `kind` key can
// never read as structure.
export default _jsx(Button, { data: { kind: "IrScriptRef", target: 0 } });
