import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, onMount } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { render, screen } from "@backtickjs/web-testing";
// An element's prop that is `undefined` is left out, as an optional prop reads
// in JSX and TypeScript. That is what lets a component forward an optional
// prop it wasn't given.
async function Pill({ label, ref }) {
  return _jsx("button", { ref: ref, children: label });
}
describe("an undefined prop", () => {
  it("is left out of the element", async () => {
    const bundle = await bundler.tree(
      _jsx("div", { class: undefined, id: "kept" }),
    );
    assert.deepEqual(bundle.root, ["el", "div", { id: "kept" }, null]);
  });
  it("lets a component forward an optional prop it wasn't given", async () => {
    await render(_jsx(Pill, { label: "plain" }));
    assert.ok(screen.getByRole("button", { name: "plain" }));
  });
  it("still reaches the element when it is given", async () => {
    await render(
      _jsx(Pill, {
        label: "focused",
        ref: cs.create(
          [34, 34, 34, 72],
          {
            version: "0.0.0",
            filePath: "bundler/undefined-prop.test.tsx",
            fileHash: "158erry6ssaza",
            splices: { $onMount: { value: onMount, params: [] } },
            captures: [],
          },
          () => ({
            kind: "=>",
            loc: [34, 37, 34, 71],
            parameters: [
              {
                kind: "param",
                loc: [34, 38, 34, 40],
                name: {
                  kind: "id",
                  loc: [34, 38, 34, 40],
                  text: "el",
                  bindingKey: "el$158erry6ssaza$0",
                },
              },
            ],
            body: {
              kind: "()",
              loc: [34, 45, 34, 71],
              expression: {
                kind: "splice",
                loc: [34, 45, 34, 53],
                key: "$onMount",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [34, 54, 34, 70],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [34, 60, 34, 70],
                    expression: {
                      kind: ".",
                      loc: [34, 60, 34, 68],
                      expression: {
                        kind: "id",
                        loc: [34, 60, 34, 62],
                        text: "el",
                        bindingKey: "el$158erry6ssaza$0",
                      },
                      name: "focus",
                    },
                    arguments: [],
                  },
                },
              ],
            },
          }),
        ),
      }),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
