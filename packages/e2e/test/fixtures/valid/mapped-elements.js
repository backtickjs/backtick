import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { Text, View } from "@backtickjs/core";
const items = ["alpha", "beta", "gamma"];
// A list mapped on the host. The array is host data, so the map runs while
// bundling and each item becomes its own element — the list's length is fixed
// in the bundle. `large-data.tsx` is the other shape, where a `cs` script maps
// on the client and the bundle carries one template plus the data.
//
// Each element is referenced once, so none hoists: they inline into the
// `View`'s entry, each carrying its own key inside the element node.
export default _jsx(View, {
  children: items.map((item, index) => _jsx(Text, { children: item }, index)),
});
