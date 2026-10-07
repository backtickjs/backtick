import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "yzfx7ua2d0v4:35:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>drawn`);\nexports.default = $splice0 => () => {\n    $splice0()(() => window.console.log());\n    return _tmpl$();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAkCWA,QAAA;IACDA,QAAA,EAAU,CAAC,MAAMC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE,CAAC;IACtC,OAAAC,MAAA;AACF,CAAC","names":["$splice0","window","console","log","_tmpl$"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module1 = {
  id: "yzfx7ua2d0v4:49:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = ($splice0, $splice1, $splice2) => () => {\n    const [n, setN] = $splice0()(1);\n    const doubled = $splice1()(() => {\n        $splice2()(() => window.console.log());\n        return n() * 2;\n    });\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => setN(n() + 1);\n        (0, web_3.insert)(_el$, doubled);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAgDW,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACD,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGJ,QAAA,EAAa,CAAC,CAAC,CAAC;IAClC,MAAMK,OAAO,GAAGJ,QAAA,EAAW,CAAC;QAC1BC,QAAA,EAAU,CAAC,MAAMI,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE,CAAC;QACtC,OAAOL,CAAC,EAAE,GAAG,CAAC;IAChB,CAAC,CAAC;IACF;QAAA,IAAAM,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAAwB,MAAMP,IAAI,CAACD,CAAC,EAAE,GAAG,CAAC,CAAC;QAAAS,gBAAA,EAAAH,IAAA,EAAGJ,OAAO;QAAA,OAAAI,IAAA;IAAA;AACvD,CAAC","names":["$splice0","$splice1","$splice2","n","setN","doubled","window","console","log","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "function",
};
const $module2 = {
  id: "yzfx7ua2d0v4:83:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>ticking`);\nexports.default = ($splice0, $splice1, $splice2) => () => {\n    const [timer, setTimer] = $splice0()(0);\n    $splice1()(() => {\n        setTimer(window.setInterval(() => window.console.log(), 5));\n    });\n    $splice2()(() => window.clearInterval(timer()));\n    return _tmpl$();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAkFW,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACD,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGJ,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1CC,QAAA,EAAQ,CAAC;QACPG,QAAQ,CAACC,MAAM,CAACC,WAAW,CAAC,MAAMD,MAAM,CAACE,OAAO,CAACC,GAAG,EAAE,EAAE,CAAC,CAAC,CAAC;IAC7D,CAAC,CAAC;IACFN,QAAA,EAAU,CAAC,MAAMG,MAAM,CAACI,aAAa,CAACN,KAAK,EAAE,CAAC,CAAC;IAC/C,OAAAO,MAAA;AACF,CAAC","names":["$splice0","$splice1","$splice2","timer","setTimer","window","setInterval","console","log","clearInterval","_tmpl$"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "function",
};
const $module3 = {
  id: "yzfx7ua2d0v4:105:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>press`);\nexports.default = $splice0 => () => {\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => $splice0()(() => window.console.log());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAwGWA,QAAA;IACD;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GACmB,MAAMH,QAAA,EAAU,CAAC,MAAMI,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE,CAAC;QAAA,OAAAL,IAAA;IAAA;AAIjE,CAAC","names":["$splice0","_el$","_tmpl$","$$click","window","console","log"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
// Each script logs where it runs, so a test counts the runs by counting the
// logs.
let runs = 0;
const log = globalThis.window.console.log;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
describe("onCleanup", () => {
  beforeEach(() => {
    runs = 0;
    globalThis.window.console.log = () => {
      runs = runs + 1;
    };
  });
  afterEach(() => {
    globalThis.window.console.log = log;
  });
  it("runs when the drawing is removed", async () => {
    const { unmount } = render(
      await evaluate(cs.create($module0, [onCleanup])),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });
  it("runs before a memo calculates again", async () => {
    render(
      await evaluate(
        cs.create($module1, [createSignal, createMemo, onCleanup]),
      ),
    );
    assert.equal(runs, 0);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    assert.equal(screen.getByRole("button").textContent, "4");
  });
  it("stops what onMount started", async (t) => {
    // Every interval the script starts is cleared once the test ends, so a
    // cleanup that never ran fails the test rather than hanging the run.
    const started = [];
    const setInterval = globalThis.window.setInterval;
    t.mock.method(globalThis.window, "setInterval", (handler, timeout) => {
      const id = setInterval(handler, timeout);
      started.push(id);
      return id;
    });
    t.after(() => started.forEach((id) => globalThis.window.clearInterval(id)));
    const { unmount } = render(
      await evaluate(cs.create($module2, [createSignal, onMount, onCleanup])),
    );
    await wait(40);
    assert.ok(runs > 0);
    unmount();
    const stopped = runs;
    await wait(40);
    assert.equal(runs, stopped);
  });
  it("never runs when called from a handler", async () => {
    const { unmount } = render(
      await evaluate(cs.create($module3, [onCleanup])),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
