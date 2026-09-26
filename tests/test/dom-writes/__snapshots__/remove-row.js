import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs.create(
    "goh8ksx12td5:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { setAttribute as _$setAttribute } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<table><tbody>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<tr><td><button>`);\nexport default ($0, $1) => {\n  const ids = $0()([1, 2, 3, 4, 5]);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _$insert(_el$2, _$createComponent($1, {\n      get each() {\n        return ids[0]();\n      },\n      children: id => (() => {\n        var _el$3 = _tmpl$2(),\n          _el$4 = _el$3.firstChild,\n          _el$5 = _el$4.firstChild;\n        _$setAttribute(_el$3, "id", "row-" + id);\n        _el$5.$$click = () => ids[1](ids[0]().filter(each => each !== id));\n        _$insert(_el$5, "remove " + id);\n        return _el$3;\n      })()\n    }));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;;eAYY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,GAAG,GAAGF,EAAA,EAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;EACpD;IAAA,IAAAG,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,QAAA,CAAAF,KAAA,EAAAG,iBAAA,CAGOP,EAAG;MAAA,IAACQ,IAAIA,CAAA;QAAA,OAAEP,GAAG,CAAC,CAAC,CAAC,EAAE;MAAA;MAAAQ,QAAA,EACfC,EAAU;QAAA,IAAAC,KAAA,GAAAC,OAAA;UAAAC,KAAA,GAAAF,KAAA,CAAAN,UAAA;UAAAS,KAAA,GAAAD,KAAA,CAAAR,UAAA;QAAAU,cAAA,CAAAJ,KAAA,QACF,MAAM,GAAGD,EAAE;QAAAI,KAAA,CAAAE,OAAA,GAGJ,MACPf,GAAG,CAAC,CAAC,CAAC,CAACA,GAAG,CAAC,CAAC,CAAC,EAAE,CAACgB,MAAM,CAAET,IAAI,IAAKA,IAAI,KAAKE,EAAE,CAAC,CAC/C;QAAAJ,QAAA,CAAAQ,KAAA,EAEC,SAAS,GAAGJ,EAAE;QAAA,OAAAC,KAAA;MAAA;IAItB;IAAA,OAAAT,IAAA;EAAA;AAKX,CAAC;AAAAgB,gBAAA","names":["$0","$1","ids","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","each","children","id","_el$3","_tmpl$2","_el$4","_el$5","_$setAttribute","$$click","filter","_$delegateEvents"],"ignoreList":[],"sources":["remove-row.test.tsx"]}',
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
      exportAt: 418,
    },
  );
}
it("a removal takes out the one row", async () => {
  const { container } = await render(_jsx(RemovableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
