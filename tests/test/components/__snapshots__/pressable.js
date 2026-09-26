import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.create(
    "3sdwassvq0mne:16:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { memo as _$memo } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<button id=row style=display:flex;gap:8px><span style=font-weight:700></span><span>`);\nexport default $0 => {\n  const count = $0()(0);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$.$$click = () => count[1](count[0]() + 1);\n    _$insert(_el$2, () => count[0]() > 0 ? "\u2611" : "\u2610");\n    _$insert(_el$3, () => "pressed " + count[0]() + " times");\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;eAeYA,EAAA;EACR,MAAMC,KAAK,GAAGD,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9B;IAAA,IAAAE,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAL,IAAA,CAAAM,OAAA,GAIa,MAAMP,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAAQ,QAAA,CAAAL,KAAA,QAEPH,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,GAAG,GAAG,GAAG,GAAG;IAAAQ,QAAA,CAAAH,KAAA,QACnD,UAAU,GAAGL,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,QAAQ;IAAA,OAAAC,IAAA;EAAA;AAG/C,CAAC;AAAAQ,gBAAA","names":["$0","count","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["pressable.test.tsx"]}',
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
        {
          from: "solid-js/web",
          range: [173, 219],
          bindings: [{ name: "memo", local: "_$memo" }],
        },
      ],
      exportAt: 345,
    },
  );
}
describe("screen", () => {
  it("increments the counter", async () => {
    await render(_jsx(Row, {}));
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });
  it("reads a fresh page in each test", async () => {
    await render(_jsx(Row, {}));
    assert.ok(screen.getByText("pressed 0 times"));
  });
});
describe("what each case compiles and bundles to", () => {
  it("Row", async (t) => {
    await snapshotCase(t, "Row", _jsx(Row, {}));
  });
});
