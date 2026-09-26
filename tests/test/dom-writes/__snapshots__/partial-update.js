import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "partial update": every other row's label grows,
// and each label is a signal of its own. Writing one is a write to that row's
// text, and nothing else: no row is rebuilt, and no other row hears of it.
async function Labels() {
  return cs.create(
    "ukklrlxvvbq3:14:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { setAttribute as _$setAttribute } from "solid-js/web";\nimport { effect as _$effect } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>update</button><table><tbody>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<tr><td>`);\nexport default ($0, $1) => {\n  const rows = [1, 2, 3, 4].map(id => ({\n    id: id,\n    label: $0()("row " + id)\n  }));\n  const update = () => {\n    for (let index = 0; index < rows.length; index = index + 2) {\n      const label = rows[index].label;\n      label[1](label[0]() + " !!!");\n    }\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling,\n      _el$4 = _el$3.firstChild;\n    _el$2.$$click = update;\n    _$insert(_el$4, _$createComponent($1, {\n      each: rows,\n      children: row => (() => {\n        var _el$5 = _tmpl$2(),\n          _el$6 = _el$5.firstChild;\n        _$insert(_el$6, () => row.label[0]());\n        _$effect(() => _$setAttribute(_el$5, "id", "row-" + row.id));\n        return _el$5;\n      })()\n    }));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;;;eAaY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAACC,GAAG,CAAEC,EAAU,KAAM;IAC7CA,EAAE,EAAEA,EAAE;IACNC,KAAK,EAAEL,EAAA,EAAa,CAAC,MAAM,GAAGI,EAAE;GACjC,CAAC,CAAC;EACH,MAAME,MAAM,GAAGA,CAAA,KAAK;IAClB,KAAK,IAAIC,KAAK,GAAG,CAAC,EAAEA,KAAK,GAAGL,IAAI,CAACM,MAAM,EAAED,KAAK,GAAGA,KAAK,GAAG,CAAC,EAAE;MAC1D,MAAMF,KAAK,GAAGH,IAAI,CAACK,KAAK,CAAC,CAACF,KAAK;MAC/BA,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,MAAM,CAAC;IAC/B;EACF,CAAC;EACD;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAD,UAAA;IAAAD,KAAA,CAAAK,OAAA,GAEqBV,MAAM;IAAAW,QAAA,CAAAF,KAAA,EAAAG,iBAAA,CAGlBjB,EAAG;MAACkB,IAAI,EAAEjB,IAAI;MAAAkB,QAAA,EACXC,GAA0C;QAAA,IAAAC,KAAA,GAAAC,OAAA;UAAAC,KAAA,GAAAF,KAAA,CAAAV,UAAA;QAAAK,QAAA,CAAAO,KAAA,QAEnCH,GAAG,CAAChB,KAAK,CAAC,CAAC,CAAC,EAAE;QAAAoB,QAAA,OAAAC,cAAA,CAAAJ,KAAA,QADb,MAAM,GAAGD,GAAG,CAACjB,EAAE;QAAA,OAAAkB,KAAA;MAAA;IAGxB;IAAA,OAAAb,IAAA;EAAA;AAMb,CAAC;AAAAkB,gBAAA","names":["$0","$1","rows","map","id","label","update","index","length","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$insert","_$createComponent","each","children","row","_el$5","_tmpl$2","_el$6","_$effect","_$setAttribute","_$delegateEvents"],"ignoreList":[],"sources":["partial-update.test.tsx"]}',
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
          range: [122, 184],
          bindings: [{ name: "setAttribute", local: "_$setAttribute" }],
        },
        {
          from: "solid-js/web",
          range: [185, 235],
          bindings: [{ name: "effect", local: "_$effect" }],
        },
        {
          from: "solid-js/web",
          range: [236, 286],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [287, 355],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 489,
    },
  );
}
it("a label written changes that label's text and nothing else", async () => {
  const { container } = await render(_jsx(Labels, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "update" }));
  assert.deepEqual(written(), [
    'text: "row 1" → "row 1 !!!"',
    'text: "row 3" → "row 3 !!!"',
  ]);
});
