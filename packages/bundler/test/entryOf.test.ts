import assert from "node:assert/strict";
import { test } from "node:test";
import { entryOf } from "../dist/bundle/entryOf.js";

// A module as a framework's compiler might write it.
const code = [
  'import { template as _$template, insert } from "solid-js/web";',
  'import web, * as all from "solid-js/web";',
  "var _tmpl$ = _$template(`<b>`);",
  "export default ($0) => [_tmpl$(), insert, web, all, $0()];",
  "delegate();",
].join("\n");
const at = (text: string) => code.indexOf(text);

test("an entry evaluates to the module's default export, after the rest", () => {
  const entry = entryOf({
    code,
    map: "",
    imports: [
      {
        from: "solid-js/web",
        range: [0, at("\nimport web")],
        bindings: [
          { name: "template", local: "_$template" },
          { name: "insert", local: "insert" },
        ],
      },
      {
        from: "solid-js/web",
        range: [at("import web"), at("\nvar")],
        bindings: [
          { name: "default", local: "web" },
          { name: "*", local: "all" },
        ],
      },
    ],
    exportAt: at("export default"),
  });
  const web = { default: "web", template: () => () => "tmpl", insert: "insert" };
  const calls: string[] = [];
  const $modules = { "solid-js/web": web };
  const delegate = () => calls.push("delegate");
  const made = new Function("$modules", "delegate", `return ${entry};`)(
    $modules,
    delegate,
  );
  assert.deepEqual(made(() => "arg"), ["tmpl", "insert", "web", web, "arg"]);
  assert.deepEqual(calls, ["delegate"]);
});
