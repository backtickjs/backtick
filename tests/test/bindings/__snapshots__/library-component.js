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
  from: "app",
  version: "^1.0.0",
});
// In a script, the library's component as the library types it: a handler, a
// slot taking script JSX, and children.
const counter = cs.create(
  "2ibpabspfxrad:21:16",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: Button },
    ],
  },
  '($splice0, $tag1) => {\n    const count = $splice0()(0);\n    return (<$tag1 variant="primary" icon={<b>+</b>} onClick={() => count[1](count[0]() + 1)}>\n      <span>{"Pressed " + count[0]() + " times"}</span>\n    </$tag1>);\n}',
  '{"version":3,"file":"library-component.test.jsx","sourceRoot":"","sources":["bindings/library-component.test.tsx"],"names":[],"mappings":"AAoBmB;IACjB,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,KAAM,CACL,OAAO,CAAC,SAAS,CACjB,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CACf,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAExC;MAAA,CAAC,IAAI,CAAC,CAAC,UAAU,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,QAAQ,CAAC,EAAE,IAAI,CAClD;IAAA,EAAE,KAAM,CAAC,CACV,CAAC;AACJ,CAAC"}',
);
// A prop the library doesn't take a value for, caught as Solid would.
// @ts-expect-error: Type '"large"' is not assignable to type '"primary" | "ghost"'.
export const wrongVariant = cs.create(
  "2ibpabspfxrad:36:28",
  { params: [{ kind: "tag", value: Button }] },
  '($tag0) => <$tag0 variant="large" onClick={() => { }}>\n  Save\n</$tag0>',
  '{"version":3,"file":"library-component.test.jsx","sourceRoot":"","sources":["bindings/library-component.test.tsx"],"names":[],"mappings":"AAmC+B,WAAA,CAAC,KAAM,CAAC,OAAO,CAAC,OAAO,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,CACvE;;AACF,EAAE,KAAM,CAAC"}',
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
