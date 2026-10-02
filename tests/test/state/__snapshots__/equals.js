import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
// Each reader logs when it runs, so a test counts the runs by counting the
// logs, and reads what was logged.
let logged = [];
const log = globalThis.window.console.log;
const press = () => userEvent.click(screen.getByRole("button"));
describe("equals", () => {
  beforeEach(() => {
    logged = [];
    globalThis.window.console.log = (...values) => {
      logged.push(values);
    };
  });
  afterEach(() => {
    globalThis.window.console.log = log;
  });
  it("keeps a memo's readers from updating for an equal value", async () => {
    render(
      await evaluate(
        cs.create(
          "3aktzbm6olhr4:30:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: createMemo, bindings: [] },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>add</button><p>`);\nexports.default = ($splice0, $splice1) => () => {\n    const n = $splice0()(1);\n    const size = $splice1()(() => ({\n        isBig: n[0]() > 2,\n        n: n[0]()\n    }), undefined, {\n        equals: (previous, next) => previous.isBig === next.isBig\n    });\n    const label = () => {\n        window.console.log();\n        return size().isBig ? "big" : "small";\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => n[1](n[0]() + 1);\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA6BW,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1B,MAAMG,IAAI,GAAGF,QAAA,EAAW,CACtB,OAAO;QAAEG,KAAK,EAAEF,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;QAAEA,CAAC,EAAEA,CAAC,CAAC,CAAC,CAAC;KAAI,CAAC,EACxCG,SAAS,EACT;QAAEC,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI,KAAKD,QAAQ,CAACH,KAAK,KAAKI,IAAI,CAACJ;KAAO,CAC9D;IACD,MAAMK,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAOT,IAAI,EAAE,CAACC,KAAK,GAAG,KAAK,GAAG,OAAO;IACvC,CAAC;IACD;QAAA,IAAAS,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMjB,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAAkB,gBAAA,EAAAH,KAAA,EACnCR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","$splice1","n","size","isBig","undefined","equals","previous","next","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    assert.equal(logged.length, 1);
    // A new object, but `isBig` is still false.
    await press();
    assert.equal(logged.length, 1);
    await press();
    assert.equal(logged.length, 2);
    assert.ok(screen.getByText("big"));
  });
  it("keeps a signal's readers from updating for an equal value", async () => {
    render(
      await evaluate(
        cs.create(
          "3aktzbm6olhr4:64:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>same</button><p>`);\nexports.default = $splice0 => () => {\n    const point = $splice0()({\n        x: 1\n    }, {\n        equals: (previous, next) => previous.x === next.x\n    });\n    const label = () => {\n        window.console.log();\n        return "x " + point[0]().x;\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => point[1]({\n            x: point[0]().x\n        });\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA+DWA,QAAA;IACD,MAAMC,KAAK,GAAGD,QAAA,EAAa,CACzB;QAAEE,CAAC,EAAE;KAAG,EACR;QAAEC,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI,KAAKD,QAAQ,CAACF,CAAC,KAAKG,IAAI,CAACH;KAAG,CACtD;IACD,MAAMI,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAO,IAAI,GAAGR,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC,CAAC;IAC5B,CAAC;IACD;QAAA,IAAAQ,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMf,KAAK,CAAC,CAAC,CAAC,CAAC;YAAEC,CAAC,EAAED,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC;SAAG,CAAC;QAAAe,gBAAA,EAAAH,KAAA,EAGhDR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","point","x","equals","previous","next","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is handed the previous and the next value", async () => {
    render(
      await evaluate(
        cs.create(
          "3aktzbm6olhr4:91:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = $splice0 => () => {\n    const n = $splice0()(1, {\n        equals: (previous, next) => {\n            window.console.log(previous, next);\n            return previous === next;\n        }\n    });\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => n[1](2);\n        (0, web_3.insert)(_el$, () => "n " + n[0]());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA0FWA,QAAA;IACD,MAAMC,CAAC,GAAGD,QAAA,EAAa,CAAC,CAAC,EAAE;QACzBE,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI;YACrBC,MAAM,CAACC,OAAO,CAACC,GAAG,CAACJ,QAAQ,EAAEC,IAAI,CAAC;YAClC,OAAOD,QAAQ,KAAKC,IAAI;QAC1B;KACD,CAAC;IACF;QAAA,IAAAI,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAAwB,MAAMT,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;QAAAU,gBAAA,EAAAH,IAAA,QAAG,IAAI,GAAGP,CAAC,CAAC,CAAC,CAAC,EAAE;QAAA,OAAAO,IAAA;IAAA;AACvD,CAAC","names":["$splice0","n","equals","previous","next","window","console","log","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });
  it("is `===` when left out, so the same number doesn't update", async () => {
    render(
      await evaluate(
        cs.create(
          "3aktzbm6olhr4:110:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>same</button><p>`);\nexports.default = $splice0 => () => {\n    const n = $splice0()(1);\n    const label = () => {\n        window.console.log();\n        return "n " + n[0]();\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => n[1](1);\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA6GWA,QAAA;IACD,MAAMC,CAAC,GAAGD,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1B,MAAME,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAO,IAAI,GAAGJ,CAAC,CAAC,CAAC,CAAC,EAAE;IACtB,CAAC;IACD;QAAA,IAAAK,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMX,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;QAAAY,gBAAA,EAAAH,KAAA,EAC1BR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","n","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is `===` when left out, so a new object always updates", async () => {
    render(
      await evaluate(
        cs.create(
          "3aktzbm6olhr4:132:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>same</button><p>`);\nexports.default = $splice0 => () => {\n    const point = $splice0()({\n        x: 1\n    });\n    const label = () => {\n        window.console.log();\n        return "x " + point[0]().x;\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => point[1]({\n            x: point[0]().x\n        });\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAmIWA,QAAA;IACD,MAAMC,KAAK,GAAGD,QAAA,EAAa,CAAC;QAAEE,CAAC,EAAE;KAAG,CAAC;IACrC,MAAMC,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAO,IAAI,GAAGL,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC,CAAC;IAC5B,CAAC;IACD;QAAA,IAAAK,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMZ,KAAK,CAAC,CAAC,CAAC,CAAC;YAAEC,CAAC,EAAED,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC;SAAG,CAAC;QAAAY,gBAAA,EAAAH,KAAA,EAGhDR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","point","x","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
