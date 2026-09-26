import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "@backtickjs/solid-js";
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
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
describe("onCleanup", () => {
  it("runs when the drawing is removed", async () => {
    const { unmount } = await render(
      cs.create(
        "2ysuv1f973jip:28:6",
        {
          params: [
            { kind: "splice", value: onCleanup, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<p>drawn`);\nexport default ($0, $1) => {\n  $0()(() => $1().console.log());\n  return _tmpl$();\n};',
          map: '{"version":3,"mappings":";;eA2BS,CAAAA,EAAA,EAAAC,EAAA;EACDD,EAAA,EAAU,CAAC,MAAMC,EAAA,EAAO,CAACC,OAAO,CAACC,GAAG,EAAE,CAAC;EACvC,OAAAC,MAAA;AACF,CAAC","names":["$0","$1","console","log","_tmpl$"],"ignoreList":[],"sources":["on-cleanup.test.tsx"]}',
          imports: [
            {
              from: "solid-js/web",
              range: [0, 54],
              bindings: [{ name: "template", local: "_$template" }],
            },
          ],
          exportAt: 105,
        },
      ),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });
  it("runs before a memo calculates again", async () => {
    await render(
      cs.create(
        "2ysuv1f973jip:40:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: createMemo, bindings: [] },
            { kind: "splice", value: onCleanup, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<button>`);\nexport default ($0, $1, $2, $3) => {\n  const n = $0()(1);\n  const doubled = $1()(() => {\n    $2()(() => $3().console.log());\n    return n[0]() * 2;\n  });\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => n[1](n[0]() + 1);\n    _$insert(_el$, doubled);\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;;eAuCS,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACD,MAAMC,CAAC,GAAGJ,EAAA,EAAa,CAAC,CAAC,CAAC;EAC1B,MAAMK,OAAO,GAAGJ,EAAA,EAAW,CAAC,MAAK;IAC/BC,EAAA,EAAU,CAAC,MAAMC,EAAA,EAAO,CAACG,OAAO,CAACC,GAAG,EAAE,CAAC;IACvC,OAAOH,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;EACnB,CAAC,CAAC;EACF;IAAA,IAAAI,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GACmB,MAAMN,CAAC,CAAC,CAAC,CAAC,CAACA,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAAAO,QAAA,CAAAH,IAAA,EAAGH,OAAO;IAAA,OAAAG,IAAA;EAAA;AAErD,CAAC;AAAAI,gBAAA","names":["$0","$1","$2","$3","n","doubled","console","log","_el$","_tmpl$","$$click","_$insert","_$delegateEvents"],"ignoreList":[],"sources":["on-cleanup.test.tsx"]}',
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
    assert.equal(runs, 0);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    assert.equal(screen.getByRole("button").textContent, "4");
  });
  it("stops what onMount started", async (t) => {
    // Every interval the script starts is cleared once the test ends, so a
    // cleanup that never ran fails the test rather than hanging the run.
    const started = [];
    const setInterval = globalThis.window.setInterval;
    t.mock.method(globalThis.window, "setInterval", (handler, timeout) => {
      const id = setInterval(handler, timeout);
      started.push(id);
      return id;
    });
    t.after(() => started.forEach((id) => globalThis.window.clearInterval(id)));
    const { unmount } = await render(
      cs.create(
        "2ysuv1f973jip:74:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: onMount, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
            { kind: "splice", value: onCleanup, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<p>ticking`);\nexport default ($0, $1, $2, $3) => {\n  const timer = $0()(0);\n  $1()(() => {\n    timer[1]($2().setInterval(() => $2().console.log(), 5));\n  });\n  $3()(() => $2().clearInterval(timer[0]()));\n  return _tmpl$();\n};',
          map: '{"version":3,"mappings":";;eAyES,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACD,MAAMC,KAAK,GAAGJ,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9BC,EAAA,EAAQ,CAAC,MAAK;IACZG,KAAK,CAAC,CAAC,CAAC,CAACF,EAAA,EAAO,CAACG,WAAW,CAAC,MAAMH,EAAA,EAAO,CAACI,OAAO,CAACC,GAAG,EAAE,EAAE,CAAC,CAAC,CAAC;EAC/D,CAAC,CAAC;EACFJ,EAAA,EAAU,CAAC,MAAMD,EAAA,EAAO,CAACM,aAAa,CAACJ,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC;EACnD,OAAAK,MAAA;AACF,CAAC","names":["$0","$1","$2","$3","timer","setInterval","console","log","clearInterval","_tmpl$"],"ignoreList":[],"sources":["on-cleanup.test.tsx"]}',
          imports: [
            {
              from: "solid-js/web",
              range: [0, 54],
              bindings: [{ name: "template", local: "_$template" }],
            },
          ],
          exportAt: 107,
        },
      ),
    );
    await wait(40);
    assert.ok(runs > 0);
    unmount();
    const stopped = runs;
    await wait(40);
    assert.equal(runs, stopped);
  });
  it("never runs when called from a handler", async () => {
    const { unmount } = await render(
      cs.create(
        "2ysuv1f973jip:94:6",
        {
          params: [
            { kind: "splice", value: onCleanup, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<button>press`);\nexport default ($0, $1) => {\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => $0()(() => $1().console.log());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
          map: '{"version":3,"mappings":";;;eA6FS,CAAAA,EAAA,EAAAC,EAAA;EACD;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GACmB,MAAMJ,EAAA,EAAU,CAAC,MAAMC,EAAA,EAAO,CAACI,OAAO,CAACC,GAAG,EAAE,CAAC;IAAA,OAAAJ,IAAA;EAAA;AAIlE,CAAC;AAAAK,gBAAA","names":["$0","$1","_el$","_tmpl$","$$click","console","log","_$delegateEvents"],"ignoreList":[],"sources":["on-cleanup.test.tsx"]}',
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
          ],
          exportAt: 177,
        },
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
