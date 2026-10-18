import assert from "node:assert";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { transpile } from "@backtickjs/compiler";
import ts from "typescript";

// What a file holding `declaration` compiles to, and what compiling it reports.
function compile(
  declaration: string,
  fileName = "test.tsx",
): { code: string; messages: string[] } {
  const messages: string[] = [];
  const code = transpile(
    ts,
    fileName,
    declaration,
    "@backtickjs/core",
    (diagnostic) => messages.push(String(diagnostic.messageText)),
  );
  return { code, messages };
}

describe("client imports", () => {
  it("take the version installed where the file finds the package", () => {
    const { code, messages } = compile(
      `import { version } from "typescript/lib/typescript" with { backtick: "client" };`,
    );
    assert.deepStrictEqual(messages, []);
    assert.ok(
      code.includes(
        `const version = { "@backtickjs": "ClientImport", name: "version", from: "typescript/lib/typescript", version: "${ts.version}" };`,
      ),
      code,
    );
  });

  it("take an alias's package by its own name, keeping the subpath", () => {
    // as `"acme-ui-2": "npm:acme-ui@2"`, or `link:` to it, installs it
    const app = installed("acme-ui-2", { name: "acme-ui", version: "2.0.0" });
    const { code, messages } = compile(
      `import { Button } from "acme-ui-2/buttons" with { backtick: "client" };`,
      join(app, "test.tsx"),
    );
    assert.deepStrictEqual(messages, []);
    assert.ok(
      code.includes(
        `const Button = { "@backtickjs": "ClientImport", name: "Button", from: "acme-ui/buttons", version: "2.0.0" };`,
      ),
      code,
    );
  });

  it("take a package that doesn't name itself by its folder's name", () => {
    // a linked folder that isn't a published package
    const app = installed("local-ui", { version: "1.0.0" });
    const { code } = compile(
      `import { Button } from "local-ui" with { backtick: "client" };`,
      join(app, "test.tsx"),
    );
    assert.ok(code.includes(`from: "local-ui", version: "1.0.0"`), code);
  });

  it("refuse a package that isn't installed", () => {
    const { messages } = compile(
      `import * as Missing from "not-installed/sub" with { backtick: "client" };`,
    );
    assert.deepStrictEqual(messages, [
      "not-installed isn't installed where this file finds packages: install the version the client app has.",
    ]);
  });
});

// An app with `folder` in its node_modules, holding `manifest`.
function installed(folder: string, manifest: object): string {
  const app = mkdtempSync(join(tmpdir(), "client-imports-"));
  mkdirSync(join(app, "node_modules", folder), { recursive: true });
  writeFileSync(
    join(app, "node_modules", folder, "package.json"),
    JSON.stringify(manifest),
  );
  return app;
}
