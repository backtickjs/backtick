import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A handler is handed what the DOM hands it, and which event that is comes
// from the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's
// opaque `EventTarget`, which is what makes reading a field's value sayable —
// the DOM expects a cast there, and this language has none.
it("eventHandlers", async (t) => {
  await snapshotCase(
    t,
    "eventHandlers",
    cs.create(
      "1s1l8g4skisa9:16:4",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      {
        code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<form><textarea></textarea><input><button>`);\nexport default $0 => {\n  const said = $0()("");\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling,\n      _el$4 = _el$3.nextSibling;\n    _el$.addEventListener("submit", event => {\n      event.preventDefault();\n      said[1](event.type + " " + event.cancelable);\n    });\n    _el$2.$$input = event => said[1](event.currentTarget.value);\n    _el$3.$$input = event => said[1](event.currentTarget.value);\n    _el$4.$$click = event => said[1](event.clientX + " " + event.currentTarget.tagName);\n    _$insert(_el$4, () => said[0]());\n    return _el$;\n  })();\n};\n_$delegateEvents(["input", "click"]);',
        map: '{"version":3,"mappings":";;;;eAeOA,EAAA;EACD,MAAMC,IAAI,GAAGD,EAAA,EAAa,CAAC,EAAE,CAAC;EAE9B;IAAA,IAAAE,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;IAAAL,IAAA,CAAAO,gBAAA,WAEeC,KAAK,IAAI;MAClBA,KAAK,CAACC,cAAc,EAAE;MACtBV,IAAI,CAAC,CAAC,CAAC,CAACS,KAAK,CAACE,IAAI,GAAG,GAAG,GAAGF,KAAK,CAACG,UAAU,CAAC;IAC9C,CAAC;IAAAT,KAAA,CAAAU,OAAA,GAEmBJ,KAAK,IAAKT,IAAI,CAAC,CAAC,CAAC,CAACS,KAAK,CAACK,aAAa,CAACC,KAAK,CAAC;IAAAV,KAAA,CAAAQ,OAAA,GAC/CJ,KAAK,IAAKT,IAAI,CAAC,CAAC,CAAC,CAACS,KAAK,CAACK,aAAa,CAACC,KAAK,CAAC;IAAAR,KAAA,CAAAS,OAAA,GAEjDP,KAAK,IACbT,IAAI,CAAC,CAAC,CAAC,CAACS,KAAK,CAACQ,OAAO,GAAG,GAAG,GAAGR,KAAK,CAACK,aAAa,CAACI,OAAO,CAC3D;IAAAC,QAAA,CAAAZ,KAAA,QAECP,IAAI,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAC,IAAA;EAAA;AAIlB,CAAC;AAAAmB,gBAAA","names":["$0","said","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","addEventListener","event","preventDefault","type","cancelable","$$input","currentTarget","value","$$click","clientX","tagName","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["event-handlers.test.tsx"]}',
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
        ],
        exportAt: 257,
      },
    ),
  );
});
