import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// Storage a script declares for itself, rather than one a component owns and
// splices in. `$createSignal(...)` is an ordinary call of an imported value, and
// the signal is what the call answers with: each time it is evaluated there is
// another signal, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.create(
    "26efeom523wsc:11:16",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    "($splice0) => (label) => {\n    return { label: $splice0()(label) };\n}",
    '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["state/script-state.test.tsx"],"names":[],"mappings":"AAUmB,cAAA,CAAC,KAAa,EAAE,EAAE;IACjC,OAAO,EAAE,KAAK,EAAE,UAAa,CAAC,KAAK,CAAC,EAAE,CAAC;AACzC,CAAC"}',
  );
  return cs.create(
    "26efeom523wsc:15:9",
    { params: [{ kind: "splice", value: build, bindings: [] }] },
    '($splice0) => <span style="font-size: 16px" onclick={() => {\n        const row = $splice0()("one");\n        row.label[1](row.label[0]() + " !!!");\n    }}>\n    {$splice0()("one").label[0]()}\n  </span>',
    '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["state/script-state.test.tsx"],"names":[],"mappings":"AAcY,cAAA,CAAC,IAAI,CACb,KAAK,CAAC,iBAAiB,CACvB,OAAO,CAAC,CAAC,GAAG,EAAE;QACZ,MAAM,GAAG,GAAG,UAAM,CAAC,KAAK,CAAC,CAAC;QAC1B,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,MAAM,CAAC,CAAC;IACxC,CAAC,CAAC,CAEF;IAAA,CAAC,UAAM,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAC3B;EAAA,EAAE,IAAI,CAAC"}',
  );
}
it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", _jsx(ScriptRows, {}));
});
