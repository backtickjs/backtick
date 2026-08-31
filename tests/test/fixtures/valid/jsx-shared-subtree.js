import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
const shared = _jsx("span", { children: "hi" });
// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
export default _jsx("div", { children: [shared, shared] });
