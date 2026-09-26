import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A signal a script declares, and a button that writes it.
async function Counter() {
  return cs.create(
    "7znh0cmscuqg:11:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>Add</button><p>`);\nexport default $0 => {\n  const count = $0()(0);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => count[1](count[0]() + 1);\n    _$insert(_el$3, () => "Count: " + count[0]());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;eAUYA,EAAA;EACR,MAAMC,KAAK,GAAGD,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9B;IAAA,IAAAE,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMP,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAAQ,QAAA,CAAAH,KAAA,QAC3C,SAAS,GAAGL,KAAK,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAC,IAAA;EAAA;AAGhC,CAAC;AAAAQ,gBAAA","names":["$0","count","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["counter.test.tsx"]}',
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
      exportAt: 243,
    },
  );
}
describe("a counter", () => {
  it("Counter", async (t) => {
    await snapshotCase(t, "Counter", _jsx(Counter, {}));
  });
  it("increments on a click", async () => {
    await render(_jsx(Counter, {}));
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    assert.ok(screen.getByText("Count: 1"));
  });
});
