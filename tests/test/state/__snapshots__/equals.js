import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "39ydzywohgsvn:30:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>add</button><p>`);\nexports.default = ($splice0, $splice1) => () => {\n    const [n, setN] = $splice0()(1);\n    const size = $splice1()(() => ({\n        isBig: n() > 2,\n        n: n()\n    }), undefined, {\n        equals: (previous, next) => previous.isBig === next.isBig\n    });\n    const label = () => {\n        window.console.log();\n        return size().isBig ? "big" : "small";\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => setN(n() + 1);\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA6BW,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAClC,MAAMI,IAAI,GAAGH,QAAA,EAAW,CACtB,OAAO;QAAEI,KAAK,EAAEH,CAAC,EAAE,GAAG,CAAC;QAAEA,CAAC,EAAEA,CAAC;KAAI,CAAC,EAClCI,SAAS,EACT;QAAEC,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI,KAAKD,QAAQ,CAACH,KAAK,KAAKI,IAAI,CAACJ;KAAO,CAC9D;IACD,MAAMK,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAOT,IAAI,EAAE,CAACC,KAAK,GAAG,KAAK,GAAG,OAAO;IACvC,CAAC;IACD;QAAA,IAAAS,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMjB,IAAI,CAACD,CAAC,EAAE,GAAG,CAAC,CAAC;QAAAmB,gBAAA,EAAAH,KAAA,EAChCR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","$splice1","n","setN","size","isBig","undefined","equals","previous","next","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "39ydzywohgsvn:64:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>same</button><p>`);\nexports.default = $splice0 => () => {\n    const [point, setPoint] = $splice0()({\n        x: 1\n    }, {\n        equals: (previous, next) => previous.x === next.x\n    });\n    const label = () => {\n        window.console.log();\n        return "x " + point().x;\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => setPoint({\n            x: point().x\n        });\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA+DWA,QAAA;IACD,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CACrC;QAAEG,CAAC,EAAE;KAAG,EACR;QAAEC,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI,KAAKD,QAAQ,CAACF,CAAC,KAAKG,IAAI,CAACH;KAAG,CACtD;IACD,MAAMI,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAO,IAAI,GAAGT,KAAK,EAAE,CAACE,CAAC;IACzB,CAAC;IACD;QAAA,IAAAQ,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMf,QAAQ,CAAC;YAAEC,CAAC,EAAEF,KAAK,EAAE,CAACE;SAAG,CAAC;QAAAe,gBAAA,EAAAH,KAAA,EAC7CR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","point","setPoint","x","equals","previous","next","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module2 = {
  id: "39ydzywohgsvn:89:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = $splice0 => () => {\n    const [n, setN] = $splice0()(1, {\n        equals: (previous, next) => {\n            window.console.log(previous, next);\n            return previous === next;\n        }\n    });\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => setN(2);\n        (0, web_3.insert)(_el$, () => "n " + n());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAwFWA,QAAA;IACD,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,EAAE;QACjCG,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI;YACrBC,MAAM,CAACC,OAAO,CAACC,GAAG,CAACJ,QAAQ,EAAEC,IAAI,CAAC;YAClC,OAAOD,QAAQ,KAAKC,IAAI;QAC1B;KACD,CAAC;IACF;QAAA,IAAAI,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAAwB,MAAMT,IAAI,CAAC,CAAC,CAAC;QAAAU,gBAAA,EAAAH,IAAA,QAAG,IAAI,GAAGR,CAAC,EAAE;QAAA,OAAAQ,IAAA;IAAA;AACpD,CAAC","names":["$splice0","n","setN","equals","previous","next","window","console","log","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module3 = {
  id: "39ydzywohgsvn:108:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>same</button><p>`);\nexports.default = $splice0 => () => {\n    const [n, setN] = $splice0()(1);\n    const label = () => {\n        window.console.log();\n        return "n " + n();\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => setN(1);\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA2GWA,QAAA;IACD,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAClC,MAAMG,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAO,IAAI,GAAGL,CAAC,EAAE;IACnB,CAAC;IACD;QAAA,IAAAM,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMX,IAAI,CAAC,CAAC,CAAC;QAAAY,gBAAA,EAAAH,KAAA,EAC1BR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","n","setN","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module4 = {
  id: "39ydzywohgsvn:130:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>same</button><p>`);\nexports.default = $splice0 => () => {\n    const [point, setPoint] = $splice0()({\n        x: 1\n    });\n    const label = () => {\n        window.console.log();\n        return "x " + point().x;\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => setPoint({\n            x: point().x\n        });\n        (0, web_3.insert)(_el$3, label);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAiIWA,QAAA;IACD,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC;QAAEG,CAAC,EAAE;KAAG,CAAC;IACjD,MAAMC,KAAK,GAAGA,GAAA;QACZC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpB,OAAO,IAAI,GAAGN,KAAK,EAAE,CAACE,CAAC;IACzB,CAAC;IACD;QAAA,IAAAK,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMZ,QAAQ,CAAC;YAAEC,CAAC,EAAEF,KAAK,EAAE,CAACE;SAAG,CAAC;QAAAY,gBAAA,EAAAH,KAAA,EAC7CR,KAAK;QAAA,OAAAI,IAAA;IAAA;AAGf,CAAC","names":["$splice0","point","setPoint","x","label","window","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert"],"ignoreList":[],"sources":["state/equals.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
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
        cs.create($module0, [
          { kind: "splice", value: createSignal, bindings: [] },
          { kind: "splice", value: createMemo, bindings: [] },
        ]),
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
        cs.create($module1, [
          { kind: "splice", value: createSignal, bindings: [] },
        ]),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is handed the previous and the next value", async () => {
    render(
      await evaluate(
        cs.create($module2, [
          { kind: "splice", value: createSignal, bindings: [] },
        ]),
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });
  it("is `===` when left out, so the same number doesn't update", async () => {
    render(
      await evaluate(
        cs.create($module3, [
          { kind: "splice", value: createSignal, bindings: [] },
        ]),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is `===` when left out, so a new object always updates", async () => {
    render(
      await evaluate(
        cs.create($module4, [
          { kind: "splice", value: createSignal, bindings: [] },
        ]),
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
