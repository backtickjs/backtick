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
    "385ryajbwsmy3:11:16",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: "export default ($0) => (label) => {\n    return { label: $0()(label) };\n};",
      map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAUmB,QAAA,CAAC,KAAa,EAAE,EAAE;IACjC,OAAO,EAAE,KAAK,EAAE,IAAa,CAAC,KAAK,CAAC,EAAE,CAAC;AACzC,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
  return _jsx("span", {
    style: cs.create(
      "385ryajbwsmy3:17:13",
      { params: [] },
      {
        code: 'export default () => "font-size: 16px";',
        map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAgBgB,MAAA,iBAAiB"}',
        imports: [],
        exportAt: 0,
      },
    ),
    onclick: cs.create(
      "385ryajbwsmy3:18:15",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      {
        code: 'export default ($0) => () => {\n    const row = $0()("one");\n    row.label[1](row.label[0]() + " !!!");\n};',
        map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAiBkB,QAAA,GAAG,EAAE;IACf,MAAM,GAAG,GAAG,IAAM,CAAC,KAAK,CAAC,CAAC;IAC1B,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,MAAM,CAAC,CAAC;AACxC,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
    children: cs.create(
      "385ryajbwsmy3:23:7",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      {
        code: 'export default ($0) => $0()("one").label[0]();',
        map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAsBU,QAAA,IAAM,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE"}',
        imports: [],
        exportAt: 0,
      },
    ),
  });
}
it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", _jsx(ScriptRows, {}));
});
