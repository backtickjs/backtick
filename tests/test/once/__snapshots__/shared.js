import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { createRoot, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2w4of91pb1pz1:13:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(0);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYsBA,QAAA,IAAAA,QAAA,EAAa,CAAC,CAAC,CAAC","names":["$splice0"],"ignoreList":[],"sources":["once/shared.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "2w4of91pb1pz1:15:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $splice0 => () => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => "count " + $splice0()[0]());\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAciBA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAa,QAAQ,GAAGD,QAAA,EAAM,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAC,IAAA;AAAA,IAAQ","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["once/shared.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module2 = {
  id: "2w4of91pb1pz1:16:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>bump`);\nexports.default = ($splice0, $splice1) => () => (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => $splice0()[1]($splice1()[0]() + 1);\n    return _el$;\n})();\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAegB,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GACG,MAAMJ,QAAA,EAAM,CAAC,CAAC,CAAC,CAACC,QAAA,EAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAA,OAAAC,IAAA;AAAA,IAClD","names":["$splice0","$splice1","_el$","_tmpl$","$$click"],"ignoreList":[],"sources":["once/shared.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "function",
};
const $module3 = {
  id: "2w4of91pb1pz1:20:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1, $splice2) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_3.insert)(_el$, () => ($Shown => (0, web_2.createComponent)($Shown, {}))($splice0()), null);\n    (0, web_3.insert)(_el$, () => ($Shown => (0, web_2.createComponent)($Shown, {}))($splice1()), null);\n    (0, web_3.insert)(_el$, () => ($Bump => (0, web_2.createComponent)($Bump, {}))($splice2()), null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAmBkB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAEd,CAAAG,MAAA,IAAAC,yBAAA,EAACD,MAAM,KAAG,EAATN,QAAA,EAAM,CACP;IAAAK,gBAAA,EAAAF,IAAA,SAAAG,MAAA,IAAAC,yBAAA,EAACD,MAAM,KAAG,EAATL,QAAA,EAAM,CACP;IAAAI,gBAAA,EAAAF,IAAA,SAAAK,KAAA,IAAAD,yBAAA,EAACC,KAAK,KAAG,EAARN,QAAA,EAAK,CACR;IAAA,OAAAC,IAAA;AAAA,IACD","names":["$splice0","$splice1","$splice2","_el$","_tmpl$","_$insert","$Shown","_$createComponent","$Bump"],"ignoreList":[],"sources":["once/shared.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module4 = {
  id: "2w4of91pb1pz1:31:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2) => $splice0()(() => {\n    const pair = [$splice1(), $splice2()];\n    return pair[0] === pair[1];\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8BwB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,KAAAF,QAAA,EAAW,CAAC;IAC5B,MAAMG,IAAI,GAAG,CAACF,QAAA,EAAM,EAAEC,QAAA,EAAM,CAAC;IAC7B,OAAOC,IAAI,CAAC,CAAC,CAAC,KAAKA,IAAI,CAAC,CAAC,CAAC;AAC5B,CAAC,CAAC","names":["$splice0","$splice1","$splice2","pair"],"ignoreList":[],"sources":["once/shared.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// A `once` script is one value for the bundle, made at its top: every read is
// that value, as a module-level `const` is in plain TypeScript. A signal made
// once is one signal, which every component reading it shares.
const count = once(cs.create($module0, [createSignal]));
const Shown = cs.create($module1, [count]);
const Bump = cs.create($module2, [count, count]);
const shared = cs.create($module3, [Shown, Shown, Bump]);
describe("a once script", () => {
  it("is one value at every read", async () => {
    assert.equal(
      await evaluate(cs.create($module4, [createRoot, count, count])),
      true,
    );
  });
  it("is shared by every component that reads it", async () => {
    render(await evaluate(() => shared));
    await userEvent.click(screen.getByRole("button"));
    assert.deepEqual(
      screen.getAllByText(/count/).map((node) => node.textContent),
      ["count 1", "count 1"],
    );
  });
});
it("shared", async (t) => {
  await snapshotCase(t, "shared", shared);
});
