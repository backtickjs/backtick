import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
// A third-party Solid library's whole Backtick binding: one `createImport` per
// component, typed with the library's own declaration.
const Button = createImport({
  name: "Button",
  from: "acme-ui",
  version: "^1.0.0",
});
// In a script, the library's component as the library types it: a handler, a
// slot taking script JSX, and children.
const counter = cs.create(
  "z7pf43t1b5za:21:16",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: Button },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<b>+`);\nexports.default = ($splice0, $tag1) => {\n    const count = $splice0()(0);\n    return (0, web_2.createComponent)($tag1, {\n        variant: "primary",\n        get icon() {\n            return _tmpl$2();\n        },\n        onClick: () => count[1](count[0]() + 1),\n        get children() {\n            var _el$ = _tmpl$();\n            (0, web_3.insert)(_el$, () => "Pressed " + count[0]() + " times");\n            return _el$;\n        }\n    });\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAoBmB,CAAAA,QAAA,EAAAC,KAAA;IACjB,MAAMC,KAAK,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC9B,OAAAG,yBAAA,EACGF,KAAM;QACLG,OAAO;QAAA,IACPC,IAAIA;YAAA,OAAAC,OAAA;QAAA;QACJC,OAAO,EAAEA,GAAA,GAAML,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAA,IAAAM;YAAA,IAAAC,IAAA,GAAAC,MAAA;YAAAC,gBAAA,EAAAF,IAAA,QAEhC,UAAU,GAAGP,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,QAAQ;YAAA,OAAAO,IAAA;QAAA;KAAA;AAG/C,CAAC","names":["$splice0","$tag1","count","_$createComponent","variant","icon","_tmpl$2","onClick","children","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["bindings/library-component.test.tsx"]}',
  ["solid-js/web"],
);
// A prop the library doesn't take a value for, caught as Solid would.
// @ts-expect-error: Type '"large"' is not assignable to type '"primary" | "ghost"'.
export const wrongVariant = cs.create(
  "z7pf43t1b5za:36:28",
  { params: [{ kind: "tag", value: Button }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    variant: "large",\n    onClick: () => { },\n    children: "Save"\n});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAmC+BA,KAAA,IAAAC,yBAAA,EAACD,KAAM;IAACE,OAAO;IAASC,OAAO,EAAEA,GAAA,KAAO,CAAC;IAAAC,QAAA;CAAA,CAE/D","names":["$tag0","_$createComponent","variant","onClick","children"],"ignoreList":[],"sources":["bindings/library-component.test.tsx"]}',
  ["solid-js/web"],
);
it("libraryComponent", async (t) => {
  await snapshotCase(t, "libraryComponent", counter);
});
describe("a library component in a script", () => {
  it("draws its slot and children, and calls the handler", async () => {
    render(await evaluate(() => counter));
    const button = screen.getByRole("button");
    assert.equal(button.className, "primary");
    assert.equal(button.querySelector("b")?.textContent, "+");
    assert.ok(screen.getByText("Pressed 0 times"));
    await userEvent.click(button);
    assert.ok(screen.getByText("Pressed 1 times"));
  });
});
