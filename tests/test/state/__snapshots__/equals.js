import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createMemo, createSignal } from "@backtickjs/solid-js";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
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
    await render(
      cs.create(
        "274064prm9jpl:28:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: createMemo, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'export default ($0, $1, $2) => {\n    const n = $0()(1);\n    const size = $1()(() => ({ isBig: n[0]() > 2, n: n[0]() }), undefined, { equals: (previous, next) => previous.isBig === next.isBig });\n    const label = () => {\n        $2().console.log();\n        return size().isBig ? "big" : "small";\n    };\n    return (<div>\n            <button onclick={() => n[1](n[0]() + 1)}>add</button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eA2BS;IACD,MAAM,CAAC,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,IAAI,GAAG,IAAW,CACtB,GAAG,EAAE,CAAC,CAAC,EAAE,KAAK,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,EACxC,SAAS,EACT,EAAE,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE,CAAC,QAAQ,CAAC,KAAK,KAAK,IAAI,CAAC,KAAK,EAAE,CAC9D,CAAC;IACF,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,OAAO,CAAC;IACxC,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CACpD;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
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
    await render(
      cs.create(
        "274064prm9jpl:60:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'export default ($0, $1) => {\n    const point = $0()({ x: 1 }, { equals: (previous, next) => previous.x === next.x });\n    const label = () => {\n        $1().console.log();\n        return "x " + point[0]().x;\n    };\n    return (<div>\n            <button onclick={() => point[1]({ x: point[0]().x })}>\n              same\n            </button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eA2DS;IACD,MAAM,KAAK,GAAG,IAAa,CACzB,EAAE,CAAC,EAAE,CAAC,EAAE,EACR,EAAE,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE,CAAC,QAAQ,CAAC,CAAC,KAAK,IAAI,CAAC,CAAC,EAAE,CACtD,CAAC;IACF,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAC7B,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CACnD;;YACF,EAAE,MAAM,CACR;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is handed the previous and the next value", async () => {
    await render(
      cs.create(
        "274064prm9jpl:85:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'export default ($0, $1) => {\n    const n = $0()(1, {\n        equals: (previous, next) => {\n            $1().console.log(previous, next);\n            return previous === next;\n        },\n    });\n    return <button onclick={() => n[1](2)}>{"n " + n[0]()}</button>;\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eAoFS;IACD,MAAM,CAAC,GAAG,IAAa,CAAC,CAAC,EAAE;QACzB,MAAM,EAAE,CAAC,QAAQ,EAAE,IAAI,EAAE,EAAE;YACzB,IAAO,CAAC,OAAO,CAAC,GAAG,CAAC,QAAQ,EAAE,IAAI,CAAC,CAAC;YACpC,OAAO,QAAQ,KAAK,IAAI,CAAC;QAC3B,CAAC;KACF,CAAC,CAAC;IACH,OAAO,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,MAAM,CAAC,CAAC;AAClE,CAAC"}',
        },
      ),
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });
  it("is `===` when left out, so the same number doesn't update", async () => {
    await render(
      cs.create(
        "274064prm9jpl:102:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'export default ($0, $1) => {\n    const n = $0()(1);\n    const label = () => {\n        $1().console.log();\n        return "n " + n[0]();\n    };\n    return (<div>\n            <button onclick={() => n[1](1)}>same</button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eAqGS;IACD,MAAM,CAAC,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC3B,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC;IACvB,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CAC5C;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is `===` when left out, so a new object always updates", async () => {
    await render(
      cs.create(
        "274064prm9jpl:122:6",
        {
          params: [
            { kind: "splice", value: createSignal, bindings: [] },
            { kind: "splice", value: window, bindings: [] },
          ],
        },
        {
          code: 'export default ($0, $1) => {\n    const point = $0()({ x: 1 });\n    const label = () => {\n        $1().console.log();\n        return "x " + point[0]().x;\n    };\n    return (<div>\n            <button onclick={() => point[1]({ x: point[0]().x })}>\n              same\n            </button>\n            <p>{label()}</p>\n          </div>);\n};',
          map: '{"version":3,"file":"equals.test.jsx","sourceRoot":"","sources":["equals.test.tsx"],"names":[],"mappings":"eAyHS;IACD,MAAM,KAAK,GAAG,IAAa,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACtC,MAAM,KAAK,GAAG,GAAG,EAAE;QACjB,IAAO,CAAC,OAAO,CAAC,GAAG,EAAE,CAAC;QACtB,OAAO,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAC7B,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;YAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CACnD;;YACF,EAAE,MAAM,CACR;YAAA,CAAC,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,EAAE,CAAC,CACjB;UAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
        },
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
