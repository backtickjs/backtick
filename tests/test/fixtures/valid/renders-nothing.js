import { jsx as _jsx } from "@backtickjs/web-client/jsx-runtime";
// A server component can render nothing. The invocation is still an instance —
// it owns the cells the component declared, and a re-render can give it a child
// later — so it keeps a tree entry of its own, with null content.
async function Absent() {
  return null;
}
export default _jsx("div", { children: _jsx(Absent, {}) });
