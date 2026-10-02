import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
// A client component defined on the host as a script, and used as a tag in
// another: typed by its own signature, and drawn by the client.
const Badge = cs.create(
  "1tbbj72floguq:12:14",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => "badge " + props.n);\n    return _el$;\n})();\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAWiB,MAACA,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAS,QAAQ,GAAGD,KAAK,CAACI,CAAC;IAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","n"],"ignoreList":[],"sources":["components/client-component-tag.test.tsx"]}',
  ["solid-js/web"],
);
const badges = cs.create(
  "1tbbj72floguq:14:15",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: For },
      { kind: "tag", value: Badge },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>double`);\nexports.default = ($splice0, $tag1, $tag2) => {\n    const scale = $splice0()(1);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        (0, web_3.insert)(_el$, (0, web_4.createComponent)($tag1, {\n            each: [1, 2],\n            children: n => (0, web_4.createComponent)($tag2, {\n                get n() {\n                    return n * scale[0]();\n                }\n            })\n        }), _el$2);\n        _el$2.$$click = () => scale[1](scale[0]() * 2);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAakB,CAAAA,QAAA,EAAAC,KAAA,EAAAC,KAAA;IAChB,MAAMC,KAAK,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC9B;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAJ,IAAA,EAAAK,yBAAA,EAEKR,KAAG;YAACS,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC;YAAAC,QAAA,EAAIC,CAAC,IAAAH,yBAAA,EAAMP,KAAK;gBAAA,IAACU,CAACA;oBAAA,OAAEA,CAAC,GAAGT,KAAK,CAAC,CAAC,CAAC,EAAE;gBAAA;aAAA;SAAI,GAAAG,KAAA;QAAAA,KAAA,CAAAO,OAAA,GACtC,MAAMV,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAA,OAAAC,IAAA;IAAA;AAGrD,CAAC","names":["$splice0","$tag1","$tag2","scale","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","each","children","n","$$click"],"ignoreList":[],"sources":["components/client-component-tag.test.tsx"]}',
  ["solid-js/web"],
);
it("clientComponentTag", async (t) => {
  await snapshotCase(t, "clientComponentTag", badges);
});
describe("a client component defined as a script", () => {
  it("is drawn as a tag, with what the script hands it", async () => {
    render(await evaluate(() => badges));
    assert.ok(screen.getByText("badge 1"));
    assert.ok(screen.getByText("badge 2"));
    await userEvent.click(screen.getByText("double"));
    assert.ok(screen.getByText("badge 2"));
    assert.ok(screen.getByText("badge 4"));
  });
});
