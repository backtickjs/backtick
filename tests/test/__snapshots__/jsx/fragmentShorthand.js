import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "@backtickjs/web-sdk/jsx-runtime";
// `<>…</>` and `<Fragment>` are one component: the JSX transform imports
// `Fragment` from the configured `jsxImportSource`, and the jsx-runtime
// re-exports the core component under that name. The shorthand needs no import.
const fragmentShorthand = _jsx("div", {
  children: _jsxs(_Fragment, {
    children: [
      _jsx("span", { children: "a" }),
      _jsx("span", { children: "b" }),
    ],
  }),
});
