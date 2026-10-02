import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    render(
      await evaluate(
        cs.create(
          "1sxg4zo9g3mkf:14:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><input aria-label=name><button>edit`);\nexports.default = $splice0 => () => {\n    const field = $splice0()(null);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        (0, web_3.use)(element => field[1](element), _el$2);\n        _el$3.$$click = () => field[0]()?.focus();\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAaWA,QAAA;IACD,MAAMC,KAAK,GAAGD,QAAA,EAAa,CAA0B,IAAI,CAAC;IAC1D;QAAA,IAAAE,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAC,aAAA,EAEmCC,OAAO,IAAKR,KAAK,CAAC,CAAC,CAAC,CAACQ,OAAO,CAAC,EAAAL,KAAA;QAAAE,KAAA,CAAAI,OAAA,GAC3C,MAAMT,KAAK,CAAC,CAAC,CAAC,EAAE,EAAEU,KAAK,EAAE;QAAA,OAAAT,IAAA;IAAA;AAGhD,CAAC","names":["$splice0","field","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$use","element","$$click","focus"],"ignoreList":[],"sources":["render/ref.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("focuses once in place, through onMount", async () => {
    render(
      await evaluate(
        cs.create(
          "1sxg4zo9g3mkf:32:8",
          { params: [{ kind: "splice", value: onMount, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<input aria-label=name>`);\nexports.default = $splice0 => () => {\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.use)(element => $splice0()(() => element.focus()), _el$);\n        return _el$;\n    })();\n};\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA+BWA,QAAA;IACD;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,aAAA,EAGUC,OAAO,IAAKJ,QAAA,EAAQ,CAAC,MAAMI,OAAO,CAACC,KAAK,EAAE,CAAC,EAAAJ,IAAA;QAAA,OAAAA,IAAA;IAAA;AAGvD,CAAC","names":["$splice0","_el$","_tmpl$","_$use","element","focus"],"ignoreList":[],"sources":["render/ref.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("is not written as an attribute", async () => {
    render(
      await evaluate(
        cs.create(
          "1sxg4zo9g3mkf:47:21",
          { params: [] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<input aria-label=name>`);\nexports.default = () => () => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.use)(() => { }, _el$);\n    return _el$;\n})();\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA8CwB;IAAA,IAAAA,IAAA,GAAAC,MAAA;IAAAC,aAAA,EAAoC,QAAO,CAAC,EAAAF,IAAA;IAAA,OAAAA,IAAA;AAAA,IAAI","names":["_el$","_tmpl$","_$use"],"ignoreList":[],"sources":["render/ref.test.tsx"]}',
          ["solid-js/web"],
        ),
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
      render(
        await evaluate(
          cs.create(
            "1sxg4zo9g3mkf:71:10",
            { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
            '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<p>shown`);\nexports.default = $splice0 => () => {\n    const shown = $splice0()(true);\n    const n = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        _el$2.$$click = () => n[1](n[0]() + 1);\n        (0, web_5.insert)(_el$2, () => "n " + n[0]());\n        (0, web_5.insert)(_el$, (() => {\n            var _c$ = (0, web_4.memo)(() => !!shown[0]());\n            return () => _c$() ? (() => {\n                var _el$3 = _tmpl$2();\n                (0, web_3.use)(() => window.console.log(n[0]()), _el$3);\n                return _el$3;\n            })() : null;\n        })(), null);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
            '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAsEaA,QAAA;IACD,MAAMC,KAAK,GAAGD,QAAA,EAAa,CAAC,IAAI,CAAC;IACjC,MAAME,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1B;QAAA,IAAAG,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAD,KAAA,CAAAE,OAAA,GAEqB,MAAML,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAAM,gBAAA,EAAAH,KAAA,QACpC,IAAI,GAAGH,CAAC,CAAC,CAAC,CAAC,EAAE;QAAAM,gBAAA,EAAAL,IAAA;YAAA,IAAAM,GAAA,GAAAC,cAAA,UAEfT,KAAK,CAAC,CAAC,CAAC,EAAE;YAAA,aAAVQ,GAAA;gBAAA,IAAAE,KAAA,GAAAC,OAAA;gBAAAC,aAAA,EACS,MAAMC,MAAM,CAACC,OAAO,CAACC,GAAG,CAACd,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAAS,KAAA;gBAAA,OAAAA,KAAA;YAAA,OACtC,IAAI;QAAA;QAAA,OAAAR,IAAA;IAAA;AAGd,CAAC","names":["$splice0","shown","n","_el$","_tmpl$","_el$2","firstChild","$$click","_$insert","_c$","_$memo","_el$3","_tmpl$2","_$use","window","console","log"],"ignoreList":[],"sources":["render/ref.test.tsx"]}',
            ["solid-js/web"],
          ),
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
