import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the signal without the badge being drawn again.
const badge = await bundler.run(
  cs.create(
    "3qxd63l5wnivt:15:2",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<b>`);\nexport default () => props => (() => {\n  var _el$ = _tmpl$();\n  _$insert(_el$, () => "count " + props.count);\n  return _el$;\n})();',
      map: '{"version":3,"mappings":";;;eAcK,MAACA,KAAwB;EAAA,IAAAC,IAAA,GAAAC,MAAA;EAAAC,QAAA,CAAAF,IAAA,QAAS,QAAQ,GAAGD,KAAK,CAACI,KAAK;EAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","count"],"ignoreList":[],"sources":["script-bound-tag.test.tsx"]}',
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
const scriptBoundTag = cs.create(
  "3qxd63l5wnivt:19:23",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: badge, bindings: [] },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>more`);\nexport default ($0, $1) => {\n  const count = $0()(0);\n  const Badge = eval($1());\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _$insert(_el$, _$createComponent(Badge, {\n      get count() {\n        return count[0]();\n      }\n    }), _el$2);\n    _el$2.$$click = () => count[1](count[0]() + 1);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
    map: '{"version":3,"mappings":";;;;;eAkB0B,CAAAA,EAAA,EAAAC,EAAA;EACxB,MAAMC,KAAK,GAAGF,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9B,MAAMG,KAAK,GAAGC,IAAI,CAACH,EAAA,EAAM,CAAC;EAE1B;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,QAAA,CAAAJ,IAAA,EAAAK,iBAAA,CAEKP,KAAK;MAAA,IAACD,KAAKA,CAAA;QAAA,OAAEA,KAAK,CAAC,CAAC,CAAC,EAAE;MAAA;IAAA,IAAAK,KAAA;IAAAA,KAAA,CAAAI,OAAA,GACP,MAAMT,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAA,OAAAG,IAAA;EAAA;AAGrD,CAAC;AAAAO,gBAAA","names":["$0","$1","count","Badge","eval","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","$$click","_$delegateEvents"],"ignoreList":[],"sources":["script-bound-tag.test.tsx"]}',
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
    exportAt: 301,
  },
);
it("scriptBoundTag", async (t) => {
  await snapshotCase(t, "scriptBoundTag", scriptBoundTag);
});
describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    await render(scriptBoundTag);
    const badge = screen.getByText("count 0");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated rather than drawn again",
    );
  });
});
