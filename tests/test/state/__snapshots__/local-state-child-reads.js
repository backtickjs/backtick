import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
const $module0 = {
  id: "2qf83pi6ieetw:26:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span>marker`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n    (0, web_5.insert)(_el$2, () => "row " + $splice1() + " of " + $splice0()[0]());\n    (0, web_5.insert)(_el$, (() => {\n        var _c$ = (0, web_4.memo)(() => $splice0()[0]() === $splice1());\n        return () => _c$() ? _tmpl$2() : null;\n    })(), null);\n    (0, web_3.effect)(_$p => (0, web_2.style)(_el$2, "font-size: " + ($splice0()[0]() === $splice1() ? 20 : 16) + "px", _$p));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAyBS,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,gBAAA,EAAAF,KAAA,QAEJ,MAAM,GAAGH,QAAA,EAAG,GAAG,MAAM,GAAGD,QAAA,EAAS,CAAC,CAAC,CAAC,EAAE;IAAAM,gBAAA,EAAAJ,IAAA;QAAA,IAAAK,GAAA,GAAAC,cAAA,QAExCR,QAAA,EAAS,CAAC,CAAC,CAAC,EAAE,KAAKC,QAAA,EAAG;QAAA,aAAtBM,GAAA,KAAAE,OAAA,KAA+C,IAAI;IAAA;IAAAC,gBAAA,EAAAC,GAAA,IAAAC,eAAA,EAAAR,KAAA,EAHvC,aAAa,IAAIJ,QAAA,EAAS,CAAC,CAAC,CAAC,EAAE,KAAKC,QAAA,EAAG,GAAG,EAAE,GAAG,EAAE,CAAC,GAAG,IAAI,EAAAU,GAAA;IAAA,OAAAT,IAAA;AAAA,IAIlE","names":["$splice0","$splice1","_el$","_tmpl$","_el$2","firstChild","_$insert","_c$","_$memo","_tmpl$2","_$effect","_$p","_$style"],"ignoreList":[],"sources":["state/local-state-child-reads.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "2qf83pi6ieetw:34:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>select`);\nexports.default = ($splice0, $splice1, $splice2) => {\n    const selected = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        _el$2.$$click = () => selected[1](1);\n        (0, web_3.insert)(_el$, () => $splice1(selected), null);\n        (0, web_3.insert)(_el$, () => $splice2(selected), null);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAiCY,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACR,MAAMC,QAAQ,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IACjC;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAD,KAAA,CAAAE,OAAA,GAEmB,MAAML,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;QAAAM,gBAAA,EAAAL,IAAA,QAClCH,QAAA,CAAAE,QAAA,CAAsD;QAAAM,gBAAA,EAAAL,IAAA,QACtDF,QAAA,CAAAC,QAAA,CAAsD;QAAA,OAAAC,IAAA;IAAA;AAG7D,CAAC","names":["$splice0","$splice1","$splice2","selected","_el$","_tmpl$","_el$2","firstChild","$$click","_$insert"],"ignoreList":[],"sources":["state/local-state-child-reads.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module2 = {
  id: "2qf83pi6ieetw:39:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsC+B,OAAC","names":[],"ignoreList":[],"sources":["state/local-state-child-reads.test.tsx"]}',
  dependencies: [],
};
const $module3 = {
  id: "2qf83pi6ieetw:39:45",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsCgDA,SAAA,IAAAA,SAAQ","names":["$capture0"],"ignoreList":[],"sources":["state/local-state-child-reads.test.tsx"]}',
  dependencies: [],
};
const $module4 = {
  id: "2qf83pi6ieetw:40:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuC+B,OAAC","names":[],"ignoreList":[],"sources":["state/local-state-child-reads.test.tsx"]}',
  dependencies: [],
};
const $module5 = {
  id: "2qf83pi6ieetw:40:45",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuCgDA,SAAA,IAAAA,SAAQ","names":["$capture0"],"ignoreList":[],"sources":["state/local-state-child-reads.test.tsx"]}',
  dependencies: [],
};
// A child reading a signal it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the signal never reads it, so a write reaches each `ReadingRow` with
// the arguments it already had — the same handle object, the same id.
//
// Nothing a row was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale: a handle is one object
// whatever its signal holds. The branch is the half no amount of recomputing a
// prop can answer for.
const ReadingRow = async ({ id, selected }) =>
  cs.create($module0, [
    { kind: "splice", value: selected, bindings: [] },
    { kind: "splice", value: id, bindings: [] },
  ]);
async function ReadingPanel() {
  return cs.create($module1, [
    { kind: "splice", value: createSignal, bindings: [] },
    {
      kind: "splice",
      value: _jsx(ReadingRow, {
        id: cs.create($module2, []),
        selected: cs.create($module3, [
          { kind: "capture", key: "selected$2qf83pi6ieetw$0" },
        ]),
      }),
      bindings: ["selected$2qf83pi6ieetw$0"],
    },
    {
      kind: "splice",
      value: _jsx(ReadingRow, {
        id: cs.create($module4, []),
        selected: cs.create($module5, [
          { kind: "capture", key: "selected$2qf83pi6ieetw$0" },
        ]),
      }),
      bindings: ["selected$2qf83pi6ieetw$0"],
    },
  ]);
}
// What one `ReadingRow` draws, in the three positions it read the signal from: a
// prop, a text child, and a branch.
function readRow(row) {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.firstChild?.nodeValue,
    marked: marker !== undefined,
  };
}
describe("local state", () => {
  it("a child redraws everything it read of a signal it was handed", async () => {
    const view = await drawn(_jsx(ReadingPanel, {}));
    const [button, ...rows] = children(view);
    assert.ok(button !== undefined && rows.length === 2);
    // Nothing either row was given changes across the write — the same handle
    // object and the same id — so every assertion here is one the arguments
    // alone cannot answer. A prop, a text child, and a branch, per row.
    assert.deepEqual(rows.map(readRow), [
      { size: 20, text: "row 0 of 0", marked: true },
      { size: 16, text: "row 1 of 0", marked: false },
    ]);
    await userEvent.click(button);
    assert.deepEqual(rows.map(readRow), [
      { size: 16, text: "row 0 of 1", marked: false },
      { size: 20, text: "row 1 of 1", marked: true },
    ]);
  });
});
it("ReadingPanel", async (t) => {
  await snapshotCase(t, "ReadingPanel", _jsx(ReadingPanel, {}));
});
