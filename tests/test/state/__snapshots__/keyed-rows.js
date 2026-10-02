import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A keyed list driven by a signal. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs.create(
    "9zklt1bd02cm:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>swap</span><span>drop</span><div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $tag1) => {\n    const ids = $splice0()([1, 2, 3]);\n    const swap = () => {\n        const held = ids[0]();\n        ids[1](held.with(0, held[2]).with(2, held[0]));\n    };\n    const drop = () => {\n        ids[1](ids[0]().filter(id => id !== 2));\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;\n        _el$2.$$click = swap;\n        _el$3.$$click = drop;\n        (0, web_3.insert)(_el$4, (0, web_4.createComponent)($tag1, {\n            get each() {\n                return ids[0]();\n            },\n            children: id => (() => {\n                var _el$5 = _tmpl$2();\n                (0, web_3.insert)(_el$5, "row " + id);\n                return _el$5;\n            })()\n        }));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAYY,CAAAA,QAAA,EAAAC,KAAA;IACR,MAAMC,GAAG,GAAGF,QAAA,EAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IAC9C,MAAMG,IAAI,GAAGA,GAAA;QACX,MAAMC,IAAI,GAAGF,GAAG,CAAC,CAAC,CAAC,EAAE;QACrBA,GAAG,CAAC,CAAC,CAAC,CAACE,IAAI,CAACC,IAAI,CAAC,CAAC,EAAED,IAAI,CAAC,CAAC,CAAC,CAAC,CAACC,IAAI,CAAC,CAAC,EAAED,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC;IAChD,CAAC;IACD,MAAME,IAAI,GAAGA,GAAA;QACXJ,GAAG,CAAC,CAAC,CAAC,CAACA,GAAG,CAAC,CAAC,CAAC,EAAE,CAACK,MAAM,CAAEC,EAAE,IAAKA,EAAE,KAAK,CAAC,CAAC,CAAC;IAC3C,CAAC;IACD;QAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;QAAAH,KAAA,CAAAK,OAAA,GAEmBb,IAAI;QAAAU,KAAA,CAAAG,OAAA,GACJV,IAAI;QAAAW,gBAAA,EAAAF,KAAA,EAAAG,yBAAA,EAEhBjB,KAAG;YAAA,IAACkB,IAAIA;gBAAA,OAAEjB,GAAG,CAAC,CAAC,CAAC,EAAE;YAAA;YAAAkB,QAAA,EACfZ,EAAU;gBAAA,IAAAa,KAAA,GAAAC,OAAA;gBAAAL,gBAAA,EAAAI,KAAA,EAAY,MAAM,GAAGb,EAAE;gBAAA,OAAAa,KAAA;YAAA;SAAQ;QAAA,OAAAZ,IAAA;IAAA;AAKrD,CAAC","names":["$splice0","$tag1","ids","swap","held","with","drop","filter","id","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$insert","_$createComponent","each","children","_el$5","_tmpl$2"],"ignoreList":[],"sources":["state/keyed-rows.test.tsx"]}',
    ["solid-js/web"],
  );
}
describe("local state", () => {
  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = [...list.children];
    await userEvent.click(swap);
    assert.deepEqual([...list.children].map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal([...list.children][0], third);
    assert.equal([...list.children][2], first);
  });
  it("a list a row was dropped from draws the rest", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = [...list.children];
    await userEvent.click(drop);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual([...list.children], [first, third]);
  });
});
it("SwappableRows", async (t) => {
  await snapshotCase(t, "SwappableRows", _jsx(SwappableRows, {}));
});
