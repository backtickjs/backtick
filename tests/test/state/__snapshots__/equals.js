import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
// Each reader logs when it runs, so a test counts the runs by counting the
// logs, and reads what was logged.
let logged = [];
const log = globalThis.window.console.log;
beforeEach(() => {
  logged = [];
  globalThis.window.console.log = (...values) => {
    logged.push(values);
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});
const press = () => userEvent.click(screen.getByRole("button"));
describe("equals", () => {
  it("keeps a memo's readers from updating for an equal value", async () => {
    await render(
      cs.create(
        "274064prm9jpl:28:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: createMemo, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>add</button><p>`);\nexport default ($0, $1, $2) => {\n  const n = $0()(1);\n  const size = $1()(() => ({\n    isBig: n[0]() > 2,\n    n: n[0]()\n  }), undefined, {\n    equals: (previous, next) => previous.isBig === next.isBig\n  });\n  const label = () => {\n    $2().console.log();\n    return size().isBig ? "big" : "small";\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => n[1](n[0]() + 1);\n    _$insert(_el$3, label);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eA2BS,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACD,MAAMC,CAAC,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EAC1B,MAAMI,IAAI,GAAGH,EAAA,EAAW,CACtB,OAAO;IAAEI,KAAK,EAAEF,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;IAAEA,CAAC,EAAEA,CAAC,CAAC,CAAC,CAAC;EAAE,CAAE,CAAC,EACxCG,SAAS,EACT;IAAEC,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI,KAAKD,QAAQ,CAACH,KAAK,KAAKI,IAAI,CAACJ;EAAK,CAAE,CAC9D;EACD,MAAMK,KAAK,GAAGA,CAAA,KAAK;IACjBR,EAAA,EAAO,CAACS,OAAO,CAACC,GAAG,EAAE;IACrB,OAAOR,IAAI,EAAE,CAACC,KAAK,GAAG,KAAK,GAAG,OAAO;EACvC,CAAC;EACD;IAAA,IAAAQ,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMhB,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAAiB,QAAA,CAAAH,KAAA,EACnCP,KAAK;IAAA,OAAAG,IAAA;EAAA;AAGf,CAAC;AAAAQ,gBAAA","names":["$0","$1","$2","n","size","isBig","undefined","equals","previous","next","label","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["equals.test.tsx"]}',
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
          exportAt: 243,
        },
      ),
    );
    assert.equal(logged.length, 1);
    // A new object, but `isBig` is still false.
    await press();
    assert.equal(logged.length, 1);
    await press();
    assert.equal(logged.length, 2);
    assert.ok(screen.getByText("big"));
  });
  it("keeps a signal's readers from updating for an equal value", async () => {
    await render(
      cs.create(
        "274064prm9jpl:60:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>same</button><p>`);\nexport default ($0, $1) => {\n  const point = $0()({\n    x: 1\n  }, {\n    equals: (previous, next) => previous.x === next.x\n  });\n  const label = () => {\n    $1().console.log();\n    return "x " + point[0]().x;\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => point[1]({\n      x: point[0]().x\n    });\n    _$insert(_el$3, label);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eA2DS,CAAAA,EAAA,EAAAC,EAAA;EACD,MAAMC,KAAK,GAAGF,EAAA,EAAa,CACzB;IAAEG,CAAC,EAAE;EAAC,CAAE,EACR;IAAEC,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI,KAAKD,QAAQ,CAACF,CAAC,KAAKG,IAAI,CAACH;EAAC,CAAE,CACtD;EACD,MAAMI,KAAK,GAAGA,CAAA,KAAK;IACjBN,EAAA,EAAO,CAACO,OAAO,CAACC,GAAG,EAAE;IACrB,OAAO,IAAI,GAAGP,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC,CAAC;EAC5B,CAAC;EACD;IAAA,IAAAO,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMd,KAAK,CAAC,CAAC,CAAC,CAAC;MAAEC,CAAC,EAAED,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC;IAAC,CAAE,CAAC;IAAAc,QAAA,CAAAH,KAAA,EAGhDP,KAAK;IAAA,OAAAG,IAAA;EAAA;AAGf,CAAC;AAAAQ,gBAAA","names":["$0","$1","point","x","equals","previous","next","label","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["equals.test.tsx"]}',
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
          exportAt: 244,
        },
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is handed the previous and the next value", async () => {
    await render(
      cs.create(
        "274064prm9jpl:85:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<button>`);\nexport default ($0, $1) => {\n  const n = $0()(1, {\n    equals: (previous, next) => {\n      $1().console.log(previous, next);\n      return previous === next;\n    }\n  });\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => n[1](2);\n    _$insert(_el$, () => "n " + n[0]());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eAoFS,CAAAA,EAAA,EAAAC,EAAA;EACD,MAAMC,CAAC,GAAGF,EAAA,EAAa,CAAC,CAAC,EAAE;IACzBG,MAAM,EAAEA,CAACC,QAAQ,EAAEC,IAAI,KAAI;MACzBJ,EAAA,EAAO,CAACK,OAAO,CAACC,GAAG,CAACH,QAAQ,EAAEC,IAAI,CAAC;MACnC,OAAOD,QAAQ,KAAKC,IAAI;IAC1B;GACD,CAAC;EACF;IAAA,IAAAG,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GAAwB,MAAMR,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAAAS,QAAA,CAAAH,IAAA,QAAG,IAAI,GAAGN,CAAC,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAM,IAAA;EAAA;AACvD,CAAC;AAAAI,gBAAA","names":["$0","$1","n","equals","previous","next","console","log","_el$","_tmpl$","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["equals.test.tsx"]}',
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
          exportAt: 223,
        },
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });
  it("is `===` when left out, so the same number doesn't update", async () => {
    await render(
      cs.create(
        "274064prm9jpl:102:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>same</button><p>`);\nexport default ($0, $1) => {\n  const n = $0()(1);\n  const label = () => {\n    $1().console.log();\n    return "n " + n[0]();\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => n[1](1);\n    _$insert(_el$3, label);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eAqGS,CAAAA,EAAA,EAAAC,EAAA;EACD,MAAMC,CAAC,GAAGF,EAAA,EAAa,CAAC,CAAC,CAAC;EAC1B,MAAMG,KAAK,GAAGA,CAAA,KAAK;IACjBF,EAAA,EAAO,CAACG,OAAO,CAACC,GAAG,EAAE;IACrB,OAAO,IAAI,GAAGH,CAAC,CAAC,CAAC,CAAC,EAAE;EACtB,CAAC;EACD;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMV,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAAAW,QAAA,CAAAH,KAAA,EAC1BP,KAAK;IAAA,OAAAG,IAAA;EAAA;AAGf,CAAC;AAAAQ,gBAAA","names":["$0","$1","n","label","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["equals.test.tsx"]}',
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
          exportAt: 244,
        },
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is `===` when left out, so a new object always updates", async () => {
    await render(
      cs.create(
        "274064prm9jpl:122:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>same</button><p>`);\nexport default ($0, $1) => {\n  const point = $0()({\n    x: 1\n  });\n  const label = () => {\n    $1().console.log();\n    return "x " + point[0]().x;\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => point[1]({\n      x: point[0]().x\n    });\n    _$insert(_el$3, label);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eAyHS,CAAAA,EAAA,EAAAC,EAAA;EACD,MAAMC,KAAK,GAAGF,EAAA,EAAa,CAAC;IAAEG,CAAC,EAAE;EAAC,CAAE,CAAC;EACrC,MAAMC,KAAK,GAAGA,CAAA,KAAK;IACjBH,EAAA,EAAO,CAACI,OAAO,CAACC,GAAG,EAAE;IACrB,OAAO,IAAI,GAAGJ,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC,CAAC;EAC5B,CAAC;EACD;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMX,KAAK,CAAC,CAAC,CAAC,CAAC;MAAEC,CAAC,EAAED,KAAK,CAAC,CAAC,CAAC,EAAE,CAACC;IAAC,CAAE,CAAC;IAAAW,QAAA,CAAAH,KAAA,EAGhDP,KAAK;IAAA,OAAAG,IAAA;EAAA;AAGf,CAAC;AAAAQ,gBAAA","names":["$0","$1","point","x","label","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["equals.test.tsx"]}',
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
          exportAt: 244,
        },
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
