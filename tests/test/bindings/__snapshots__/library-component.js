import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "nn06jiixw3jm:21:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<b>+`);\nexports.default = ($splice0, $tag1) => {\n    const [count, setCount] = $splice0()(0);\n    return (0, web_2.createComponent)($tag1, {\n        variant: "primary",\n        get icon() {\n            return _tmpl$2();\n        },\n        onClick: () => setCount(count() + 1),\n        get children() {\n            var _el$ = _tmpl$();\n            (0, web_3.insert)(_el$, () => "Pressed " + count() + " times");\n            return _el$;\n        }\n    });\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAoBmB,CAAAA,QAAA,EAAAC,KAAA;IACjB,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C,OAAAI,yBAAA,EACGH,KAAO;QACNI,OAAO;QAAA,IACPC,IAAIA;YAAA,OAAAC,OAAA;QAAA;QACJC,OAAO,EAAEA,GAAA,GAAML,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;QAAA,IAAAO;YAAA,IAAAC,IAAA,GAAAC,MAAA;YAAAC,gBAAA,EAAAF,IAAA,QAE7B,UAAU,GAAGR,KAAK,EAAE,GAAG,QAAQ;YAAA,OAAAQ,IAAA;QAAA;KAAA;AAG5C,CAAC","names":["$splice0","$tag1","count","setCount","_$createComponent","variant","icon","_tmpl$2","onClick","children","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["bindings/library-component.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }, { kind: "tag" }],
};
const $module1 = {
  id: "nn06jiixw3jm:36:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $tag0 => (0, web_1.createComponent)($tag0, {\n    variant: "large",\n    onClick: () => { },\n    children: "Save"\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAmC+BA,KAAA,IAAAC,yBAAA,EAACD,KAAO;IAACE,OAAO;IAASC,OAAO,EAAEA,GAAA,KAAO,CAAC;IAAAC,QAAA;CAAA,CAE/D","names":["$tag0","_$createComponent","variant","onClick","children"],"ignoreList":[],"sources":["bindings/library-component.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "tag" }],
};
// A third-party Solid library's whole Backtick binding: one `createImport` per
// component, typed with the library's own declaration.
const Button = createImport({
  name: "Button",
  from: "acme-ui",
  version: "^1.0.0",
});
// In a script, the library's component as the library types it: a handler, a
// slot taking script JSX, and children.
const counter = cs.create($module0, [createSignal, Button]);
// A prop the library doesn't take a value for, caught as Solid would.
// @ts-expect-error: Type '"large"' is not assignable to type '"primary" | "ghost"'.
export const wrongVariant = cs.create($module1, [Button]);
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
