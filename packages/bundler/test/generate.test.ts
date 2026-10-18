import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { bundler } from "../dist/index.js";

test("the output is a module whose default export is the value", async () => {
  const bundle = await bundler.build({ input: 42, modules: {} });
  // After the module table, empty, and its `require`.
  assert.match(
    bundle.generate({ format: "es" }).code,
    /\nexport default \(42\);$/,
  );
});

test("the modules are { specifier: version }, as a client sends them", async () => {
  for (const modules of [null, [], { react: 19 }]) {
    await assert.rejects(
      () => bundler.build({ input: 42, modules: modules as never }),
      /The modules aren't \{ specifier: version \}/,
    );
  }
});

test("a map is written only where one is asked for", async () => {
  const bundle = await bundler.build({ input: 42, modules: {} });
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

test("a script's import from a module the client doesn't provide is refused", async () => {
  const greet = createImport({ name: "greet", from: "app", version: "1.0.0" });
  await assert.rejects(
    () =>
      bundler.build({
        input: greet,
        modules: { "solid-js": "1.9.14" },
      }),
    /Can't import `greet` from "app": the client provides solid-js@1\.9\.14\./,
  );
});

test("a script's import needing a version the client doesn't have is refused", async () => {
  const Portal = createImport({
    name: "Portal",
    from: "solid-js/web",
    version: "2.0.0",
  });
  await assert.rejects(
    () =>
      bundler.build({
        input: Portal,
        modules: { "solid-js/web": "1.9.14" },
      }),
    /Can't import `Portal` from "solid-js\/web": it's typed against 2\.0\.0, and the client provides solid-js\/web@1\.9\.14\./,
  );
});

test("a module is provided by its own specifier, not its package", async () => {
  const Portal = createImport({
    name: "Portal",
    from: "solid-js/web",
    version: "1.9.0",
  });
  const button = createImport({
    name: "button",
    from: "@scope/ui/button",
    version: "1.0.0",
  });
  const bundle = await bundler.build({
    input: [Portal, button],
    modules: { "solid-js/web": "1.9.14", "@scope/ui/button": "1.2.0" },
  });
  const { code } = bundle.generate({ format: "es" });
  assert.match(code, /from "solid-js\/web";/);
  assert.match(code, /from "@scope\/ui\/button";/);
  // its package alone isn't the module
  await assert.rejects(
    () => bundler.build({ input: Portal, modules: { "solid-js": "1.9.14" } }),
    /Can't import `Portal` from "solid-js\/web": the client provides solid-js@1\.9\.14\./,
  );
});
