import assert from "node:assert";
import { describe, it } from "node:test";
import { transpile } from "@backtickjs/compiler";
import ts from "typescript";

// What compiling a file holding the script `body` reports.
function refusals(body: string): string[] {
  const messages: string[] = [];
  transpile(
    ts,
    "test.ts",
    `import { cs } from "@backtickjs/core";\nexport default cs\`${body}\`;`,
    "@backtickjs/core",
    (diagnostic) => messages.push(String(diagnostic.messageText)),
  );
  return messages;
}

describe("refusals", () => {
  it("a declared `$` name is refused, not emitted", () => {
    for (const body of [
      "{ function $done() {} }",
      "{ class $Done {} }",
      "{ const $done = 1; }",
      "{ (($done) => 1)(); }",
    ]) {
      assert.deepStrictEqual(
        refusals(body),
        [
          "`$`-prefixed names are reserved for unbraced splices in a `cs` " +
            "client script.",
        ],
        body,
      );
    }
  });

  it("a name strict mode forbids is refused", () => {
    assert.deepStrictEqual(refusals("{ const await = 1; }"), [
      "`await` is not allowed as a variable declaration name: it is " +
        "reserved in module code.",
    ]);
  });
});
