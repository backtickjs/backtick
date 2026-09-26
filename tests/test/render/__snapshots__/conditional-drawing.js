import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";
// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
// A component whose whole drawing is a conditional on a signal of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a signal that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this case does not stop.
async function Held({ again }) {
  return cs.create(
    "als5zy3k1l8g:32:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: window, bindings: [] },
        { kind: "splice", value: again, bindings: [] },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { memo as _$memo } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<em>shown`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<i>waiting`);\nexport default ($0, $1, $2) => {\n  const shown = $0()(false);\n  const started = $1().setTimeout(() => {\n    if ($2()()) {\n      shown[1](true);\n    }\n  }, 0);\n  return _$memo(() => _$memo(() => !!shown[0]())() ? _tmpl$() : _tmpl$2());\n};',
      map: '{"version":3,"mappings":";;;;eA+BY,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACR,MAAMC,KAAK,GAAGH,EAAA,EAAa,CAAC,KAAK,CAAC;EAElC,MAAMI,OAAO,GAAGH,EAAA,EAAO,CAACI,UAAU,CAAC,MAAK;IACtC,IAAIH,EAAA,EAAM,EAAE,EAAE;MACZC,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC;IAChB;EACF,CAAC,EAAE,CAAC,CAAC;EAEL,OAAAG,MAAA,OAAUA,MAAA,SAAAH,KAAK,CAAC,CAAC,CAAC,EAAE,MAAAI,MAAA,KAAAC,OAAA,EAAkC;AACxD,CAAC","names":["$0","$1","$2","shown","started","setTimeout","_$memo","_tmpl$","_tmpl$2"],"ignoreList":[],"sources":["conditional-drawing.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
        {
          from: "solid-js/web",
          range: [55, 101],
          bindings: [{ name: "memo", local: "_$memo" }],
        },
      ],
      exportAt: 204,
    },
  );
}
const conditionalDrawing = cs.create(
  "als5zy3k1l8g:45:27",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: Held },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span></span><section>`);\nexport default ($0, $1) => {\n  const builds = $0()(0);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _$insert(_el$2, () => "builds " + builds[0]());\n    _$insert(_el$3, _$createComponent($1, {\n      again: () => {\n        builds[1](builds[0]() + 1);\n        return builds[0]() < 5;\n      }\n    }));\n    return _el$;\n  })();\n};',
    map: '{"version":3,"mappings":";;;;eA4C8B,CAAAA,EAAA,EAAAC,EAAA;EAC5B,MAAMC,MAAM,GAAGF,EAAA,EAAa,CAAC,CAAC,CAAC;EAE/B;IAAA,IAAAG,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAC,QAAA,CAAAJ,KAAA,QAEW,SAAS,GAAGH,MAAM,CAAC,CAAC,CAAC,EAAE;IAAAO,QAAA,CAAAF,KAAA,EAAAG,iBAAA,CAE3BT,EAAI;MACHU,KAAK,EAAEA,CAAA,KAAK;QACVT,MAAM,CAAC,CAAC,CAAC,CAACA,MAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAC1B,OAAOA,MAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;MACxB;IAAC;IAAA,OAAAC,IAAA;EAAA;AAKX,CAAC","names":["$0","$1","builds","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$insert","_$createComponent","again"],"ignoreList":[],"sources":["conditional-drawing.test.tsx"]}',
    imports: [
      {
        from: "solid-js/web",
        range: [0, 54],
        bindings: [{ name: "template", local: "_$template" }],
      },
      {
        from: "solid-js/web",
        range: [55, 123],
        bindings: [{ name: "createComponent", local: "_$createComponent" }],
      },
      {
        from: "solid-js/web",
        range: [124, 174],
        bindings: [{ name: "insert", local: "_$insert" }],
      },
    ],
    exportAt: 244,
  },
);
describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    await render(conditionalDrawing);
    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.ok(screen.getByText("builds 0"));
    assert.ok(screen.getByText("waiting"));
    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(
      screen.queryByText("builds 1"),
      "the component was built again for what it drew",
    );
    assert.ok(
      screen.queryByText("shown"),
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(screen.queryByText("waiting"), null);
  });
});
describe("what each case compiles and bundles to", () => {
  it("conditionalDrawing", async (t) => {
    await snapshotCase(t, "conditionalDrawing", conditionalDrawing);
  });
});
