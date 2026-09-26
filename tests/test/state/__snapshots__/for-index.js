import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs.create(
    "1jfuhgh5cfsz9:16:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>rotate</span><div>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<span>`);\nexport default ($0, $1) => {\n  const names = $0()(["a", "b", "c"]);\n  const rotate = () => {\n    const held = names[0]();\n    names[1]([held[2], held[0], held[1]]);\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = rotate;\n    _$insert(_el$3, _$createComponent($1, {\n      get each() {\n        return names[0]();\n      },\n      children: (name, index) => (() => {\n        var _el$4 = _tmpl$2();\n        _$insert(_el$4, () => name + " at " + index());\n        return _el$4;\n      })()\n    }));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;eAeY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,KAAK,GAAGF,EAAA,EAAa,CAAW,CAAC,GAAG,EAAE,GAAG,EAAE,GAAG,CAAC,CAAC;EACtD,MAAMG,MAAM,GAAGA,CAAA,KAAK;IAClB,MAAMC,IAAI,GAAGF,KAAK,CAAC,CAAC,CAAC,EAAE;IACvBA,KAAK,CAAC,CAAC,CAAC,CAAC,CAACE,IAAI,CAAC,CAAC,CAAC,EAAEA,IAAI,CAAC,CAAC,CAAC,EAAEA,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC;EACvC,CAAC;EACD;IAAA,IAAAC,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEmBR,MAAM;IAAAS,QAAA,CAAAH,KAAA,EAAAI,iBAAA,CAElBZ,EAAG;MAAA,IAACa,IAAIA,CAAA;QAAA,OAAEZ,KAAK,CAAC,CAAC,CAAC,EAAE;MAAA;MAAAa,QAAA,EAClBA,CAACC,IAAY,EAAEC,KAAmB;QAAA,IAAAC,KAAA,GAAAC,OAAA;QAAAP,QAAA,CAAAM,KAAA,QAC1BF,IAAI,GAAG,MAAM,GAAGC,KAAK,EAAE;QAAA,OAAAC,KAAA;MAAA;IAC/B;IAAA,OAAAb,IAAA;EAAA;AAKX,CAAC;AAAAe,gBAAA","names":["$0","$1","names","rotate","held","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$createComponent","each","children","name","index","_el$4","_tmpl$2","_$delegateEvents"],"ignoreList":[],"sources":["for-index.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
        {
          from: "solid-js/web",
          range: [55, 121],
          bindings: [{ name: "delegateEvents", local: "_$delegateEvents" }],
        },
        {
          from: "solid-js/web",
          range: [122, 172],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [173, 241],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 360,
    },
  );
}
describe("local state", () => {
  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn(_jsx(RotatingRows, {}));
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });
});
it("RotatingRows", async (t) => {
  await snapshotCase(t, "RotatingRows", _jsx(RotatingRows, {}));
});
