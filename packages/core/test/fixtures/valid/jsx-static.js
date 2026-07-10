import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
// A host-built JSX tree with only static props bundles as pure data: one tree
// entry, an empty function table, and a nested element inlined in place.
export default (_jsx("flexbox", { direction: "row", children: _jsx("label", { text: "hi" }, "a") }));
