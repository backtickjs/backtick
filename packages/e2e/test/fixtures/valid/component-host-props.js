import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
// A component's props are the host's own. It runs while bundling and consumes
// them there, so they never cross and need not be able to: a class instance and
// a host function are both fine here, where either would be refused in a
// `<div>`'s props.
//
// This is why a drawing's props are `unknown` rather than what a client value
// may be — crossing is a tag's requirement, checked where a tag lowers.
class Palette {
  accent;
  constructor(accent) {
    this.accent = accent;
  }
}
async function Swatch(props) {
  return _jsx("span", { class: props.palette.accent, children: props.label() });
}
export default _jsx("div", {
  children: _jsx(Swatch, {
    palette: new Palette("danger"),
    label: () => "one",
  }),
});
