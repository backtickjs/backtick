import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, Image, Text, View } from "@backtickjs/core";
export default _jsxs(View, {
  style: { padding: 8 },
  children: [
    _jsx(Text, {
      style: { fontSize: 12 },
      onPress: cs.create(
        [5, 45, 5, 57],
        {
          version: "0.0.0",
          filePath: "core-components.tsx",
          fileHash: "k1rdly8050va",
          kind: "value",
          splices: {},
          captures: [],
          spliceScopes: {},
        },
        (v) => v.arrow([5, 48, 5, 56], [], v.block([5, 54, 5, 56], [])),
      ),
      children: "hi",
    }),
    _jsx(Image, {
      source: { uri: "https://example.com/a.png" },
      resizeMode: "cover",
    }),
  ],
});
