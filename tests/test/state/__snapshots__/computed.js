import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
// Each script logs where it runs, so a test counts the runs by counting the
// logs.
let runs = 0;
const log = globalThis.window.console.log;
describe("computed", () => {
  beforeEach(() => {
    runs = 0;
    globalThis.window.console.log = () => {
      runs = runs + 1;
    };
  });
  afterEach(() => {
    globalThis.window.console.log = log;
  });
  it("runs once per change, however many read it", async () => {
    render(
      await evaluate(
        cs.create(
          "2rqhlsvronqlo:28:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: createMemo, bindings: [] },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>add</button><p></p><p></p><p>`);\nexports.default = ($splice0, $splice1) => () => {\n    const n = $splice0()(1);\n    const doubled = $splice1()(() => {\n        window.console.log();\n        return n[0]() * 2;\n    });\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling;\n        _el$2.$$click = () => n[1](n[0]() + 1);\n        (0, web_3.insert)(_el$3, () => "a " + doubled());\n        (0, web_3.insert)(_el$4, () => "b " + doubled());\n        (0, web_3.insert)(_el$5, () => "c " + doubled());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA2BW,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1B,MAAMG,OAAO,GAAGF,QAAA,EAAW,CAAC;QAC1BG,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAOJ,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;IACnB,CAAC,CAAC;IACF;QAAA,IAAAK,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA,EAAAE,KAAA,GAAAD,KAAA,CAAAD,WAAA;QAAAH,KAAA,CAAAM,OAAA,GAEqB,MAAMb,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAAc,gBAAA,EAAAL,KAAA,QACnC,IAAI,GAAGR,OAAO,EAAE;QAAAa,gBAAA,EAAAH,KAAA,QAChB,IAAI,GAAGV,OAAO,EAAE;QAAAa,gBAAA,EAAAF,KAAA,QAChB,IAAI,GAAGX,OAAO,EAAE;QAAA,OAAAI,IAAA;IAAA;AAG1B,CAAC","names":["$splice0","$splice1","n","doubled","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","_el$5","$$click","_$insert"],"ignoreList":[],"sources":["state/computed.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    assert.equal(runs, 1);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("a 4"));
    assert.ok(screen.getByText("c 4"));
  });
  it("passes a change on only when its value changes", async () => {
    render(
      await evaluate(
        cs.create(
          "2rqhlsvronqlo:56:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: createMemo, bindings: [] },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>add</button><p>`);\nexports.default = ($splice0, $splice1) => () => {\n    const n = $splice0()(1);\n    const isBig = $splice1()(() => n[0]() > 2);\n    const label = () => {\n        window.console.log();\n        return isBig() ? "big" : "small";\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => n[1](n[0]() + 1);\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAuDW,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1B,MAAMG,KAAK,GAAGF,QAAA,EAAW,CAAC,MAAMC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAC3C,MAAME,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAOJ,KAAK,EAAE,GAAG,KAAK,GAAG,OAAO;IAClC,CAAC;IACD;QAAA,IAAAK,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMZ,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAAa,gBAAA,EAAAH,KAAA,EACnCR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","$splice1","n","isBig","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/computed.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    assert.equal(runs, 1);
    // 1 to 2: still small, so the reader doesn't run.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    // 2 to 3: big now.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("big"));
  });
});
