import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
// What the page held each time a script logged, read through the console
// `onMount` reaches from a script.
async function logged(draw) {
  const seen = [];
  const log = globalThis.window.console.log;
  globalThis.window.console.log = () => {
    seen.push(document.body.textContent ?? "");
  };
  try {
    await draw();
  } finally {
    globalThis.window.console.log = log;
  }
  return seen;
}
describe("onMount", () => {
  it("runs once, after the drawing is in the page", async () => {
    const seen = await logged(() =>
      render(
        cs.create(
          "20lmqniw1759i:29:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: onMount, bindings: [] },
              { kind: "splice", value: window, bindings: [] },
            ],
          },
          {
            code: 'export default ($0, $1, $2) => {\n    const count = $0()(0);\n    $1()(() => {\n        $2().console.log();\n        count[1](count[0]() + 1);\n    });\n    return <p>{"mounted " + count[0]()}</p>;\n};',
            map: '{"version":3,"file":"on-mount.test.jsx","sourceRoot":"","sources":["on-mount.test.tsx"],"names":[],"mappings":"eA4BW;IACD,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,IAAQ,CAAC,GAAG,EAAE;QACZ,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;IAC3B,CAAC,CAAC,CAAC;IACH,OAAO,CAAC,CAAC,CAAC,CAAC,UAAU,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;AAC1C,CAAC"}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
    );
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });
  it("runs at once when called from a handler", async () => {
    await render(
      cs.create(
        "20lmqniw1759i:45:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: onMount, bindings: [] },
          ],
        },
        {
          code: 'export default ($0, $1) => {\n    const said = $0()("not yet");\n    return (<button onclick={() => $1()(() => said[1]("ran"))}>\n            {said[0]()}\n          </button>);\n};',
          map: '{"version":3,"file":"on-mount.test.jsx","sourceRoot":"","sources":["on-mount.test.tsx"],"names":[],"mappings":"eA4CS;IACD,MAAM,IAAI,GAAG,IAAa,CAAC,SAAS,CAAC,CAAC;IACtC,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,IAAQ,CAAC,GAAG,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CACpD;YAAA,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CACZ;UAAA,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
