import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "swap rows": the second row and the second-to-last
// change places. The rows between them stay where they are, so what moves is
// the two rows and nothing else.
async function SwappableRows() {
  return cs.create(
    "3q35jg4lszesn:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { setAttribute as _$setAttribute } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>swap</button><table><tbody>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<tr><td>`);\nexport default ($0, $1) => {\n  const ids = $0()([1, 2, 3, 4, 5]);\n  const swap = () => {\n    const held = ids[0]();\n    ids[1](held.with(1, held[3]).with(3, held[1]));\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling,\n      _el$4 = _el$3.firstChild;\n    _el$2.$$click = swap;\n    _$insert(_el$4, _$createComponent($1, {\n      get each() {\n        return ids[0]();\n      },\n      children: id => (() => {\n        var _el$5 = _tmpl$2(),\n          _el$6 = _el$5.firstChild;\n        _$setAttribute(_el$5, "id", "row-" + id);\n        _$insert(_el$6, "row " + id);\n        return _el$5;\n      })()\n    }));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;;eAYY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,GAAG,GAAGF,EAAA,EAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;EACpD,MAAMG,IAAI,GAAGA,CAAA,KAAK;IAChB,MAAMC,IAAI,GAAGF,GAAG,CAAC,CAAC,CAAC,EAAE;IACrBA,GAAG,CAAC,CAAC,CAAC,CAACE,IAAI,CAACC,IAAI,CAAC,CAAC,EAAED,IAAI,CAAC,CAAC,CAAC,CAAC,CAACC,IAAI,CAAC,CAAC,EAAED,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC;EAChD,CAAC;EACD;IAAA,IAAAE,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAD,UAAA;IAAAD,KAAA,CAAAK,OAAA,GAEqBV,IAAI;IAAAW,QAAA,CAAAF,KAAA,EAAAG,iBAAA,CAGhBd,EAAG;MAAA,IAACe,IAAIA,CAAA;QAAA,OAAEd,GAAG,CAAC,CAAC,CAAC,EAAE;MAAA;MAAAe,QAAA,EACfC,EAAU;QAAA,IAAAC,KAAA,GAAAC,OAAA;UAAAC,KAAA,GAAAF,KAAA,CAAAV,UAAA;QAAAa,cAAA,CAAAH,KAAA,QACF,MAAM,GAAGD,EAAE;QAAAJ,QAAA,CAAAO,KAAA,EACZ,MAAM,GAAGH,EAAE;QAAA,OAAAC,KAAA;MAAA;IAEnB;IAAA,OAAAb,IAAA;EAAA;AAMb,CAAC;AAAAiB,gBAAA","names":["$0","$1","ids","swap","held","with","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$insert","_$createComponent","each","children","id","_el$5","_tmpl$2","_el$6","_$setAttribute","_$delegateEvents"],"ignoreList":[],"sources":["swap-rows.test.tsx"]}',
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
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [236, 304],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 436,
    },
  );
}
it("a swap moves the two rows it swapped", async () => {
  const { container } = await render(_jsx(SwappableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "swap" }));
  // Each move is the row leaving where it was and arriving where it goes.
  assert.deepEqual(written(), [
    "tbody − tr#row-4",
    "tbody + tr#row-4 before tr#row-3",
    "tbody − tr#row-2",
    "tbody + tr#row-2 before tr#row-5",
  ]);
});
