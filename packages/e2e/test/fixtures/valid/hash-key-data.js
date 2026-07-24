import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
const Button = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Button",
  props,
});
// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the old tagged forms.
export default _jsx(Button, { data: { "#call": "#f0" } });
