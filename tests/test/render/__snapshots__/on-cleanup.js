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
      await evaluate(
        cs.create(
          "21q0kwf707rdb:35:8",
          { params: [{ kind: "splice", value: onCleanup, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>drawn`);\nexports.default = $splice0 => () => {\n    $splice0()(() => window.console.log());\n    return _tmpl$();\n};\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;kBAkCWA,QAAA;IACDA,QAAA,EAAU,CAAC,MAAMC,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE,CAAC;IACtC,OAAAC,MAAA;AACF,CAAC","names":["$splice0","window","console","log","_tmpl$"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });
  it("runs before a memo calculates again", async () => {
    render(
      await evaluate(
        cs.create(
          "21q0kwf707rdb:49:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: createMemo, bindings: [] },
              { kind: "splice", value: onCleanup, bindings: [] },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = ($splice0, $splice1, $splice2) => () => {\n    const n = $splice0()(1);\n    const doubled = $splice1()(() => {\n        $splice2()(() => window.console.log());\n        return n[0]() * 2;\n    });\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => n[1](n[0]() + 1);\n        (0, web_3.insert)(_el$, doubled);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAgDW,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACD,MAAMC,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1B,MAAMI,OAAO,GAAGH,QAAA,EAAW,CAAC;QAC1BC,QAAA,EAAU,CAAC,MAAMG,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE,CAAC;QACtC,OAAOJ,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;IACnB,CAAC,CAAC;IACF;QAAA,IAAAK,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAAwB,MAAMP,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAAQ,gBAAA,EAAAH,IAAA,EAAGJ,OAAO;QAAA,OAAAI,IAAA;IAAA;AAC1D,CAAC","names":["$splice0","$splice1","$splice2","n","doubled","window","console","log","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
          ["solid-js/web"],
        ),
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
      await evaluate(
        cs.create(
          "21q0kwf707rdb:83:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: onMount, bindings: [] },
              { kind: "splice", value: onCleanup, bindings: [] },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>ticking`);\nexports.default = ($splice0, $splice1, $splice2) => () => {\n    const timer = $splice0()(0);\n    $splice1()(() => {\n        timer[1](window.setInterval(() => window.console.log(), 5));\n    });\n    $splice2()(() => window.clearInterval(timer[0]()));\n    return _tmpl$();\n};\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;kBAkFW,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACD,MAAMC,KAAK,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC9BC,QAAA,EAAQ,CAAC;QACPE,KAAK,CAAC,CAAC,CAAC,CAACC,MAAM,CAACC,WAAW,CAAC,MAAMD,MAAM,CAACE,OAAO,CAACC,GAAG,EAAE,EAAE,CAAC,CAAC,CAAC;IAC7D,CAAC,CAAC;IACFL,QAAA,EAAU,CAAC,MAAME,MAAM,CAACI,aAAa,CAACL,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC;IAClD,OAAAM,MAAA;AACF,CAAC","names":["$splice0","$splice1","$splice2","timer","window","setInterval","console","log","clearInterval","_tmpl$"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
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
      await evaluate(
        cs.create(
          "21q0kwf707rdb:105:8",
          { params: [{ kind: "splice", value: onCleanup, bindings: [] }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>press`);\nexports.default = $splice0 => () => {\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => $splice0()(() => window.console.log());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAwGWA,QAAA;IACD;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GACmB,MAAMH,QAAA,EAAU,CAAC,MAAMI,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE,CAAC;QAAA,OAAAL,IAAA;IAAA;AAIjE,CAAC","names":["$splice0","_el$","_tmpl$","$$click","window","console","log"],"ignoreList":[],"sources":["render/on-cleanup.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
