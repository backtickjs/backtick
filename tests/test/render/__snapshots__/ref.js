import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    await render(
      cs.create(
        "3o832a07bjdmm:13:6",
        { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { use as _$use } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><input aria-label=name><button>edit`);\nexport default $0 => {\n  const field = $0()(null);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _$use(element => field[1](element), _el$2);\n    _el$3.$$click = () => field[0]()?.focus();\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eAYSA,EAAA;EACD,MAAMC,KAAK,GAAGD,EAAA,EAAa,CAA0B,IAAI,CAAC;EAC1D;IAAA,IAAAE,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAC,KAAA,CAEmCC,OAAO,IAAKR,KAAK,CAAC,CAAC,CAAC,CAACQ,OAAO,CAAC,EAAAL,KAAA;IAAAE,KAAA,CAAAI,OAAA,GAC3C,MAAMT,KAAK,CAAC,CAAC,CAAC,EAAE,EAAEU,KAAK,EAAE;IAAA,OAAAT,IAAA;EAAA;AAGhD,CAAC;AAAAU,gBAAA","names":["$0","field","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$use","element","$$click","focus","_$delegateEvents"],"ignoreList":[],"sources":["ref.test.tsx"]}',
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
              range: [122, 166],
              bindings: [{ name: "use", local: "_$use" }],
            },
          ],
          exportAt: 249,
        },
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("focuses once in place, through onMount", async () => {
    await render(
      cs.create(
        "3o832a07bjdmm:29:6",
        { params: [{ kind: "splice", value: onMount, bindings: [] }] },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { use as _$use } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<input aria-label=name>`);\nexport default $0 => {\n  return (() => {\n    var _el$ = _tmpl$();\n    _$use(element => $0()(() => element.focus()), _el$);\n    return _el$;\n  })();\n};',
          map: '{"version":3,"mappings":";;;eA4BSA,EAAA;EACD;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,KAAA,CAGUC,OAAO,IAAKJ,EAAA,EAAQ,CAAC,MAAMI,OAAO,CAACC,KAAK,EAAE,CAAC,EAAAJ,IAAA;IAAA,OAAAA,IAAA;EAAA;AAGvD,CAAC","names":["$0","_el$","_tmpl$","_$use","element","focus"],"ignoreList":[],"sources":["ref.test.tsx"]}',
          imports: [
            {
              from: "solid-js/web",
              range: [0, 54],
              bindings: [{ name: "template", local: "_$template" }],
            },
            {
              from: "solid-js/web",
              range: [55, 99],
              bindings: [{ name: "use", local: "_$use" }],
            },
          ],
          exportAt: 165,
        },
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("is not written as an attribute", async () => {
    await render(
      cs.create(
        "3o832a07bjdmm:42:17",
        { params: [] },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { use as _$use } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<input aria-label=name>`);\nexport default () => (() => {\n  var _el$ = _tmpl$();\n  _$use(() => {}, _el$);\n  return _el$;\n})();',
          map: '{"version":3,"mappings":";;;eAyCoB;EAAA,IAAAA,IAAA,GAAAC,MAAA;EAAAC,KAAA,CAA8B,MAAK,CAAE,CAAC,EAAAF,IAAA;EAAA,OAAAA,IAAA;AAAA,IAAI","names":["_el$","_tmpl$","_$use"],"ignoreList":[],"sources":["ref.test.tsx"]}',
          imports: [
            {
              from: "solid-js/web",
              range: [0, 54],
              bindings: [{ name: "template", local: "_$template" }],
            },
            {
              from: "solid-js/web",
              range: [55, 99],
              bindings: [{ name: "use", local: "_$use" }],
            },
          ],
          exportAt: 165,
        },
      ),
    );
    assert.equal(screen.getByLabelText("name").hasAttribute("ref"), false);
  });
  describe("is called once", () => {
    let calls = 0;
    const log = globalThis.window.console.log;
    beforeEach(() => {
      calls = 0;
      globalThis.window.console.log = () => {
        calls = calls + 1;
      };
    });
    afterEach(() => {
      globalThis.window.console.log = log;
    });
    // Drawn by a conditional, whose computation re-runs whenever it reads
    // something that changes, so a tracked read in `ref` would draw the
    // element again.
    it("even when a signal it read changes", async () => {
      await render(
        cs.create(
          "3o832a07bjdmm:64:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: window, bindings: [] },
            ],
          },
          {
            code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { use as _$use } from "solid-js/web";\nimport { memo as _$memo } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<p>shown`);\nexport default ($0, $1) => {\n  const shown = $0()(true);\n  const n = $0()(0);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _el$2.$$click = () => n[1](n[0]() + 1);\n    _$insert(_el$2, () => "n " + n[0]());\n    _$insert(_el$, (() => {\n      var _c$ = _$memo(() => !!shown[0]());\n      return () => _c$() ? (() => {\n        var _el$3 = _tmpl$2();\n        _$use(() => $1().console.log(n[0]()), _el$3);\n        return _el$3;\n      })() : null;\n    })(), null);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
            map: '{"version":3,"mappings":";;;;;;;eA+DW,CAAAA,EAAA,EAAAC,EAAA;EACD,MAAMC,KAAK,GAAGF,EAAA,EAAa,CAAC,IAAI,CAAC;EACjC,MAAMG,CAAC,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EAC1B;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAD,KAAA,CAAAE,OAAA,GAEqB,MAAML,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAAM,QAAA,CAAAH,KAAA,QACpC,IAAI,GAAGH,CAAC,CAAC,CAAC,CAAC,EAAE;IAAAM,QAAA,CAAAL,IAAA;MAAA,IAAAM,GAAA,GAAAC,MAAA,SAEfT,KAAK,CAAC,CAAC,CAAC,EAAE;MAAA,aAAVQ,GAAA;QAAA,IAAAE,KAAA,GAAAC,OAAA;QAAAC,KAAA,CACS,MAAMb,EAAA,EAAO,CAACc,OAAO,CAACC,GAAG,CAACb,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAAS,KAAA;QAAA,OAAAA,KAAA;MAAA,OACvC,IAAI;IAAA;IAAA,OAAAR,IAAA;EAAA;AAGd,CAAC;AAAAa,gBAAA","names":["$0","$1","shown","n","_el$","_tmpl$","_el$2","firstChild","$$click","_$insert","_c$","_$memo","_el$3","_tmpl$2","_$use","console","log","_$delegateEvents"],"ignoreList":[],"sources":["ref.test.tsx"]}',
            imports: [
              {
                from: "solid-js/web",
                range: [0, 54],
                bindings: [{ name: "template", local: "_$template" }],
              },
              {
                from: "solid-js/web",
                range: [55, 121],
                bindings: [
                  { name: "delegateEvents", local: "_$delegateEvents" },
                ],
              },
              {
                from: "solid-js/web",
                range: [122, 166],
                bindings: [{ name: "use", local: "_$use" }],
              },
              {
                from: "solid-js/web",
                range: [167, 213],
                bindings: [{ name: "memo", local: "_$memo" }],
              },
              {
                from: "solid-js/web",
                range: [214, 264],
                bindings: [{ name: "insert", local: "_$insert" }],
              },
            ],
            exportAt: 369,
          },
        ),
      );
      const shownText = screen.getByText("shown");
      await userEvent.click(screen.getByRole("button"));
      assert.equal(screen.getByRole("button").textContent, "n 1");
      assert.equal(calls, 1);
      assert.equal(screen.getByText("shown"), shownText);
    });
  });
});
