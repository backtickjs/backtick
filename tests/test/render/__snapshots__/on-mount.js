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
        "i0wfqcpgxkdo:28:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: onMount, bindings: [] },
          ],
        },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = ($splice0, $splice1) => () => {\n    const [count, setCount] = $splice0()(0);\n    $splice1()(() => {\n        window.console.log();\n        setCount(count() + 1);\n    });\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, () => "mounted " + count());\n        return _el$;\n    })();\n};\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA2BS,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1CC,QAAA,EAAQ,CAAC;QACPG,MAAM,CAACC,OAAO,CAACC,GAAG,EAAE;QACpBH,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;IACvB,CAAC,CAAC;IACF;QAAA,IAAAK,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAAW,UAAU,GAAGL,KAAK,EAAE;QAAA,OAAAK,IAAA;IAAA;AACjC,CAAC","names":["$splice0","$splice1","count","setCount","window","console","log","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["render/on-mount.test.tsx"]}',
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
          "i0wfqcpgxkdo:45:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: onMount, bindings: [] },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = ($splice0, $splice1) => () => {\n    const [said, setSaid] = $splice0()("not yet");\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => $splice1()(() => setSaid("ran"));\n        (0, web_3.insert)(_el$, said);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA4CW,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGH,QAAA,EAAa,CAAC,SAAS,CAAC;IAChD;QAAA,IAAAI,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GACmB,MAAML,QAAA,EAAQ,CAAC,MAAME,OAAO,CAAC,KAAK,CAAC,CAAC;QAAAI,gBAAA,EAAAH,IAAA,EAClDF,IAAI;QAAA,OAAAE,IAAA;IAAA;AAGX,CAAC","names":["$splice0","$splice1","said","setSaid","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["render/on-mount.test.tsx"]}',
          ["solid-js/web"],
        ),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
