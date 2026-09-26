import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Storage a script declares for itself, rather than one a component owns and
// splices in. `$state(...)` is an ordinary call of an imported value, and the
// cell is what the call answers with: each time it is evaluated there is
// another cell, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.create(
    "3f2468k5dp5lo:10:16",
    { params: [{ kind: "splice", value: state, bindings: [] }] },
    {
      code: "export default ($0) => (label) => {\n    return { label: $0()(label) };\n};",
      map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eASmB,QAAA,CAAC,KAAa,EAAE,EAAE;IACjC,OAAO,EAAE,KAAK,EAAE,IAAM,CAAC,KAAK,CAAC,EAAE,CAAC;AAClC,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
  return _jsx("span", {
    style: cs.create(
      "3f2468k5dp5lo:16:13",
      { params: [] },
      {
        code: 'export default () => "font-size: 16px";',
        map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAegB,MAAA,iBAAiB"}',
        imports: [],
        exportAt: 0,
      },
    ),
    onclick: cs.create(
      "3f2468k5dp5lo:17:15",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      {
        code: 'export default ($0) => () => {\n    const row = $0()("one");\n    row.label.set(row.label.get() + " !!!");\n};',
        map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAgBkB,QAAA,GAAG,EAAE;IACf,MAAM,GAAG,GAAG,IAAM,CAAC,KAAK,CAAC,CAAC;IAC1B,GAAG,CAAC,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,MAAM,CAAC,CAAC;AAC1C,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
    children: cs.create(
      "3f2468k5dp5lo:22:7",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      {
        code: 'export default ($0) => $0()("one").label.get();',
        map: '{"version":3,"file":"script-state.test.jsx","sourceRoot":"","sources":["script-state.test.tsx"],"names":[],"mappings":"eAqBU,QAAA,IAAM,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE"}',
        imports: [],
        exportAt: 0,
      },
    ),
  });
}
it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", _jsx(ScriptRows, {}));
});
