import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
// A server component's script, run where its splice stands, as Solid runs a
// component: untracked. It reads a signal of its own while it sets up, which a
// timer it starts then writes: read where the splice stands, the write would
// build it again, with a signal never written and a timer never fired.
async function Held({ again }) {
  return cs.create(
    "lsxk313cjdhj:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: again, bindings: [] },
      ],
    },
    '($splice0, $splice1) => {\n    const shown = $splice0()(false);\n    const started = window.setTimeout(() => {\n        if ($splice1()()) {\n            shown[1](true);\n        }\n    }, 0);\n    const read = shown[0]();\n    return <em>{"read " + read}</em>;\n}',
    '{"version":3,"file":"server-component-builds-once.test.jsx","sourceRoot":"","sources":["components/server-component-builds-once.test.tsx"],"names":[],"mappings":"AAYY;IACR,MAAM,KAAK,GAAG,UAAa,CAAC,KAAK,CAAC,CAAC;IAEnC,MAAM,OAAO,GAAG,MAAM,CAAC,UAAU,CAAC,GAAG,EAAE;QACrC,IAAI,UAAM,EAAE,EAAE,CAAC;YACb,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;QACjB,CAAC;IACH,CAAC,EAAE,CAAC,CAAC,CAAC;IAEN,MAAM,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC;IACxB,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,GAAG,IAAI,CAAC,EAAE,EAAE,CAAC,CAAC;AACnC,CAAC"}',
  );
}
const held = cs.create(
  "lsxk313cjdhj:27:13",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: _jsx(Held, {
          again: cs.create(
            "lsxk313cjdhj:35:19",
            { params: [{ kind: "capture", key: "builds$lsxk313cjdhj$3" }] },
            "($capture0) => () => {\n    $capture0[1]($capture0[0]() + 1);\n    return $capture0[0]() < 5;\n}",
            '{"version":3,"file":"server-component-builds-once.test.jsx","sourceRoot":"","sources":["components/server-component-builds-once.test.tsx"],"names":[],"mappings":"AAkCsB,eAAA,GAAG,EAAE;IACb,SAAM,CAAC,CAAC,CAAC,CAAC,SAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;IAC3B,OAAO,SAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;AACzB,CAAC"}',
          ),
        }),
        bindings: ["builds$lsxk313cjdhj$3"],
      },
    ],
  },
  '($splice0, $splice1) => {\n    const builds = $splice0()(0);\n    return (<div>\n      <span>{"builds " + builds[0]()}</span>\n      <section>{$splice1(builds)}</section>\n    </div>);\n}',
  '{"version":3,"file":"server-component-builds-once.test.jsx","sourceRoot":"","sources":["components/server-component-builds-once.test.tsx"],"names":[],"mappings":"AA0BgB;IACd,MAAM,MAAM,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAChC,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,SAAS,GAAG,MAAM,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,IAAI,CACrC;MAAA,CAAC,OAAO,CAAC,CACP,gBAQF,CAAC,EAAE,OAAO,CACZ;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
describe("a server component that reads a signal as it sets up", () => {
  it("is built once", async () => {
    render(await evaluate(() => held));
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(screen.getByText("builds 1"));
  });
});
