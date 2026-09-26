import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.create(
    "2qvr46mfkosun:11:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { style as _$style } from "solid-js/web";\nimport { effect as _$effect } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><span></span><span style=font-size:8px>fixed</span><span>held`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<div style=padding:0>`);\nexport default $0 => {\n  const label = $0()("hi");\n  const row = size => {\n    const css = "font-size: " + size + "px";\n    const press = () => label[1]("held");\n    return (() => {\n      var _el$ = _tmpl$(),\n        _el$2 = _el$.firstChild,\n        _el$3 = _el$2.nextSibling,\n        _el$4 = _el$3.nextSibling;\n      _el$2.$$click = () => label[1]("pressed");\n      _$insert(_el$2, () => label[0]());\n      _el$4.$$click = press;\n      _$effect(_p$ => {\n        var _v$ = css,\n          _v$2 = css,\n          _v$3 = css;\n        _p$.e = _$style(_el$, _v$, _p$.e);\n        _p$.t = _$style(_el$2, _v$2, _p$.t);\n        _p$.a = _$style(_el$4, _v$3, _p$.a);\n        return _p$;\n      }, {\n        e: undefined,\n        t: undefined,\n        a: undefined\n      });\n      return _el$;\n    })();\n  };\n  return (() => {\n    var _el$5 = _tmpl$2();\n    _$insert(_el$5, () => row(12));\n    return _el$5;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;;;eAUYA,EAAA;EACR,MAAMC,KAAK,GAAGD,EAAA,EAAa,CAAC,IAAI,CAAC;EAIjC,MAAME,GAAG,GAAIC,IAAY,IAAI;IAC3B,MAAMC,GAAG,GAAG,aAAa,GAAGD,IAAI,GAAG,IAAI;IACvC,MAAME,KAAK,GAAGA,CAAA,KAAMJ,KAAK,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC;IACpC;MAAA,IAAAK,IAAA,GAAAC,MAAA;QAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;MAAAH,KAAA,CAAAK,OAAA,GAE+B,MAAMZ,KAAK,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC;MAAAa,QAAA,CAAAN,KAAA,QACjDP,KAAK,CAAC,CAAC,CAAC,EAAE;MAAAW,KAAA,CAAAC,OAAA,GAGcR,KAAK;MAAAU,QAAA,CAAAC,GAAA;QAAA,IAAAC,GAAA,GALtBb,GAAG;UAAAc,IAAA,GACAd,GAAG;UAAAe,IAAA,GAIHf,GAAG;QAAAY,GAAA,CAAAI,CAAA,GAAAC,OAAA,CAAAf,IAAA,EAAAW,GAAA,EAAAD,GAAA,CAAAI,CAAA;QAAAJ,GAAA,CAAAM,CAAA,GAAAD,OAAA,CAAAb,KAAA,EAAAU,IAAA,EAAAF,GAAA,CAAAM,CAAA;QAAAN,GAAA,CAAAO,CAAA,GAAAF,OAAA,CAAAT,KAAA,EAAAO,IAAA,EAAAH,GAAA,CAAAO,CAAA;QAAA,OAAAP,GAAA;MAAA;QAAAI,CAAA,EAAAI,SAAA;QAAAF,CAAA,EAAAE,SAAA;QAAAD,CAAA,EAAAC;MAAA;MAAA,OAAAlB,IAAA;IAAA;EAKtB,CAAC;EAED;IAAA,IAAAmB,KAAA,GAAAC,OAAA;IAAAZ,QAAA,CAAAW,KAAA,QAAgCvB,GAAG,CAAC,EAAE,CAAC;IAAA,OAAAuB,KAAA;EAAA;AACzC,CAAC;AAAAE,gBAAA","names":["$0","label","row","size","css","press","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$insert","_$effect","_p$","_v$","_v$2","_v$3","e","_$style","t","a","undefined","_el$5","_tmpl$2","_$delegateEvents"],"ignoreList":[],"sources":["script-element.test.tsx"]}',
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
          range: [122, 170],
          bindings: [{ name: "style", local: "_$style" }],
        },
        {
          from: "solid-js/web",
          range: [171, 221],
          bindings: [{ name: "effect", local: "_$effect" }],
        },
        {
          from: "solid-js/web",
          range: [222, 272],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
      ],
      exportAt: 443,
    },
  );
}
it("Card", async (t) => {
  await snapshotCase(t, "Card", _jsx(Card, {}));
});
