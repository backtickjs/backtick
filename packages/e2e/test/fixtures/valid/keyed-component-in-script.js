import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, Text } from "@backtickjs/core";
// A key on a component tag rides the reference that instantiates it. A script
// instantiates a tree by applying it, and an apply carries a key — so a row a
// script builds says which of its siblings it is, exactly as one written in
// tree position does.
//
// An element is the other case and was always legal — it keeps its key in its
// own node, so `large-data.tsx` can splice one into a `map` and every instance
// the script produces keeps a key.
async function Row() {
  return _jsx(Text, { children: "x" });
}
const row = _jsx(Row, {}, "k");
const script = cs.create(
  [18, 43, 18, 57],
  {
    version: "0.0.0",
    filePath: "keyed-component-in-script.tsx",
    fileHash: "5qow7um6x7uo",
    kind: "value",
    splices: { $row: row },
    captures: [],
    spliceParams: { $row: [] },
  },
  () => ({
    kind: 220,
    loc: [18, 46, 18, 56],
    parameters: [],
    body: {
      kind: 1000,
      loc: [18, 52, 18, 56],
      key: "$row",
    },
  }),
);
export default script;
