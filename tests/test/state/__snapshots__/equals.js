import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { draw } from "@backtickjs/solid-js/testing";
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
    render(
      await draw(
        cs.create(
          "3sz3prcovgob5:29:8",
          {
            params: [
              { kind: "splice", value: createSignal, bindings: [] },
              { kind: "splice", value: createMemo, bindings: [] },
            ],
          },
          '($splice0, $splice1) => () => {\n    const n = $splice0()(1);\n    const size = $splice1()(() => ({ isBig: n[0]() > 2, n: n[0]() }), undefined, { equals: (previous, next) => previous.isBig === next.isBig });\n    const label = () => {\n        window.console.log();\n        return size().isBig ? "big" : "small";\n    };\n    return (<div>\n              <button onclick={() => n[1](n[0]() + 1)}>add</button>\n              <p>{label()}</p>\n            </div>);\n}',
          '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["state/equals.test.tsx"],"names":[],"mappings":"AA4BW,wBAAA,GAAG,EAAE;IACN,MAAM,CAAC,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,IAAI,GAAG,UAAW,CACtB,GAAG,EAAE,CAAC,CAAC,EAAE,KAAK,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,EACxC,SAAS,EACT,EAAE,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE,CAAC,QAAQ,CAAC,KAAK,KAAK,IAAI,CAAC,KAAK,EAAE,CAC9D,CAAC;IACF,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACrB,OAAO,IAAI,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,OAAO,CAAC;IACxC,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;cAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CACpD;cAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;YAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        ),
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
    render(
      await draw(
        cs.create(
          "3sz3prcovgob5:63:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '($splice0) => () => {\n    const point = $splice0()({ x: 1 }, { equals: (previous, next) => previous.x === next.x });\n    const label = () => {\n        window.console.log();\n        return "x " + point[0]().x;\n    };\n    return (<div>\n              <button onclick={() => point[1]({ x: point[0]().x })}>\n                same\n              </button>\n              <p>{label()}</p>\n            </div>);\n}',
          '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["state/equals.test.tsx"],"names":[],"mappings":"AA8DW,cAAA,GAAG,EAAE;IACN,MAAM,KAAK,GAAG,UAAa,CACzB,EAAE,CAAC,EAAE,CAAC,EAAE,EACR,EAAE,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE,CAAC,QAAQ,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,EAAE,CACtD,CAAC;IACF,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACrB,OAAO,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAC7B,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;cAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CACnD;;cACF,EAAE,MAAM,CACR;cAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;YAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        ),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is handed the previous and the next value", async () => {
    render(
      await draw(
        cs.create(
          "3sz3prcovgob5:90:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '($splice0) => () => {\n    const n = $splice0()(1, {\n        equals: (previous, next) => {\n            window.console.log(previous, next);\n            return previous === next;\n        },\n    });\n    return <button onclick={() => n[1](2)}>{"n " + n[0]()}</button>;\n}',
          '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["state/equals.test.tsx"],"names":[],"mappings":"AAyFW,cAAA,GAAG,EAAE;IACN,MAAM,CAAC,GAAG,UAAa,CAAC,CAAC,EAAE;QACzB,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE;YACzB,MAAM,CAAC,OAAO,CAAC,GAAG,CAAC,QAAQ,EAAE,IAAI,CAAC,CAAC;YACnC,OAAO,QAAQ,KAAK,IAAI,CAAC;QAC3B,CAAC;KACF,CAAC,CAAC;IACH,OAAO,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,MAAM,CAAC,CAAC;AAClE,CAAC"}',
        ),
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });
  it("is `===` when left out, so the same number doesn't update", async () => {
    render(
      await draw(
        cs.create(
          "3sz3prcovgob5:109:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '($splice0) => () => {\n    const n = $splice0()(1);\n    const label = () => {\n        window.console.log();\n        return "n " + n[0]();\n    };\n    return (<div>\n              <button onclick={() => n[1](1)}>same</button>\n              <p>{label()}</p>\n            </div>);\n}',
          '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["state/equals.test.tsx"],"names":[],"mappings":"AA4GW,cAAA,GAAG,EAAE;IACN,MAAM,CAAC,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACrB,OAAO,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC;IACvB,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;cAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC5C;cAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;YAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        ),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is `===` when left out, so a new object always updates", async () => {
    render(
      await draw(
        cs.create(
          "3sz3prcovgob5:131:8",
          { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
          '($splice0) => () => {\n    const point = $splice0()({ x: 1 });\n    const label = () => {\n        window.console.log();\n        return "x " + point[0]().x;\n    };\n    return (<div>\n              <button onclick={() => point[1]({ x: point[0]().x })}>\n                same\n              </button>\n              <p>{label()}</p>\n            </div>);\n}',
          '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["state/equals.test.tsx"],"names":[],"mappings":"AAkIW,cAAA,GAAG,EAAE;IACN,MAAM,KAAK,GAAG,UAAa,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACtC,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,MAAM,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACrB,OAAO,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAC7B,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;cAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CACnD;;cACF,EAAE,MAAM,CACR;cAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;YAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        ),
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
