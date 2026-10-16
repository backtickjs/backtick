import assert from "node:assert";
import { describe, it } from "node:test";
import { transpile } from "@backtickjs/compiler";
import ts from "typescript";

// What a file holding `declaration` compiles to, and what compiling it reports.
function compile(declaration: string): { code: string; messages: string[] } {
  const messages: string[] = [];
  const code = transpile(
    ts,
    "test.tsx",
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
        `const version = { "@backtickjs": "ClientImport", name: "version", from: "typescript/lib/typescript", version: "^${ts.version}" };`,
      ),
      code,
    );
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
