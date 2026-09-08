import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { Backtick, BacktickWithProps, cs } from "@backtickjs/core";
const rows = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "rows"]] },
  root: ["()", ["fn", "0"], []],
});
const empty = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "nothing to hand it"]] },
  root: ["()", ["fn", "0"], []],
});
// Right: what the bundle takes, and a drawing, which takes nothing.
export const drawn = _jsx(BacktickWithProps, {
  bundle: rows,
  props: { count: 1 },
});
export const bare = _jsx(Backtick, { bundle: empty });
// Wrong: the wrong type, a name it hasn't got, and none at all.
export const wrongType = _jsx(BacktickWithProps, {
  bundle: rows,
  props: { count: "one" },
});
export const wrongName = _jsx(BacktickWithProps, {
  bundle: rows,
  props: { nope: 1 },
});
export const missing = _jsx(BacktickWithProps, { bundle: rows });
// Null draws nothing, and a plain string is not a claim, so it is not a bundle.
export const nothing = _jsx(Backtick, { bundle: null });
export const text = _jsx(Backtick, { bundle: JSON.stringify({}) });
// A drawing, handed props anyway. A drawing is finished — there is no call for
// arguments to reach, so the component that takes them does not take it.
export const handedAnyway = _jsx(BacktickWithProps, {
  bundle: empty,
  props: { count: 1 },
});
export default cs.create(
  [43, 16, 43, 21],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "mt1bpwe3j620",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [43, 19, 43, 20],
    value: 1,
  }),
);
