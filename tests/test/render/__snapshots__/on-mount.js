import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
// What the page held each time a script logged, read through the console
// `onMount` reaches from a script.
async function logged(draw) {
  const seen = [];
  const log = globalThis.window.console.log;
  globalThis.window.console.log = () => {
    seen.push(document.body.textContent ?? "");
  };
  try {
    await draw();
  } finally {
    globalThis.window.console.log = log;
  }
  return seen;
}
describe("onMount", () => {
  it("runs once, after the drawing is in the page", async () => {
    const drawing = await evaluate(
      cs.create(
        "2tbiziisbylfu:28:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: onMount, bindings: [] },
          ],
        },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = ($splice0, $splice1) => () => {\n    const count = $splice0()(0);\n    $splice1()(() => {\n        window.console.log();\n        count[1](count[0]() + 1);\n    });\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, () => "mounted " + count[0]());\n        return _el$;\n    })();\n};\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA2BS,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,KAAK,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC9BC,QAAA,EAAQ,CAAC;QACPE,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpBH,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAC1B,CAAC,CAAC;IACF;QAAA,IAAAI,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAAW,UAAU,GAAGJ,KAAK,CAAC,CAAC,CAAC,EAAE;QAAA,OAAAI,IAAA;IAAA;AACpC,CAAC","names":["$splice0","$splice1","count","window","console","log","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["render/on-mount.test.tsx"]}',
        ["solid-js/web"],
      ),
    );
    const seen = await logged(async () => render(drawing));
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });
  it("runs at once when called from a handler", async () => {
    render(
      await evaluate(
        cs.create(
          "2tbiziisbylfu:45:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: onMount, bindings: [] },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = ($splice0, $splice1) => () => {\n    const said = $splice0()("not yet");\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => $splice1()(() => said[1]("ran"));\n        (0, web_3.insert)(_el$, () => said[0]());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA4CW,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,IAAI,GAAGF,QAAA,EAAa,CAAC,SAAS,CAAC;IACrC;QAAA,IAAAG,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GACmB,MAAMJ,QAAA,EAAQ,CAAC,MAAMC,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC;QAAAI,gBAAA,EAAAH,IAAA,QAClDD,IAAI,CAAC,CAAC,CAAC,EAAE;QAAA,OAAAC,IAAA;IAAA;AAGhB,CAAC","names":["$splice0","$splice1","said","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["render/on-mount.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
