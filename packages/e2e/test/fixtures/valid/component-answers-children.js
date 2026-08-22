import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
// A component stands exactly where its tag did, so what it may answer with is
// what may stand in a children position: `Children<D>`, where `D` is what the
// target draws with. A browser draws a bare string or a number there, and a
// list of children is a children position too.
async function Label() {
  return "counted";
}
async function Pair() {
  return [_jsx("em", { children: "one" }), _jsx("em", { children: "two" })];
}
export default _jsxs("div", { children: [_jsx(Label, {}), _jsx(Pair, {})] });
