import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// A signal crossing a component boundary: declared once by the script that
// draws the pair, handed to each child as a prop, so both read one storage. The
// signal is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }) =>
  _jsx("span", {
    style: cs.create(
      "sm4cgpukv0uc:17:11",
      { params: [{ kind: "splice", value: size, bindings: [] }] },
      {
        code: 'export default $0 => "font-size: " + $0()[0]() + "px";',
        map: '{"version":3,"mappings":"eAgBcA,EAAA,iBAAa,GAAGA,EAAA,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI","names":["$0"],"ignoreList":[],"sources":["local-state-prop.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
    onclick: cs.create(
      "sm4cgpukv0uc:18:13",
      { params: [{ kind: "splice", value: size, bindings: [] }] },
      {
        code: "export default $0 => () => {\n  $0()[1]($0()[0]() + 1);\n};",
        map: '{"version":3,"mappings":"eAiBgBA,EAAA,UAAK;EACfA,EAAA,EAAK,CAAC,CAAC,CAAC,CAACA,EAAA,EAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;AAC1B,CAAC","names":["$0"],"ignoreList":[],"sources":["local-state-prop.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
    children: "press",
  });
async function SharingPanel() {
  return cs.create(
    "sm4cgpukv0uc:27:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: SharedCounter },
      ],
    },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div>`);\nexport default ($0, $1) => {\n  const size = $0()(16);\n  return (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, _$createComponent($1, {\n      size: size\n    }), null);\n    _$insert(_el$, _$createComponent($1, {\n      size: size\n    }), null);\n    return _el$;\n  })();\n};',
      map: '{"version":3,"mappings":";;;;eA0BY,CAAAA,EAAA,EAAAC,EAAA;EACR,MAAMC,IAAI,GAAGF,EAAA,EAAa,CAAC,EAAE,CAAC;EAC9B;IAAA,IAAAG,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,EAAAG,iBAAA,CAEKL,EAAa;MAACC,IAAI,EAAEA;IAAI;IAAAG,QAAA,CAAAF,IAAA,EAAAG,iBAAA,CACxBL,EAAa;MAACC,IAAI,EAAEA;IAAI;IAAA,OAAAC,IAAA;EAAA;AAG/B,CAAC","names":["$0","$1","size","_el$","_tmpl$","_$insert","_$createComponent"],"ignoreList":[],"sources":["local-state-prop.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
        {
          from: "solid-js/web",
          range: [55, 105],
          bindings: [{ name: "insert", local: "_$insert" }],
        },
        {
          from: "solid-js/web",
          range: [106, 174],
          bindings: [{ name: "createComponent", local: "_$createComponent" }],
        },
      ],
      exportAt: 222,
    },
  );
}
describe("local state", () => {
  it("a signal passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(_jsx(SharingPanel, {}));
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the signal and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });
});
it("SharingPanel", async (t) => {
  await snapshotCase(t, "SharingPanel", _jsx(SharingPanel, {}));
});
