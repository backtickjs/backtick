import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  ErrorBoundary,
  Index,
  Match,
  Suspense,
  Switch,
} from "@backtickjs/solid-js";
import { Portal } from "@backtickjs/solid-js/web";
import { evaluate } from "../evaluate.ts";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
// Solid's control flow in a script, as Solid types and draws it.
const rows = ["first", "second"];
const indexed = cs.create(
  "dqrga485l5pm:20:16",
  {
    params: [
      { kind: "splice", value: rows, bindings: [] },
      { kind: "tag", value: Index },
    ],
  },
  '($splice0, $tag1) => <ul>\n  <$tag1 each={$splice0()}>\n    {(row, index) => <li>{index + ": " + row()}</li>}\n  </$tag1>\n</ul>',
  '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAmBmB,qBAAA,CAAC,EAAE,CACpB;EAAA,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,UAAK,CAAC,CACjB;IAAA,CAAC,CAAC,GAAiB,EAAE,KAAa,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,GAAG,IAAI,GAAG,GAAG,EAAE,CAAC,EAAE,EAAE,CAAC,CACxE;EAAA,EAAE,KAAK,CACT;AAAA,EAAE,EAAE,CAAC"}',
);
const switched = cs.create(
  "dqrga485l5pm:26:17",
  {
    params: [
      { kind: "tag", value: Switch },
      { kind: "tag", value: Match },
    ],
  },
  "($tag0, $tag1) => <$tag0 fallback={<p>none</p>}>\n  <$tag1 when={1 > 2}>\n    <p>wrong</p>\n  </$tag1>\n  <$tag1 when={2 > 1}>\n    <p>right</p>\n  </$tag1>\n</$tag0>",
  '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAyBoB,kBAAA,CAAC,KAAM,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,CAAC,CAAC,CAAC,CAChD;EAAA,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB;IAAA,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CACb;EAAA,EAAE,KAAK,CACP;EAAA,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB;IAAA,CAAC,CAAC,CAAC,KAAK,EAAE,CAAC,CACb;EAAA,EAAE,KAAK,CACT;AAAA,EAAE,KAAM,CAAC"}',
);
const caught = cs.create(
  "dqrga485l5pm:35:15",
  {
    params: [
      {
        kind: "splice",
        value: cs.create(
          "dqrga485l5pm:36:4",
          { params: [] },
          '() => {\n    throw "drawn wrong";\n}',
          '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAmCO;IACH,MAAM,aAAa,CAAC;AACtB,CAAC"}',
        ),
        bindings: [],
      },
      { kind: "tag", value: ErrorBoundary },
    ],
  },
  "($splice0, $tag1) => <$tag1 fallback={<p>caught</p>}>{$splice0()}</$tag1>",
  '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAkCkB,qBAAA,CAAC,KAAa,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,EAAE,CAAC,CAAC,CAAC,CAAC,CACxD,UAGF,CAAC,EAAE,KAAa,CAAC"}',
);
const suspended = cs.create(
  "dqrga485l5pm:41:18",
  { params: [{ kind: "tag", value: Suspense }] },
  "($tag0) => <$tag0 fallback={<p>loading</p>}>\n  <p>loaded</p>\n</$tag0>",
  '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAwCqB,WAAA,CAAC,KAAQ,CAAC,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC,CACtD;EAAA,CAAC,CAAC,CAAC,MAAM,EAAE,CAAC,CACd;AAAA,EAAE,KAAQ,CAAC"}',
);
const portaled = cs.create(
  "dqrga485l5pm:45:17",
  { params: [{ kind: "tag", value: Portal }] },
  "($tag0) => <div>\n  <p>here</p>\n  <$tag0>\n    <p>elsewhere</p>\n  </$tag0>\n</div>",
  '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AA4CoB,WAAA,CAAC,GAAG,CACtB;EAAA,CAAC,CAAC,CAAC,IAAI,EAAE,CAAC,CACV;EAAA,CAAC,KAAM,CACL;IAAA,CAAC,CAAC,CAAC,SAAS,EAAE,CAAC,CACjB;EAAA,EAAE,KAAM,CACV;AAAA,EAAE,GAAG,CAAC"}',
);
describe("control flow in a script", () => {
  it("draws each position with Index", async () => {
    render(await evaluate(() => indexed));
    assert.deepEqual(
      screen.getAllByRole("listitem").map((item) => item.textContent),
      ["0: first", "1: second"],
    );
  });
  it("draws the first Match that holds", async () => {
    render(await evaluate(() => switched));
    assert.ok(screen.getByText("right"));
    assert.equal(screen.queryByText("wrong"), null);
  });
  it("draws the fallback of an ErrorBoundary around a script that throws", async () => {
    render(await evaluate(() => caught));
    assert.ok(screen.getByText("caught"));
  });
  it("draws a Portal's children outside where it stands", async () => {
    const { container } = render(await evaluate(() => portaled));
    assert.ok(container.textContent?.includes("here"));
    assert.ok(!container.textContent?.includes("elsewhere"));
    assert.ok(screen.getByText("elsewhere"));
  });
  it("draws Suspense's children when nothing is pending", async () => {
    render(await evaluate(() => suspended));
    assert.ok(screen.getByText("loaded"));
  });
});
it("indexed", async (t) => {
  await snapshotCase(t, "indexed", indexed);
});
it("switched", async (t) => {
  await snapshotCase(t, "switched", switched);
});
