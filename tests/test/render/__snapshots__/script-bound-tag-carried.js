import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props) {
  return cs.create(
    "39ox4ofrbdtgr:13:9",
    { params: [{ kind: "splice", value: props, bindings: [] }] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<i>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<section>`);\nexport default $0 => {\n  const Badge = p => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => "panel " + p.n);\n    return _el$;\n  })();\n  return (() => {\n    var _el$2 = _tmpl$2();\n    _$insert(_el$2, _$createComponent(Badge, {\n      n: 0\n    }), null);\n    _$insert(_el$2, () => $0().body, null);\n    return _el$2;\n  })();\n};',
      map: '{"version":3,"mappings":";;;;;eAYYA,EAAA;EACR,MAAMC,KAAK,GAAIC,CAAgB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAAS,QAAQ,GAAGD,CAAC,CAACI,CAAC;IAAA,OAAAH,IAAA;EAAA,IAAK;EAC3D;IAAA,IAAAI,KAAA,GAAAC,OAAA;IAAAH,QAAA,CAAAE,KAAA,EAAAE,iBAAA,CAEKR,KAAK;MAACK,CAAC,EAAE;IAAC;IAAAD,QAAA,CAAAE,KAAA,QACVP,EAAA,EAAM,CAACU,IAAI;IAAA,OAAAH,KAAA;EAAA;AAGlB,CAAC","names":["$0","Badge","p","_el$","_tmpl$","_$insert","n","_el$2","_tmpl$2","_$createComponent","body"],"ignoreList":[],"sources":["script-bound-tag-carried.test.tsx"]}',
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
      exportAt: 270,
    },
  );
}
// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs.create(
  "39ox4ofrbdtgr:28:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: cs.create(
          "39ox4ofrbdtgr:41:12",
          {
            params: [
              { kind: "capture", key: "Badge$39ox4ofrbdtgr$3" },
              { kind: "capture", key: "count$39ox4ofrbdtgr$2" },
            ],
          },
          {
            code: 'import { template as _$template } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<u>`);\nexport default ($0, $1) => _$createComponent($0, {\n  get n() {\n    return $1[0]();\n  },\n  get children() {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => "kid " + $1[0]());\n    return _el$;\n  }\n});',
            map: '{"version":3,"mappings":";;;;eAwCe,CAAAA,EAAA,EAAAC,EAAA,KAAAC,iBAAA,CAACF,EAAK;EAAA,IAACG,CAACA,CAAA;IAAA,OAAEF,EAAK,CAAC,CAAC,CAAC,EAAE;EAAA;EAAA,IAAAG,SAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QACnB,MAAM,GAAGJ,EAAK,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAI,IAAA;EAAA;AAAA,EACjB","names":["$0","$1","_$createComponent","n","children","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["script-bound-tag-carried.test.tsx"]}',
            imports: [
              {
                from: "solid-js/web",
                range: [0, 54],
                bindings: [{ name: "template", local: "_$template" }],
              },
              {
                from: "solid-js/web",
                range: [55, 123],
                bindings: [
                  { name: "createComponent", local: "_$createComponent" },
                ],
              },
              {
                from: "solid-js/web",
                range: [124, 174],
                bindings: [{ name: "insert", local: "_$insert" }],
              },
            ],
            exportAt: 220,
          },
        ),
        bindings: ["count$39ox4ofrbdtgr$2", "Badge$39ox4ofrbdtgr$3"],
      },
      { kind: "tag", value: Panel },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<b>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<div><button>more`);\nexport default ($0, $1, $2) => {\n  const count = $0()(0);\n  const Badge = p => (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => "outer " + p.n, null);\n    _$insert(_el$, () => p.children, null);\n    return _el$;\n  })();\n  return (() => {\n    var _el$2 = _tmpl$2(),\n      _el$3 = _el$2.firstChild;\n    _$insert(_el$2, _$createComponent($2, {\n      get body() {\n        return $1(count, Badge);\n      }\n    }), _el$3);\n    _el$3.$$click = () => count[1](count[0]() + 1);\n    return _el$2;\n  })();\n};\n_$delegateEvents(["click"]);',
    map: '{"version":3,"mappings":";;;;;;eA2BiC,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EAC/B,MAAMC,KAAK,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9B,MAAMI,KAAK,GAAIC,CAA2C;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAErD,QAAQ,GAAGD,CAAC,CAACI,CAAC;IAAAD,QAAA,CAAAF,IAAA,QACdD,CAAC,CAACK,QAAQ;IAAA,OAAAJ,IAAA;EAAA,IAEd;EAED;IAAA,IAAAK,KAAA,GAAAC,OAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA;IAAAN,QAAA,CAAAG,KAAA,EAAAI,iBAAA,CAEKb,EAAK;MAAA,IACJc,IAAIA,CAAA;QAAA,OACFf,EAAA,CAAAE,KAAA,EAAAC,KAAA,CAGF;MAAA;IAAA,IAAAS,KAAA;IAAAA,KAAA,CAAAI,OAAA,GAEe,MAAMd,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAA,OAAAQ,KAAA;EAAA;AAGrD,CAAC;AAAAO,gBAAA","names":["$0","$1","$2","count","Badge","p","_el$","_tmpl$","_$insert","n","children","_el$2","_tmpl$2","_el$3","firstChild","_$createComponent","body","$$click","_$delegateEvents"],"ignoreList":[],"sources":["script-bound-tag-carried.test.tsx"]}',
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
        range: [122, 190],
        bindings: [{ name: "createComponent", local: "_$createComponent" }],
      },
      {
        from: "solid-js/web",
        range: [191, 241],
        bindings: [{ name: "insert", local: "_$insert" }],
      },
    ],
    exportAt: 345,
  },
);
it("scriptBoundTagCarried", async (t) => {
  await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
});
describe("a tag naming a function the script holds", () => {
  it("calls the one it was written under, drawn where another is in scope", async () => {
    await render(scriptBoundTagCarried);
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});
