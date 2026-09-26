import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs.create(
    "3t9qtypqc1fe7:14:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    "($splice0) => {\n    const n = $splice0()(2);\n    return <em>{n[0]()}</em>;\n}",
    '{"version":3,"file":"component-answers-script.test.jsx","sourceRoot":"","sources":["components/component-answers-script.test.tsx"],"names":[],"mappings":"AAaY;IACR,MAAM,CAAC,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,OAAO,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC;AAC3B,CAAC"}',
  );
}
it("componentAnswersScript", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersScript",
    _jsx("div", { children: _jsx(Panel, {}) }),
  );
});
