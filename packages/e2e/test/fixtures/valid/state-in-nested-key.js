import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, state, Text, View } from "@backtickjs/core";
// A cell reaching a nested element's key: `Panel` declares it and hands it
// down, so `Counter` receives it as a slot and the key reads it from there.
// The state-side companion to `nested-key-splice.tsx` — a cell threads through
// a key exactly as any other capture does, landing in `Counter`'s slot
// signature rather than as a `cell` node, since `Counter` doesn't own it.
const Counter = async ({ size }) =>
  _jsx(View, {
    children: _jsx(
      Text,
      { children: "press" },
      cs.create(
        [11, 16, 11, 32],
        {
          version: "0.0.0",
          filePath: "state-in-nested-key.tsx",
          fileHash: "h3aw1djkxdp9",
          kind: "value",
          splices: { $size: size },
          captures: [],
          spliceParams: { $size: [] },
        },
        (v) =>
          v.call(
            [11, 19, 11, 31],
            v.propertyAccess(
              [11, 19, 11, 29],
              v.splice([11, 19, 11, 24], "$size"),
              "read",
            ),
            [],
          ),
      ),
    ),
  });
async function Panel() {
  const size = state(16);
  return _jsx(Counter, { size: size });
}
export default _jsx(Panel, {});
