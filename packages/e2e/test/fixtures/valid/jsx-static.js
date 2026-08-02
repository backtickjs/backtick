import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { Text, View } from "@backtickjs/core";
// A host-built JSX tree with only static props bundles as pure data: one tree
// entry, an empty function table, and a nested element inlined in place.
export default _jsx(View, { children: _jsx(Text, { children: "hi" }) });
