import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
import { evaluate } from "../evaluate.ts";
// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
// A component whose whole drawing is a conditional on a signal of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a signal that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this case does not stop.
const Held = cs.create(
  "2u9nfrz55jzvf:30:13",
  { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<em>shown`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<i>waiting`);\nexports.default = $splice0 => props => {\n    const shown = $splice0()(false);\n    const started = window.setTimeout(() => {\n        if (props.again()) {\n            shown[1](true);\n        }\n    }, 0);\n    return (0, web_2.memo)(() => (0, web_2.memo)(() => !!shown[0]())() ? _tmpl$() : _tmpl$2());\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA6BgBA,QAAA,IAACC,KAA+B;IAC9C,MAAMC,KAAK,GAAGF,QAAA,EAAa,CAAC,KAAK,CAAC;IAElC,MAAMG,OAAO,GAAGC,MAAM,CAACC,UAAU,CAAC;QAChC,IAAIJ,KAAK,CAACK,KAAK,EAAE,EAAE;YACjBJ,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC;QAChB;IACF,CAAC,EAAE,CAAC,CAAC;IAEL,OAAAK,cAAA,QAAUA,cAAA,UAAAL,KAAK,CAAC,CAAC,CAAC,EAAE,MAAAM,MAAA,KAAAC,OAAA,EAAkC;AACxD,CAAC","names":["$splice0","props","shown","started","window","setTimeout","again","_$memo","_tmpl$","_tmpl$2"],"ignoreList":[],"sources":["render/conditional-drawing.test.tsx"]}',
  ["solid-js/web"],
);
const conditionalDrawing = cs.create(
  "2u9nfrz55jzvf:42:27",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: Held },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span></span><section>`);\nexports.default = ($splice0, $tag1) => {\n    const builds = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        (0, web_3.insert)(_el$2, () => "builds " + builds[0]());\n        (0, web_3.insert)(_el$3, (0, web_2.createComponent)($tag1, {\n            again: () => {\n                builds[1](builds[0]() + 1);\n                return builds[0]() < 5;\n            }\n        }));\n        return _el$;\n    })();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAyC8B,CAAAA,QAAA,EAAAC,KAAA;IAC5B,MAAMC,MAAM,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAE/B;QAAA,IAAAG,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAC,gBAAA,EAAAJ,KAAA,QAEW,SAAS,GAAGH,MAAM,CAAC,CAAC,CAAC,EAAE;QAAAO,gBAAA,EAAAF,KAAA,EAAAG,yBAAA,EAE3BT,KAAI;YACHU,KAAK,EAAEA,GAAA;gBACLT,MAAM,CAAC,CAAC,CAAC,CAACA,MAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;gBAC1B,OAAOA,MAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;YACxB;SAAC;QAAA,OAAAC,IAAA;IAAA;AAKX,CAAC","names":["$splice0","$tag1","builds","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$insert","_$createComponent","again"],"ignoreList":[],"sources":["render/conditional-drawing.test.tsx"]}',
  ["solid-js/web"],
);
describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    render(await evaluate(() => conditionalDrawing));
    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.ok(screen.getByText("builds 0"));
    assert.ok(screen.getByText("waiting"));
    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(
      screen.queryByText("builds 1"),
      "the component was built again for what it drew",
    );
    assert.ok(
      screen.queryByText("shown"),
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(screen.queryByText("waiting"), null);
  });
});
describe("what each case compiles and bundles to", () => {
  it("conditionalDrawing", async (t) => {
    await snapshotCase(t, "conditionalDrawing", conditionalDrawing);
  });
});
