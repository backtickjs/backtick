import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
// What the page held each time a script logged, read through the console
// `onMount` reaches from a script.
async function logged(draw) {
  const seen = [];
  const log = globalThis.window.console.log;
  globalThis.window.console.log = () => {
    seen.push(document.body.textContent ?? "");
  };
  try {
    await draw();
  } finally {
    globalThis.window.console.log = log;
  }
  return seen;
}
describe("onMount", () => {
  it("runs once, after the drawing is in the page", async () => {
    const seen = await logged(() =>
      render(
        cs.create(
          "20lmqniw1759i:29:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: onMount, bindings: [] },
              { kind: "splice", value: window, bindings: [] },
            ],
          },
          {
            code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<p>`);\nexport default ($0, $1, $2) => {\n  const count = $0()(0);\n  $1()(() => {\n    $2().console.log();\n    count[1](count[0]() + 1);\n  });\n  return (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => "mounted " + count[0]());\n    return _el$;\n  })();\n};',
            map: '{"version":3,"mappings":";;;eA4BW,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACD,MAAMC,KAAK,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9BC,EAAA,EAAQ,CAAC,MAAK;IACZC,EAAA,EAAO,CAACE,OAAO,CAACC,GAAG,EAAE;IACrBF,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;EAC1B,CAAC,CAAC;EACF;IAAA,IAAAG,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAAW,UAAU,GAAGH,KAAK,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAG,IAAA;EAAA;AACpC,CAAC","names":["$0","$1","$2","count","console","log","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["on-mount.test.tsx"]}',
            imports: [
              {
                from: "solid-js/web",
                range: [0, 54],
                bindings: [{ name: "template", local: "_$template" }],
              },
              {
                from: "solid-js/web",
                range: [55, 105],
                bindings: [{ name: "insert", local: "_$insert" }],
              },
            ],
            exportAt: 151,
          },
        ),
      ),
    );
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });
  it("runs at once when called from a handler", async () => {
    await render(
      cs.create(
        "20lmqniw1759i:45:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: onMount, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<button>`);\nexport default ($0, $1) => {\n  const said = $0()("not yet");\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => $1()(() => said[1]("ran"));\n    _$insert(_el$, () => said[0]());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eA4CS,CAAAA,EAAA,EAAAC,EAAA;EACD,MAAMC,IAAI,GAAGF,EAAA,EAAa,CAAC,SAAS,CAAC;EACrC;IAAA,IAAAG,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GACmB,MAAMJ,EAAA,EAAQ,CAAC,MAAMC,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC;IAAAI,QAAA,CAAAH,IAAA,QAClDD,IAAI,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAC,IAAA;EAAA;AAGhB,CAAC;AAAAI,gBAAA","names":["$0","$1","said","_el$","_tmpl$","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["on-mount.test.tsx"]}',
          imports: [
            {
              from: "solid-js/web",
              range: [0, 54],
              bindings: [{ name: "template", local: "_$template" }],
            },
            {
              from: "solid-js/web",
              range: [55, 121],
              bindings: [{ name: "delegateEvents", local: "_$delegateEvents" }],
            },
            {
              from: "solid-js/web",
              range: [122, 172],
              bindings: [{ name: "insert", local: "_$insert" }],
            },
          ],
          exportAt: 223,
        },
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
