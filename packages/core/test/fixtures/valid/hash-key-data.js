import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
// With `#kind` as the bundle's one reserved key, a plain data object is free
// to use tag-like `#` keys: they ship as data.
export default _jsx("button", { data: { "#call": "#f0" } });
