import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { bundler } from "../dist/index.js";

test("the output is a module whose default export is the value", async () => {
  const bundle = await bundler.build({ input: 42, external: {} });
  // After the module table, empty, and its `require`.
  assert.match(
    bundle.generate({ format: "es" }).code,
    /\nexport default \(42\);$/,
  );
});

test("a map is written only where one is asked for", async () => {
  const bundle = await bundler.build({ input: 42, external: {} });
  const { code } = bundle.generate({ format: "es" });
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
