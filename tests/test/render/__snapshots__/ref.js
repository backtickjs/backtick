import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    render(
      await evaluate(
        cs.create(
          "2qhvwewm5e0a3:14:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '($splice0) => () => {\n    const field = $splice0()(null);\n    return (<div>\n              <input aria-label="name" ref={(element) => field[1](element)}/>\n              <button onclick={() => field[0]()?.focus()}>edit</button>\n            </div>);\n}',
          '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"AAaW,cAAA,GAAG,EAAE;IACN,MAAM,KAAK,GAAG,UAAa,CAA0B,IAAI,CAAC,CAAC;IAC3D,OAAO,CACL,CAAC,GAAG,CACF;cAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,CAAC,OAAO,EAAE,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,CAAC,EAC7D;cAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,EAAE,KAAK,EAAE,CAAC,CAAC,IAAI,EAAE,MAAM,CAC1D;YAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        ),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("focuses once in place, through onMount", async () => {
    render(
      await evaluate(
        cs.create(
          "2qhvwewm5e0a3:32:8",
          { params: [{ kind: "splice", value: onMount, bindings: [] }] },
          '($splice0) => () => {\n    return (<input aria-label="name" ref={(element) => $splice0()(() => element.focus())}/>);\n}',
          '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"AA+BW,cAAA,GAAG,EAAE;IACN,OAAO,CACL,CAAC,KAAK,CACJ,UAAU,CAAC,MAAM,CACjB,GAAG,CAAC,CAAC,CAAC,OAAO,EAAE,EAAE,CAAC,UAAQ,CAAC,GAAG,EAAE,CAAC,OAAO,CAAC,KAAK,EAAE,CAAC,CAAC,EAClD,CACH,CAAC;AACJ,CAAC"}',
        ),
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("is not written as an attribute", async () => {
    render(
      await evaluate(
        cs.create(
          "2qhvwewm5e0a3:46:26",
          { params: [] },
          '() => () => <input aria-label="name" ref={() => { }}/>',
          '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"AA6C6B,MAAA,GAAG,EAAE,CAAC,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,EAAG"}',
        ),
      ),
    );
    assert.equal(screen.getByLabelText("name").hasAttribute("ref"), false);
  });
  describe("is called once", () => {
    let calls = 0;
    const log = globalThis.window.console.log;
    beforeEach(() => {
      calls = 0;
      globalThis.window.console.log = () => {
        calls = calls + 1;
      };
    });
    afterEach(() => {
      globalThis.window.console.log = log;
    });
    // Drawn by a conditional, whose computation re-runs whenever it reads
    // something that changes, so a tracked read in `ref` would draw the
    // element again.
    it("even when a signal it read changes", async () => {
      render(
        await evaluate(
          cs.create(
            "2qhvwewm5e0a3:69:10",
            { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
            '($splice0) => () => {\n    const shown = $splice0()(true);\n    const n = $splice0()(0);\n    return (<div>\n                <button onclick={() => n[1](n[0]() + 1)}>\n                  {"n " + n[0]()}\n                </button>\n                {shown[0]() ? (<p ref={() => window.console.log(n[0]())}>shown</p>) : null}\n              </div>);\n}',
            '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"AAoEa,cAAA,GAAG,EAAE;IACN,MAAM,KAAK,GAAG,UAAa,CAAC,IAAI,CAAC,CAAC;IAClC,MAAM,CAAC,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,OAAO,CACL,CAAC,GAAG,CACF;gBAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CACtC;kBAAA,CAAC,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAChB;gBAAA,EAAE,MAAM,CACR;gBAAA,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CACZ,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,EAAE,CAAC,MAAM,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,CACpD,CAAC,CAAC,CAAC,IAAI,CACV;cAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
          ),
        ),
      );
      const shownText = screen.getByText("shown");
      await userEvent.click(screen.getByRole("button"));
      assert.equal(screen.getByRole("button").textContent, "n 1");
      assert.equal(calls, 1);
      assert.equal(screen.getByText("shown"), shownText);
    });
  });
});
