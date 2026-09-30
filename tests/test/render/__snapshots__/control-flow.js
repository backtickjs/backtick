import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  ErrorBoundary,
  Index,
  Match,
  Portal,
  Suspense,
  Switch,
} from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
// Solid's control flow written in host JSX, around what scripts draw: each is
// a server component, so the host can write it where a page is laid out.
const rows = ["first", "second"];
const indexed = _jsx("ul", {
  children: _jsx(Index, {
    each: cs.create(
      "16g024iopcrfp:23:17",
      { params: [{ kind: "splice", value: rows, bindings: [] }] },
      "($splice0) => $splice0()",
      '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAsBoB,cAAA,UAAK"}',
    ),
    children: cs.create(
      "16g024iopcrfp:24:7",
      { params: [] },
      '() => (row, index) => (<li>{index + ": " + row()}</li>)',
      '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAuBU,MAAA,CAAC,GAAiB,EAAE,KAAa,EAAE,EAAE,CAAC,CACxC,CAAC,EAAE,CAAC,CAAC,KAAK,GAAG,IAAI,GAAG,GAAG,EAAE,CAAC,EAAE,EAAE,CAAC,CAChC"}',
    ),
  }),
});
const switched = _jsxs(Switch, {
  fallback: _jsx("p", { children: "none" }),
  children: [
    _jsx(Match, {
      when: cs.create(
        "16g024iopcrfp:33:17",
        { params: [] },
        "() => 1 > 2",
        '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAgCoB,MAAA,CAAC,GAAG,CAAC"}',
      ),
      children: _jsx("p", { children: "wrong" }),
    }),
    _jsx(Match, {
      when: cs.create(
        "16g024iopcrfp:36:17",
        { params: [] },
        "() => 2 > 1",
        '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AAmCoB,MAAA,CAAC,GAAG,CAAC"}',
      ),
      children: _jsx("p", { children: "right" }),
    }),
  ],
});
const caught = _jsx(ErrorBoundary, {
  fallback: _jsx("p", { children: "caught" }),
  children: cs.create(
    "16g024iopcrfp:44:5",
    { params: [] },
    '() => {\n    throw "drawn wrong";\n}',
    '{"version":3,"file":"control-flow.test.jsx","sourceRoot":"","sources":["render/control-flow.test.tsx"],"names":[],"mappings":"AA2CQ;IACF,MAAM,aAAa,CAAC;AACtB,CAAC"}',
  ),
});
const suspended = _jsx(Suspense, {
  fallback: _jsx("p", { children: "loading" }),
  children: _jsx("p", { children: "loaded" }),
});
const portaled = _jsxs("div", {
  children: [
    _jsx("p", { children: "here" }),
    _jsx(Portal, { children: _jsx("p", { children: "elsewhere" }) }),
  ],
});
describe("control flow in host JSX", () => {
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
