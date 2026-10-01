import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { bundler, type Plugin } from "../dist/index.js";

// A plugin adding `text` to the end of the module, as a framework's compile
// step adds statements after the value (Solid's `delegateEvents`). Its map
// maps nothing; maps through a real plugin are `tests/`'s to check.
const appending =
  (text: string): Plugin =>
  (code) => ({
    code: `${code}\n${text}`,
    map: JSON.stringify({ version: 3, sources: [], names: [], mappings: "" }),
  });

test("the output is a module whose default export is the value", async () => {
  const bundle = await bundler.build({ input: 42, external: {} });
  assert.equal(bundle.generate({ format: "es" }).code, "export default (42);");
});

test("a map is written only where one is asked for", async () => {
  const bundle = await bundler.build({ input: 42, external: {} });
  const code = "export default (42);";
  assert.deepEqual(bundle.generate({ format: "es" }), { code, map: null });
  assert.deepEqual(bundle.generate({ format: "es", sourcemap: false }), {
    code,
    map: null,
  });
  const { map } = bundle.generate({ format: "es", sourcemap: "hidden" });
  assert.equal(JSON.parse(map!).version, 3);
  assert.deepEqual(bundle.generate({ format: "es", sourcemap: "hidden" }), {
    code,
    map,
  });
  assert.deepEqual(bundle.generate({ format: "es", sourcemap: "inline" }), {
    code: `${code}\n//# sourceMappingURL=data:application/json;charset=utf-8,${encodeURIComponent(map!)}`,
    map,
  });
});

test("a plugin's statements follow the value", async () => {
  const bundle = await bundler.build({
    input: 1,
    external: {},
    plugins: [appending("globalThis.appended = true;")],
  });
  assert.equal(
    bundle.generate({ format: "es" }).code,
    ["export default (1);", "globalThis.appended = true;"].join("\n"),
  );
});

test("a plugin is given the code and the bundle's id", async () => {
  const seen: string[] = [];
  await bundler.build({
    input: 1,
    external: {},
    plugins: [
      (code, id) => {
        seen.push(code, id);
        return {
          code,
          map: JSON.stringify({
            version: 3,
            sources: [],
            names: [],
            mappings: "",
          }),
        };
      },
    ],
  });
  assert.deepEqual(seen, ["export default (1);", "bundle.jsx"]);
});

test("a script's import from a package the client doesn't provide is refused", async () => {
  const greet = createImport({ name: "greet", from: "app", version: "^1.0.0" });
  await assert.rejects(
    () => bundler.build({ input: greet, external: { "solid-js": "1.9.14" } }),
    /Can't import `greet` from "app": the client provides solid-js@1\.9\.14\./,
  );
});

test("a script's import needing a version the client doesn't have is refused", async () => {
  const Portal = createImport({
    name: "Portal",
    from: "solid-js/web",
    version: "^2.0.0",
  });
  await assert.rejects(
    () => bundler.build({ input: Portal, external: { "solid-js": "1.9.14" } }),
    /Can't import `Portal` from "solid-js\/web": it needs solid-js@\^2\.0\.0, and the client provides solid-js@1\.9\.14\./,
  );
});

test("a module is provided by its package, scoped or not", async () => {
  const Portal = createImport({
    name: "Portal",
    from: "solid-js/web",
    version: "^1.9.0",
  });
  const button = createImport({
    name: "button",
    from: "@scope/ui/button",
    version: "^1.0.0",
  });
  const bundle = await bundler.build({
    input: [Portal, button],
    external: { "solid-js": "1.9.14", "@scope/ui": "1.2.0" },
  });
  const { code } = bundle.generate({ format: "es" });
  assert.match(code, /from "solid-js\/web";/);
  assert.match(code, /from "@scope\/ui\/button";/);
});
