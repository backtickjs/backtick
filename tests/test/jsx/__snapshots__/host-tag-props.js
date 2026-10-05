import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "irncup0pbj6d:9:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_4.insert)(_el$, () => props.icon, null);\n    (0, web_4.insert)(_el$, () => props.label, null);\n    (0, web_3.effect)(_p$ => {\n        var _v$ = props["data-id"], _v$2 = props.disabled ? "off" : "on";\n        _v$ !== _p$.e && (0, web_2.setAttribute)(_el$, "data-id", _p$.e = _v$);\n        _v$2 !== _p$.t && (0, web_2.setAttribute)(_el$, "title", _p$.t = _v$2);\n        return _p$;\n    }, {\n        e: undefined,\n        t: undefined\n    });\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAQiB,MAACA,KAKjB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAEID,KAAK,CAACI,IAAW;IAAAD,gBAAA,EAAAF,IAAA,QACjBD,KAAK,CAACK,KAAK;IAAAC,gBAAA,EAAAC,GAAA;QAAA,IAAAC,GAAA,GAFCR,KAAK,CAAC,SAAS,CAAC,EAAAS,IAAA,GAAST,KAAK,CAACU,QAAQ,GAAG,KAAK,GAAG,IAAI;QAAAF,GAAA,KAAAD,GAAA,CAAAI,CAAA,IAAAC,sBAAA,EAAAX,IAAA,aAAAM,GAAA,CAAAI,CAAA,GAAAH,GAAA;QAAAC,IAAA,KAAAF,GAAA,CAAAM,CAAA,IAAAD,sBAAA,EAAAX,IAAA,WAAAM,GAAA,CAAAM,CAAA,GAAAJ,IAAA;QAAA,OAAAF,GAAA;IAAA;QAAAI,CAAA,EAAAG,SAAA;QAAAD,CAAA,EAAAC;KAAA;IAAA,OAAAb,IAAA;AAAA,IAItE","names":["props","_el$","_tmpl$","_$insert","icon","label","_$effect","_p$","_v$","_v$2","disabled","e","_$setAttribute","t","undefined"],"ignoreList":[],"sources":["jsx/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module1 = {
  id: "irncup0pbj6d:25:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>!`);\nexports.default = $splice0 => {\n    const rest = {\n        label: "spread"\n    };\n    return ($Badge => (0, web_2.createComponent)($Badge, (0, web_3.mergeProps)(rest, {\n        disabled: true,\n        "data-id": "seven",\n        icon: _tmpl$()\n    })))($splice0());\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAwBiBA,QAAA;IACP,MAAMC,IAAI,GAAG;QAAEC,KAAK,EAAE;KAAU;IAChC,OAAO,CAAAC,MAAA,IAAAC,yBAAA,EAACD,MAAM,EAAAE,oBAAA,EAAKJ,IAAI;QAAEK,QAAQ;QAAA;QAAiBC,IAAI,EAAAC,MAAA;KAAA,EAAY,EAA1DR,QAAA,EAAM,CAAoD;AACpE,CAAC","names":["$splice0","rest","label","$Badge","_$createComponent","_$mergeProps","disabled","icon","_tmpl$"],"ignoreList":[],"sources":["jsx/host-tag-props.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
// A client component the host holds, written as a tag in a script, given its
// props in every form JSX writes them: spread, valueless, dashed, an element.
const Badge = cs.create($module0, []);
describe("a host tag's props", () => {
  it("arrive spread, valueless, dashed and as an element", async () => {
    render(await evaluate(() => cs.create($module1, [Badge])));
    const badge = screen.getByText("spread");
    assert.equal(badge.getAttribute("data-id"), "seven");
    assert.equal(badge.getAttribute("title"), "off");
    assert.equal(badge.querySelector("b")?.textContent, "!");
  });
});
