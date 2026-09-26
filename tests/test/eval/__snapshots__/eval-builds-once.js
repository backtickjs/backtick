import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { settled } from "../render/dom.ts";
import { snapshotCase } from "../snapshotCase.ts";
// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new signals, and whatever it did on the way in done over.
//
// Two of them answer that way: a bundle drawn where it stands, which is this
// file, and a list, which `render/for-builds-once.test.tsx` covers. The list is
// the one that says where the fault was — a drawn bundle is not special, so
// neither is the fix.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.
// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new signals, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.create(
    "1x3zqoc7u7k6f:43:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<em>answered`);\nexport default () => _tmpl$();',
      map: '{"version":3,"mappings":";;eA0CY,MAAAA,MAAA,EAAqB","names":["_tmpl$"],"ignoreList":[],"sources":["eval-builds-once.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 109,
    },
  );
}
const answer = await bundler.run(_jsx(Answer, {}));
async function Waiting({ ask }) {
  return cs.create(
    "1x3zqoc7u7k6f:53:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: window, bindings: [] },
        { kind: "splice", value: ask, bindings: [] },
      ],
    },
    {
      code: 'import { memo as _$memo } from "solid-js/web";\nexport default ($0, $1, $2) => {\n  const drawn = $0()(null);\n  const started = $1().setTimeout(() => drawn[1]($2()()), 0);\n  return _$memo(() => _$memo(() => drawn[0]() === null)() ? null : eval(drawn[0]()));\n};',
      map: '{"version":3,"mappings":";eAoDY,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACR,MAAMC,KAAK,GAAGH,EAAA,EAAa,CAAiC,IAAI,CAAC;EACjE,MAAMI,OAAO,GAAGH,EAAA,EAAO,CAACI,UAAU,CAAC,MAAMF,KAAK,CAAC,CAAC,CAAC,CAACD,EAAA,EAAI,EAAE,CAAC,EAAE,CAAC,CAAC;EAC7D,OAAAI,MAAA,OAEKA,MAAA,OAAAH,KAAK,CAAC,CAAC,CAAC,EAAE,KAAK,IAAI,MAChB,IAAI,GACJI,IAAI,CAACJ,KAAK,CAAC,CAAC,CAAC,EAA6B,CAAC;AAGrD,CAAC","names":["$0","$1","$2","drawn","started","setTimeout","_$memo","eval"],"ignoreList":[],"sources":["eval-builds-once.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 46],
          bindings: [{ name: "memo", local: "_$memo" }],
        },
      ],
      exportAt: 47,
    },
  );
}
const evalBuildsOnce = cs.create(
  "1x3zqoc7u7k6f:66:23",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: answer, bindings: [] },
      { kind: "tag", value: Waiting },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span>`);\nexport default ($0, $1, $2) => {\n  const asked = $0()(0);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _$insert(_el$2, () => "asked " + asked[0]());\n    _$insert(_el$, _$createComponent($2, {\n      ask: () => {\n        asked[1](asked[0]() + 1);\n        return asked[0]() > 4 ? null : $1();\n      }\n    }), null);\n    return _el$;\n  })();\n};',
    map: '{"version":3,"mappings":";;;;eAiE0B,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACxB,MAAMC,KAAK,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EAE9B;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,QAAA,CAAAF,KAAA,QAEW,QAAQ,GAAGH,KAAK,CAAC,CAAC,CAAC,EAAE;IAAAK,QAAA,CAAAJ,IAAA,EAAAK,iBAAA,CAC3BP,EAAO;MACNQ,GAAG,EAAEA,CAAA,KAAK;QACRP,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QACxB,OAAOA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,GAAG,IAAI,GAAGF,EAAA,EAAO;MACxC;IAAC;IAAA,OAAAG,IAAA;EAAA;AAIT,CAAC","names":["$0","$1","$2","asked","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","ask"],"ignoreList":[],"sources":["eval-builds-once.test.tsx"]}',
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
it("evalBuildsOnce", async (t) => {
  await snapshotCase(t, "evalBuildsOnce", evalBuildsOnce);
});
describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    await render(evalBuildsOnce);
    // Nothing to draw yet, and the wait has not been made twice.
    assert.ok(screen.getByText("asked 0"));
    assert.equal(screen.queryByText("answered"), null);
    await settled();
    assert.ok(screen.getByText("answered"));
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
