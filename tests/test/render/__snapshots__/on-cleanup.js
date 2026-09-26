import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "@backtickjs/solid-js";
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
        "2rxjwiqkd2ht7:27:6",
        { params: [{ kind: "splice", value: onCleanup, bindings: [] }] },
        "($splice0) => {\n    $splice0()(() => window.console.log());\n    return <p>drawn</p>;\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["render/on-cleanup.test.tsx"],"names":[],"mappings":"AA0BS;IACD,UAAU,CAAC,GAAG,EAAE,CAAC,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC;IACvC,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,CAAC;AACtB,CAAC"}',
      ),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });
  it("runs before a memo calculates again", async () => {
    await render(
      cs.create(
        "2rxjwiqkd2ht7:39:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: createMemo, bindings: [] },
            { kind: "splice", value: onCleanup, bindings: [] },
          ],
        },
        "($splice0, $splice1, $splice2) => {\n    const n = $splice0()(1);\n    const doubled = $splice1()(() => {\n        $splice2()(() => window.console.log());\n        return n[0]() * 2;\n    });\n    return (<button onclick={() => n[1](n[0]() + 1)}>{doubled()}</button>);\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["render/on-cleanup.test.tsx"],"names":[],"mappings":"AAsCS;IACD,MAAM,CAAC,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,OAAO,GAAG,UAAW,CAAC,GAAG,EAAE;QAC/B,UAAU,CAAC,GAAG,EAAE,CAAC,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC;QACvC,OAAO,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IACpB,CAAC,CAAC,CAAC;IACH,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,EAAE,MAAM,CAAC,CAC9D,CAAC;AACJ,CAAC"}',
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
        "2rxjwiqkd2ht7:73:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: onMount, bindings: [] },
            { kind: "splice", value: onCleanup, bindings: [] },
          ],
        },
        "($splice0, $splice1, $splice2) => {\n    const timer = $splice0()(0);\n    $splice1()(() => {\n        timer[1](window.setInterval(() => window.console.log(), 5));\n    });\n    $splice2()(() => window.clearInterval(timer[0]()));\n    return <p>ticking</p>;\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["render/on-cleanup.test.tsx"],"names":[],"mappings":"AAwES;IACD,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,UAAQ,CAAC,GAAG,EAAE;QACZ,KAAK,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,WAAW,CAAC,GAAG,EAAE,CAAC,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC;IAC9D,CAAC,CAAC,CAAC;IACH,UAAU,CAAC,GAAG,EAAE,CAAC,MAAM,CAAC,aAAa,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACnD,OAAO,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC;AACxB,CAAC"}',
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
        "2rxjwiqkd2ht7:93:6",
        { params: [{ kind: "splice", value: onCleanup, bindings: [] }] },
        "($splice0) => {\n    return (<button onclick={() => $splice0()(() => window.console.log())}>\n            press\n          </button>);\n}",
        '{"version":3,"file":"on-cleanup.test.jsx","sourceRoot":"","sources":["render/on-cleanup.test.tsx"],"names":[],"mappings":"AA4FS;IACD,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,UAAU,CAAC,GAAG,EAAE,CAAC,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC,CAAC,CAC5D;;UACF,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC"}',
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
