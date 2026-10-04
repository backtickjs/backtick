import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { bundler } from "../dist/index.js";

const greet = createImport<(name: string) => string>({
  name: "greet",
  from: "app",
  version: "^1.0.0",
});

test("as CommonJS, the value is `module.exports`, its imports `require` calls", async () => {
  const bundle = await bundler.build({
    input: greet,
    external: { app: "1.0.0" },
  });
  const { code } = bundle.generate({ format: "cjs" });
  assert.match(
    code,
    /^"use strict";\nconst \{ greet: \$i0 \} = require\("app"\);\n/,
  );
  assert.match(code, /\nmodule\.exports = \(\$i0\);$/);
  assert.doesNotMatch(code, /^(import|export) /m);
});

test("a bundle is the same in either format but for its imports and export", async () => {
  const bundle = await bundler.build({
    input: greet,
    external: { app: "1.0.0" },
  });
  const body = (code: string) =>
    code
      .split("\n")
      .filter(
        (line) =>
          !/^(import |export |const \{.*require\(|"use strict"|module\.exports)/.test(
            line,
          ),
      );
  assert.deepEqual(
    body(bundle.generate({ format: "cjs" }).code),
    body(bundle.generate({ format: "es" }).code),
  );
});

// What a client that isn't a browser does with one: hand it `require`, its
// own packages by name, and read what it exports.
test("a CommonJS bundle runs with the `require` its client hands it", async () => {
  const bundle = await bundler.build({
    input: { greet, name: "world" },
    external: { app: "1.0.0" },
  });
  const { code } = bundle.generate({ format: "cjs" });
  const module = { exports: {} as unknown };
  const require = (specifier: string) => {
    assert.equal(specifier, "app");
    return { greet: (name: string) => `Hello ${name}!` };
  };
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    require,
  );
  const { greet: run, name } = module.exports as {
    greet: (name: string) => string;
    name: string;
  };
  assert.equal(run(name), "Hello world!");
});
