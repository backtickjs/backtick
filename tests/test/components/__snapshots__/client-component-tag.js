import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
// A client component defined on the host as a script, and used as a tag in
// another: typed by its own signature, and drawn by the client.
const Badge = cs.create(
  "1tbbj72floguq:12:14",
  { params: [] },
  '() => (props) => <b>{"badge " + props.n}</b>',
  '{"version":3,"file":"client-component-tag.test.jsx","sourceRoot":"","sources":["components/client-component-tag.test.tsx"],"names":[],"mappings":"AAWiB,MAAA,CAAC,KAAoB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC"}',
);
const badges = cs.create(
  "1tbbj72floguq:14:15",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: For },
      { kind: "tag", value: Badge },
    ],
  },
  "($splice0, $tag1, $tag2) => {\n    const scale = $splice0()(1);\n    return (<div>\n      <$tag1 each={[1, 2]}>{(n) => <$tag2 n={n * scale[0]()}/>}</$tag1>\n      <button onclick={() => scale[1](scale[0]() * 2)}>double</button>\n    </div>);\n}",
  '{"version":3,"file":"client-component-tag.test.jsx","sourceRoot":"","sources":["components/client-component-tag.test.tsx"],"names":[],"mappings":"AAakB;IAChB,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAG,CAAC,EAAE,KAAG,CAC7D;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,MAAM,EAAE,MAAM,CACjE;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
it("clientComponentTag", async (t) => {
  await snapshotCase(t, "clientComponentTag", badges);
});
describe("a client component defined as a script", () => {
  it("is drawn as a tag, with what the script hands it", async () => {
    render(await evaluate(() => badges));
    assert.ok(screen.getByText("badge 1"));
    assert.ok(screen.getByText("badge 2"));
    await userEvent.click(screen.getByText("double"));
    assert.ok(screen.getByText("badge 2"));
    assert.ok(screen.getByText("badge 4"));
  });
});
