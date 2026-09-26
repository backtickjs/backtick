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
        '($0, $1, $2) => {\n    const n = $0()(1);\n    const doubled = $1()(() => {\n        $2().console.log();\n        return n[0]() * 2;\n    });\n    return (<div>\n            <button onclick={() => n[1](n[0]() + 1)}>add</button>\n            <p>{"a " + doubled()}</p>\n            <p>{"b " + doubled()}</p>\n            <p>{"c " + doubled()}</p>\n          </div>);\n}',
        '{"version":3,"file":"computed.test.jsx","sourceRoot":"","sources":["state/computed.test.tsx"],"names":[],"mappings":"AAyBS;IACD,MAAM,CAAC,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,OAAO,GAAG,IAAW,CAAC,GAAG,EAAE;QAC/B,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IACpB,CAAC,CAAC,CAAC;IACH,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CACpD;YAAA,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,OAAO,EAAE,CAAC,EAAE,CAAC,CACxB;YAAA,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,OAAO,EAAE,CAAC,EAAE,CAAC,CACxB;YAAA,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,OAAO,EAAE,CAAC,EAAE,CAAC,CAC1B;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
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
        '($0, $1, $2) => {\n    const n = $0()(1);\n    const isBig = $1()(() => n[0]() > 2);\n    const label = () => {\n        $2().console.log();\n        return isBig() ? "big" : "small";\n    };\n    return (<div>\n            <button onclick={() => n[1](n[0]() + 1)}>add</button>\n            <p>{label()}</p>\n          </div>);\n}',
        '{"version":3,"file":"computed.test.jsx","sourceRoot":"","sources":["state/computed.test.tsx"],"names":[],"mappings":"AAmDS;IACD,MAAM,CAAC,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,KAAK,GAAG,IAAW,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;IAC5C,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,KAAK,EAAE,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,OAAO,CAAC;IACnC,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CACpD;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
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
