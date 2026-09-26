import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";
// A component stands exactly where its tag did, so what it may answer with is
// what may stand there: one drawing, or nothing at all. Text and a list are
// neither — a component with several children to give, or a bare string, wraps
// them in a fragment, which is the one drawing that holds them and draws no
// node of its own.
async function Label() {
  return _jsx(_Fragment, { children: "counted" });
}
async function Pair() {
  return _jsxs(_Fragment, {
    children: [
      _jsx("em", { children: "one" }),
      _jsx("em", { children: "two" }),
    ],
  });
}
it("componentAnswersChildren", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersChildren",
    _jsxs("div", { children: [_jsx(Label, {}), _jsx(Pair, {})] }),
  );
});
