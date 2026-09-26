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
      code: "export default $0 => label => {\n  return {\n    label: $0()(label)\n  };\n};",
      map: '{"version":3,"mappings":"eAUmBA,EAAA,IAACC,KAAa,IAAI;EACjC,OAAO;IAAEA,KAAK,EAAED,EAAA,EAAa,CAACC,KAAK;EAAC,CAAE;AACxC,CAAC","names":["$0","label"],"ignoreList":[],"sources":["script-state.test.tsx"]}',
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
        map: '{"version":3,"mappings":"eAgBgB,uBAAiB","names":[],"ignoreList":[],"sources":["script-state.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
    onclick: cs.create(
      "385ryajbwsmy3:18:15",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      {
        code: 'export default $0 => () => {\n  const row = $0()("one");\n  row.label[1](row.label[0]() + " !!!");\n};',
        map: '{"version":3,"mappings":"eAiBkBA,EAAA,UAAK;EACf,MAAMC,GAAG,GAAGD,EAAA,EAAM,CAAC,KAAK,CAAC;EACzBC,GAAG,CAACC,KAAK,CAAC,CAAC,CAAC,CAACD,GAAG,CAACC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,MAAM,CAAC;AACvC,CAAC","names":["$0","row","label"],"ignoreList":[],"sources":["script-state.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
    children: cs.create(
      "385ryajbwsmy3:23:7",
      { params: [{ kind: "splice", value: build, bindings: [] }] },
      {
        code: 'export default $0 => $0()("one").label[0]();',
        map: '{"version":3,"mappings":"eAsBUA,EAAA,IAAAA,EAAA,EAAM,CAAC,KAAK,CAAC,CAACC,KAAK,CAAC,CAAC,CAAC,EAAE","names":["$0","label"],"ignoreList":[],"sources":["script-state.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  });
}
it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", _jsx(ScriptRows, {}));
});
