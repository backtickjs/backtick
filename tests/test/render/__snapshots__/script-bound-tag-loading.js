import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the signal: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs.create(
    "2h8m00z8w6ydl:18:2",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<b>`);\nexport default () => props => (() => {\n  var _el$ = _tmpl$();\n  _$insert(_el$, () => "count " + props.count);\n  return _el$;\n})();',
      map: '{"version":3,"mappings":";;;eAiBK,MAACA,KAAwB;EAAA,IAAAC,IAAA,GAAAC,MAAA;EAAAC,QAAA,CAAAF,IAAA,QAAS,QAAQ,GAAGD,KAAK,CAACI,KAAK;EAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","count"],"ignoreList":[],"sources":["script-bound-tag-loading.test.tsx"]}',
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
      ],
      exportAt: 151,
    },
  ),
  { transform },
);
const scriptBoundTagLoading = cs.create(
  "2h8m00z8w6ydl:22:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: loadedBadge, bindings: [] },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { memo as _$memo } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>load</button><button>more`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<i>loading`);\nexport default ($0, $1) => {\n  const count = $0()(0);\n  const drawn = $0()(null);\n  const Badge = props => {\n    const held = drawn[0]();\n    return held === null ? null : eval(held)(props);\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _$insert(_el$, (() => {\n      var _c$ = _$memo(() => drawn[0]() === null);\n      return () => _c$() ? _tmpl$2() : _$createComponent(Badge, {\n        get count() {\n          return count[0]();\n        }\n      });\n    })(), _el$2);\n    _el$2.$$click = () => drawn[1]($1());\n    _el$3.$$click = () => count[1](count[0]() + 1);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
    map: '{"version":3,"mappings":";;;;;;;eAqBiC,CAAAA,EAAA,EAAAC,EAAA;EAC/B,MAAMC,KAAK,GAAGF,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9B,MAAMG,KAAK,GAAGH,EAAA,EAAa,CAEjB,IAAI,CAAC;EACf,MAAMI,KAAK,GAAIC,KAAwB,IAAI;IACzC,MAAMC,IAAI,GAAGH,KAAK,CAAC,CAAC,CAAC,EAAE;IACvB,OAAOG,IAAI,KAAK,IAAI,GAAG,IAAI,GAAGC,IAAI,CAACD,IAAI,CAAC,CAACD,KAAK,CAAC;EACjD,CAAC;EAED;IAAA,IAAAG,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAC,QAAA,CAAAN,IAAA;MAAA,IAAAO,GAAA,GAAAC,MAAA,OAEKb,KAAK,CAAC,CAAC,CAAC,EAAE,KAAK,IAAI;MAAA,aAAnBY,GAAA,KAAAE,OAAA,KAAAC,iBAAA,CAAwCd,KAAK;QAAA,IAACF,KAAKA,CAAA;UAAA,OAAEA,KAAK,CAAC,CAAC,CAAC,EAAE;QAAA;MAAA,EAAI;IAAA,MAAAQ,KAAA;IAAAA,KAAA,CAAAS,OAAA,GACnD,MAAMhB,KAAK,CAAC,CAAC,CAAC,CAACF,EAAA,EAAY,CAAC;IAAAW,KAAA,CAAAO,OAAA,GAC5B,MAAMjB,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAA,OAAAM,IAAA;EAAA;AAGrD,CAAC;AAAAY,gBAAA","names":["$0","$1","count","drawn","Badge","props","held","eval","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$insert","_c$","_$memo","_tmpl$2","_$createComponent","$$click","_$delegateEvents"],"ignoreList":[],"sources":["script-bound-tag-loading.test.tsx"]}',
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
      {
        from: "solid-js/web",
        range: [242, 288],
        bindings: [{ name: "memo", local: "_$memo" }],
      },
    ],
    exportAt: 420,
  },
);
it("scriptBoundTagLoading", async (t) => {
  await snapshotCase(t, "scriptBoundTagLoading", scriptBoundTagLoading);
});
describe("a tag naming a function the script holds", () => {
  it("draws one that arrives later, and keeps its prop live", async () => {
    await render(scriptBoundTagLoading);
    assert.equal(screen.getByText("loading").tagName.toLowerCase(), "i");
    await userEvent.click(screen.getByRole("button", { name: "load" }));
    const badge = screen.getByText("count 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    assert.equal(screen.queryByText("loading"), null);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated in place",
    );
  });
});
