import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
// The same claim as `evaluateBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];
async function WaitingList({ more }) {
  return cs.create(
    "1megzj3sd9ppx:22:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: window, bindings: [] },
        { kind: "splice", value: more, bindings: [] },
        { kind: "splice", value: answerItems, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<em>`);\nexport default ($0, $1, $2, $3, $4) => {\n  const items = $0()([]);\n  const started = $1().setTimeout(() => {\n    if ($2()()) {\n      items[1]($3());\n    }\n  }, 0);\n  return _$createComponent($4, {\n    get each() {\n      return items[0]();\n    },\n    children: item => (() => {\n      var _el$ = _tmpl$();\n      _$insert(_el$, item);\n      return _el$;\n    })()\n  });\n};',
      map: '{"version":3,"mappings":";;;;eAqBY,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACR,MAAMC,KAAK,GAAGL,EAAA,EAAa,CAAW,EAAE,CAAC;EAEzC,MAAMM,OAAO,GAAGL,EAAA,EAAO,CAACM,UAAU,CAAC,MAAK;IACtC,IAAIL,EAAA,EAAK,EAAE,EAAE;MACXG,KAAK,CAAC,CAAC,CAAC,CAACF,EAAA,EAAY,CAAC;IACxB;EACF,CAAC,EAAE,CAAC,CAAC;EAEL,OAAAK,iBAAA,CAAQJ,EAAG;IAAA,IAACK,IAAIA,CAAA;MAAA,OAAEJ,KAAK,CAAC,CAAC,CAAC,EAAE;IAAA;IAAAK,QAAA,EAAIC,IAAY;MAAA,IAAAC,IAAA,GAAAC,MAAA;MAAAC,QAAA,CAAAF,IAAA,EAAUD,IAAI;MAAA,OAAAC,IAAA;IAAA;EAAM;AAClE,CAAC","names":["$0","$1","$2","$3","$4","items","started","setTimeout","_$createComponent","each","children","item","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["for-builds-once.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
        {
          from: "solid-js/web",
          range: [55, 105],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [106, 174],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 221,
    },
  );
}
const forBuildsOnce = cs.create(
  "1megzj3sd9ppx:35:22",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: WaitingList },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>`);\nexport default ($0, $1) => {\n  const asked = $0()(0);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _$insert(_el$2, () => "asked " + asked[0]());\n    _$insert(_el$, _$createComponent($1, {\n      more: () => {\n        asked[1](asked[0]() + 1);\n        return asked[0]() < 5;\n      }\n    }), null);\n    return _el$;\n  })();\n};',
    map: '{"version":3,"mappings":";;;;eAkCyB,CAAAA,EAAA,EAAAC,EAAA;EACvB,MAAMC,KAAK,GAAGF,EAAA,EAAa,CAAC,CAAC,CAAC;EAE9B;IAAA,IAAAG,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,QAAA,CAAAF,KAAA,QAEW,QAAQ,GAAGH,KAAK,CAAC,CAAC,CAAC,EAAE;IAAAK,QAAA,CAAAJ,IAAA,EAAAK,iBAAA,CAC3BP,EAAW;MACVQ,IAAI,EAAEA,CAAA,KAAK;QACTP,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QACxB,OAAOA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;MACvB;IAAC;IAAA,OAAAC,IAAA;EAAA;AAIT,CAAC","names":["$0","$1","asked","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","more"],"ignoreList":[],"sources":["for-builds-once.test.tsx"]}',
    imports: [
      {
        from: "solid-js/web",
        range: [0, 54],
        bindings: [{ name: "template", local: "_$template" }],
      },
      {
        from: "solid-js/web",
        range: [55, 123],
        bindings: [{ name: "createComponent", local: "_$createComponent" }],
      },
      {
        from: "solid-js/web",
        range: [124, 174],
        bindings: [{ name: "insert", local: "_$insert" }],
      },
    ],
    exportAt: 228,
  },
);
it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});
describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = await render(forBuildsOnce);
    assert.ok(screen.getByText("asked 0"));
    await settled();
    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
