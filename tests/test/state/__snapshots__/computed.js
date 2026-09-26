import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
// Each script logs where it runs, so a test counts the runs by counting the
// logs.
let runs = 0;
const log = globalThis.window.console.log;
beforeEach(() => {
  runs = 0;
  globalThis.window.console.log = () => {
    runs = runs + 1;
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});
describe("computed", () => {
  it("runs once per change, however many read it", async () => {
    await render(
      cs.create(
        "p1tfh6cjnunl:26:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: createMemo, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>add</button><p></p><p></p><p>`);\nexport default ($0, $1, $2) => {\n  const n = $0()(1);\n  const doubled = $1()(() => {\n    $2().console.log();\n    return n[0]() * 2;\n  });\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling,\n      _el$4 = _el$3.nextSibling,\n      _el$5 = _el$4.nextSibling;\n    _el$2.$$click = () => n[1](n[0]() + 1);\n    _$insert(_el$3, () => "a " + doubled());\n    _$insert(_el$4, () => "b " + doubled());\n    _$insert(_el$5, () => "c " + doubled());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eAyBS,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACD,MAAMC,CAAC,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EAC1B,MAAMI,OAAO,GAAGH,EAAA,EAAW,CAAC,MAAK;IAC/BC,EAAA,EAAO,CAACG,OAAO,CAACC,GAAG,EAAE;IACrB,OAAOH,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;EACnB,CAAC,CAAC;EACF;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;MAAAE,KAAA,GAAAD,KAAA,CAAAD,WAAA;IAAAH,KAAA,CAAAM,OAAA,GAEqB,MAAMZ,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAAa,QAAA,CAAAL,KAAA,QACnC,IAAI,GAAGP,OAAO,EAAE;IAAAY,QAAA,CAAAH,KAAA,QAChB,IAAI,GAAGT,OAAO,EAAE;IAAAY,QAAA,CAAAF,KAAA,QAChB,IAAI,GAAGV,OAAO,EAAE;IAAA,OAAAG,IAAA;EAAA;AAG1B,CAAC;AAAAU,gBAAA","names":["$0","$1","$2","n","doubled","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","_el$5","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["computed.test.tsx"]}',
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
    assert.equal(runs, 1);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("a 4"));
    assert.ok(screen.getByText("c 4"));
  });
  it("passes a change on only when its value changes", async () => {
    await render(
      cs.create(
        "p1tfh6cjnunl:52:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: createMemo, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><button>add</button><p>`);\nexport default ($0, $1, $2) => {\n  const n = $0()(1);\n  const isBig = $1()(() => n[0]() > 2);\n  const label = () => {\n    $2().console.log();\n    return isBig() ? "big" : "small";\n  };\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling;\n    _el$2.$$click = () => n[1](n[0]() + 1);\n    _$insert(_el$3, label);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eAmDS,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACD,MAAMC,CAAC,GAAGH,EAAA,EAAa,CAAC,CAAC,CAAC;EAC1B,MAAMI,KAAK,GAAGH,EAAA,EAAW,CAAC,MAAME,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;EAC3C,MAAME,KAAK,GAAGA,CAAA,KAAK;IACjBH,EAAA,EAAO,CAACI,OAAO,CAACC,GAAG,EAAE;IACrB,OAAOH,KAAK,EAAE,GAAG,KAAK,GAAG,OAAO;EAClC,CAAC;EACD;IAAA,IAAAI,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAH,KAAA,CAAAI,OAAA,GAEqB,MAAMX,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAAY,QAAA,CAAAH,KAAA,EACnCP,KAAK;IAAA,OAAAG,IAAA;EAAA;AAGf,CAAC;AAAAQ,gBAAA","names":["$0","$1","$2","n","isBig","label","console","log","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["computed.test.tsx"]}',
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
    assert.equal(runs, 1);
    // 1 to 2: still small, so the reader doesn't run.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    // 2 to 3: big now.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("big"));
  });
});
