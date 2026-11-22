import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport, cs } from "@backtickjs/core";
import { bundler } from "../dist/index.js";

const greet = createImport<(name: string) => string>({
  name: "greet",
  from: "app",
  version: "1.0.0",
});

test("the value is `module.exports`, its imports `require` calls", async () => {
  const bundle = await bundler.build({
    input: greet,
    modules: { app: "1.0.0" },
  });
  const { code } = bundle.generate();
  assert.match(
    code,
    /^"use strict";\nconst \{ greet: \$i0 \} = require\("app"\);\n/,
  );
  assert.match(code, /\nmodule\.exports = \(\$i0\);$/);
  assert.doesNotMatch(code, /^(import|export) /m);
});

// What a client that isn't a browser does with one: hand it `require`, its
// own packages by name, and read what it exports.
test("a CommonJS bundle runs with the `require` its client hands it", async () => {
  const bundle = await bundler.build({
    input: cs`${{ greet, name: "world" }}`,
    modules: { app: "1.0.0" },
  });
  const { code } = bundle.generate();
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
