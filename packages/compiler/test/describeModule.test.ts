import assert from "node:assert";
import { describe, it } from "node:test";
import ts from "typescript";
import { describeModule } from "../dist/describeModule.js";

// A module as a framework's compiler might write it.
const code = [
  'import { template as _$template } from "solid-js/web";',
  'import web, * as all from "solid-js/web";',
  'import "side-effect";',
  "var _tmpl$ = _$template(`<button>`);",
  "export default ($0) => _tmpl$();",
  "delegate();",
].join("\n");

describe("describeModule", () => {
  it("records each import, where it stands and what it binds", () => {
    const { imports } = describeModule(ts, code);
    assert.deepStrictEqual(
      imports.map(({ from, range, bindings }) => ({
        from,
        text: code.slice(...range),
        bindings,
      })),
      [
        {
          from: "solid-js/web",
          text: 'import { template as _$template } from "solid-js/web";',
          bindings: [{ name: "template", local: "_$template" }],
        },
        {
          from: "solid-js/web",
          text: 'import web, * as all from "solid-js/web";',
          bindings: [
            { name: "default", local: "web" },
            { name: "*", local: "all" },
          ],
        },
        {
          from: "side-effect",
          text: 'import "side-effect";',
          bindings: [],
        },
      ],
    );
  });

  it("records where the default export starts", () => {
    const { exportAt } = describeModule(ts, code);
    assert.ok(code.startsWith("export default ", exportAt));
  });

  it("refuses a module that exports anything else", () => {
    assert.throws(
      () => describeModule(ts, "export const x = 1;\nexport default x;"),
      /exports nothing but its default/,
    );
  });

  it("refuses a module without a default export", () => {
    assert.throws(() => describeModule(ts, "const x = 1;"), /no default export/);
  });
});
