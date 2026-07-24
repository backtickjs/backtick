import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
const Button = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Button",
  props,
});
// With elements carried as a `#` form, a plain data object shaped like
// one (`type`/`key`/`props`) is unambiguous and ships as data.
export default _jsx(Button, { data: { type: "x", key: null, props: {} } });
