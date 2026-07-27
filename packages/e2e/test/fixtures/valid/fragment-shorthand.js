import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "@backtickjs/core/jsx-runtime";
import { Text, View } from "@backtickjs/core";
// `<>…</>` and `<Fragment>` are one component: the JSX transform imports
// `Fragment` from the configured `jsxImportSource`, and the jsx-runtime
// re-exports the core component under that name. The shorthand needs no import.
export default _jsx(View, {
  children: _jsxs(_Fragment, {
    children: [_jsx(Text, { children: "a" }), _jsx(Text, { children: "b" })],
  }),
});
