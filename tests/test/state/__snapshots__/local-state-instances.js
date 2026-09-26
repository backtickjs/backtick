import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a signal of its own.
async function OwnCounter() {
  return cs.create(
    "2vruvr5rxa3mr:13:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { style as _$style } from "solid-js/web";\nimport { effect as _$effect } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>press`);\nexport default $0 => {\n  const size = $0()(16);\n  return (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => {\n      size[1](size[0]() + 1);\n    };\n    _$effect(_$p => _$style(_el$, "font-size: " + size[0]() + "px", _$p));\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
      map: '{"version":3,"mappings":";;;;;eAYYA,EAAA;EACR,MAAMC,IAAI,GAAGD,EAAA,EAAa,CAAC,EAAE,CAAC;EAC9B;IAAA,IAAAE,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GAGa,MAAK;MACZH,IAAI,CAAC,CAAC,CAAC,CAACA,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IACxB,CAAC;IAAAI,QAAA,CAAAC,GAAA,IAAAC,OAAA,CAAAL,IAAA,EAHM,aAAa,GAAGD,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI,EAAAK,GAAA;IAAA,OAAAJ,IAAA;EAAA;AAQ7C,CAAC;AAAAM,gBAAA","names":["$0","size","_el$","_tmpl$","$$click","_$effect","_$p","_$style","_$delegateEvents"],"ignoreList":[],"sources":["local-state-instances.test.tsx"]}',
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
          range: [122, 170],
          bindings: [{ name: "style", local: "_$style" }],
        },
        {
          from: "solid-js/web",
          range: [171, 221],
          bindings: [{ name: "effect", local: "_$effect" }],
        },
      ],
      exportAt: 275,
    },
  );
}
const instances = _jsxs("div", {
  children: [_jsx(OwnCounter, {}), _jsx(OwnCounter, {})],
});
describe("local state", () => {
  it("two invocations of one component hold independent signals", async () => {
    const view = await drawn(instances);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });
});
it("instances", async (t) => {
  await snapshotCase(t, "instances", instances);
});
