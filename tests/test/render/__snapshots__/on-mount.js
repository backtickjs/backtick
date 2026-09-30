import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { draw } from "@backtickjs/solid-js/testing";
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
    const drawing = await draw(
      cs.create(
        "mb5ofx0gw7ls:28:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: onMount, bindings: [] },
          ],
        },
        '($splice0, $splice1) => () => {\n    const count = $splice0()(0);\n    $splice1()(() => {\n        window.console.log();\n        count[1](count[0]() + 1);\n    });\n    return <p>{"mounted " + count[0]()}</p>;\n}',
        '{"version":3,"file":"on-mount.test.jsx","sourceRoot":"","sources":["render/on-mount.test.tsx"],"names":[],"mappings":"AA2BS,wBAAA,GAAG,EAAE;IACN,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,UAAQ,CAAC,GAAG,EAAE;QACZ,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACrB,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;IAC3B,CAAC,CAAC,CAAC;IACH,OAAO,CAAC,CAAC,CAAC,CAAC,UAAU,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;AAC1C,CAAC"}',
      ),
    );
    const seen = await logged(async () => render(drawing));
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });
  it("runs at once when called from a handler", async () => {
    render(
      await draw(
        cs.create(
          "mb5ofx0gw7ls:45:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: onMount, bindings: [] },
            ],
          },
          '($splice0, $splice1) => () => {\n    const said = $splice0()("not yet");\n    return (<button onclick={() => $splice1()(() => said[1]("ran"))}>\n              {said[0]()}\n            </button>);\n}',
          '{"version":3,"file":"on-mount.test.jsx","sourceRoot":"","sources":["render/on-mount.test.tsx"],"names":[],"mappings":"AA4CW,wBAAA,GAAG,EAAE;IACN,MAAM,IAAI,GAAG,UAAa,CAAC,SAAS,CAAC,CAAC;IACtC,OAAO,CACL,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,UAAQ,CAAC,GAAG,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CACpD;cAAA,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CACZ;YAAA,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC"}',
        ),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
