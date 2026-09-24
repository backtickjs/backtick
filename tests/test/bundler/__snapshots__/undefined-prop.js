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
    const code = await bundler.run(
      _jsx("div", { class: undefined, id: "kept" }),
    );
    assert.match(code, /jsx\("div", \{\s*id: "kept"\s*\}\)/);
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
          { start: { line: 34, column: 33 }, end: { line: 34, column: 71 } },
          {
            fileHash: "28eplibrubp3g",
            splices: { $onMount: { value: onMount, params: [] } },
            captures: [],
          },
          () => ({
            type: "ArrowFunctionExpression",
            loc: {
              start: { line: 34, column: 36 },
              end: { line: 34, column: 70 },
            },
            params: [
              {
                type: "Identifier",
                loc: {
                  start: { line: 34, column: 37 },
                  end: { line: 34, column: 39 },
                },
                name: "el",
                key: "el$28eplibrubp3g$0",
              },
            ],
            body: {
              type: "CallExpression",
              loc: {
                start: { line: 34, column: 44 },
                end: { line: 34, column: 70 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 34, column: 44 },
                  end: { line: 34, column: 52 },
                },
                key: "$onMount",
              },
              arguments: [
                {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 34, column: 53 },
                    end: { line: 34, column: 69 },
                  },
                  params: [],
                  body: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 34, column: 59 },
                      end: { line: 34, column: 69 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 34, column: 59 },
                        end: { line: 34, column: 67 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 34, column: 59 },
                          end: { line: 34, column: 61 },
                        },
                        name: "el",
                        key: "el$28eplibrubp3g$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 34, column: 62 },
                          end: { line: 34, column: 67 },
                        },
                        name: "focus",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [],
                    optional: false,
                  },
                  expression: true,
                },
              ],
              optional: false,
            },
            expression: true,
          }),
          "$0 => (el) => $0()(() => el.focus())",
          '{"version":3,"file":"undefined-prop.test.jsx","sourceRoot":"","sources":["undefined-prop.test.tsx"],"names":[],"mappings":"AAiCoC,MAAA,CAAC,EAAE,EAAE,EAAE,CAAC,IAAQ,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,KAAK,EAAE,CAAC,CAAA"}',
        ),
      }),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
