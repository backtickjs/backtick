import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { Backtick, cs } from "@backtickjs/core";
const rows = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "rows"]] },
  root: ["()", ["fn", "0"], []],
});
const empty = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "nothing to hand it"]] },
  root: ["()", ["fn", "0"], []],
});
// Right: what the bundle takes, and what it takes nothing of.
export const drawn = _jsx(Backtick, { bundle: rows, props: { count: 1 } });
export const bare = _jsx(Backtick, { bundle: empty, props: {} });
// Wrong: the wrong type, a name it hasn't got, and none at all.
export const wrongType = _jsx(Backtick, {
  bundle: rows,
  props: { count: "one" },
});
export const wrongName = _jsx(Backtick, { bundle: rows, props: { nope: 1 } });
export const missing = _jsx(Backtick, { bundle: rows });
// A plain string is not a claim about anything, so it is not a bundle.
export const text = _jsx(Backtick, { bundle: JSON.stringify({}), props: {} });
// A bundle that takes nothing, handed something anyway. The empty case is a
// record whose values are `never`, so `{}` goes in and nothing else does.
export const handedAnyway = _jsx(Backtick, {
  bundle: empty,
  props: { count: 1 },
});
export default cs.create(
  [37, 16, 37, 21],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "1iiku8844c15i",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [37, 19, 37, 20],
    value: 1,
  }),
);
