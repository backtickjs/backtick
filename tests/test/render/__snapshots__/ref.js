import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    await render(
      cs.create(
        "3o832a07bjdmm:13:6",
        { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
        {
          code: 'export default ($0) => {\n    const field = $0()(null);\n    return (<div>\n            <input aria-label="name" ref={(element) => field[1](element)}/>\n            <button onclick={() => field[0]()?.focus()}>edit</button>\n          </div>);\n};',
          map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"eAYS;IACD,MAAM,KAAK,GAAG,IAAa,CAA0B,IAAI,CAAC,CAAC;IAC3D,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,CAAC,OAAO,EAAE,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,CAAC,EAC7D;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,EAAE,KAAK,EAAE,CAAC,CAAC,IAAI,EAAE,MAAM,CAC1D;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("focuses once in place, through onMount", async () => {
    await render(
      cs.create(
        "3o832a07bjdmm:29:6",
        { params: [{ kind: "splice", value: onMount, bindings: [] }] },
        {
          code: 'export default ($0) => {\n    return (<input aria-label="name" ref={(element) => $0()(() => element.focus())}/>);\n};',
          map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"eA4BS;IACD,OAAO,CACL,CAAC,KAAK,CACJ,UAAU,CAAC,MAAM,CACjB,GAAG,CAAC,CAAC,CAAC,OAAO,EAAE,EAAE,CAAC,IAAQ,CAAC,GAAG,EAAE,CAAC,OAAO,CAAC,KAAK,EAAE,CAAC,CAAC,EAClD,CACH,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("is not written as an attribute", async () => {
    await render(
      cs.create(
        "3o832a07bjdmm:42:17",
        { params: [] },
        {
          code: 'export default () => <input aria-label="name" ref={() => { }}/>;',
          map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"eAyCoB,MAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,EAAG"}',
        },
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
      await render(
        cs.create(
          "3o832a07bjdmm:64:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: window, bindings: [] },
            ],
          },
          {
            code: 'export default ($0, $1) => {\n    const shown = $0()(true);\n    const n = $0()(0);\n    return (<div>\n              <button onclick={() => n[1](n[0]() + 1)}>\n                {"n " + n[0]()}\n              </button>\n              {shown[0]() ? (<p ref={() => $1().console.log(n[0]())}>shown</p>) : null}\n            </div>);\n};',
            map: '{"version":3,"file":"ref.test.jsx","sourceRoot":"","sources":["render/ref.test.tsx"],"names":[],"mappings":"eA+DW;IACD,MAAM,KAAK,GAAG,IAAa,CAAC,IAAI,CAAC,CAAC;IAClC,MAAM,CAAC,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,OAAO,CACL,CAAC,GAAG,CACF;cAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CACtC;gBAAA,CAAC,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAChB;cAAA,EAAE,MAAM,CACR;cAAA,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CACZ,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,EAAE,CAAC,IAAO,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CAAC,CACrD,CAAC,CAAC,CAAC,IAAI,CACV;YAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
          },
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
