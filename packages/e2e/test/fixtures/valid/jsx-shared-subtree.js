import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { Text, View } from "@backtickjs/core";
const shared = _jsx(Text, { children: "hi" });
// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
export default _jsx(View, { children: [shared, shared] });
