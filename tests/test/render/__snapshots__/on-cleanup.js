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
          code: "export default ($0, $1) => {\n    $0()(() => $1().console.log());\n    return <p>drawn</p>;\n};",
          map: '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"eA2BS;IACD,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC;IACxC,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,CAAC;AACtB,CAAC"}',
          imports: [],
          exportAt: 0,
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
          code: "export default ($0, $1, $2, $3) => {\n    const n = $0()(1);\n    const doubled = $1()(() => {\n        $2()(() => $3().console.log());\n        return n[0]() * 2;\n    });\n    return (<button onclick={() => n[1](n[0]() + 1)}>{doubled()}</button>);\n};",
          map: '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"eAuCS;IACD,MAAM,CAAC,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,OAAO,GAAG,IAAW,CAAC,GAAG,EAAE;QAC/B,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC;QACxC,OAAO,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IACpB,CAAC,CAAC,CAAC;IACH,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,EAAE,MAAM,CAAC,CAC9D,CAAC;AACJ,CAAC"}',
          imports: [],
          exportAt: 0,
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
          code: "export default ($0, $1, $2, $3) => {\n    const timer = $0()(0);\n    $1()(() => {\n        timer[1]($2().setInterval(() => $2().console.log(), 5));\n    });\n    $3()(() => $2().clearInterval(timer[0]()));\n    return <p>ticking</p>;\n};",
          map: '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"eAyES;IACD,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,IAAQ,CAAC,GAAG,EAAE;QACZ,KAAK,CAAC,CAAC,CAAC,CAAC,IAAO,CAAC,WAAW,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC;IAChE,CAAC,CAAC,CAAC;IACH,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,aAAa,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACpD,OAAO,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC;AACxB,CAAC"}',
          imports: [],
          exportAt: 0,
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
          code: "export default ($0, $1) => {\n    return (<button onclick={() => $0()(() => $1().console.log())}>\n            press\n          </button>);\n};",
          map: '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["on-cleanup.test.tsx"],"names":[],"mappings":"eA6FS;IACD,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,IAAU,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC,CAC7D;;UACF,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
