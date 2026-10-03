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

  it("a script that isn't one expression or one block is refused", () => {
    for (const body of [
      "a(); b()",
      "a()\nb()",
      "const x = 1",
      "if (a) b()",
      "",
    ]) {
      assert.deepStrictEqual(
        refusals(body),
        [
          "A `cs` client script is one expression or one block: write " +
            "statements in braces, e.g. cs`{ a(); b(); }`.",
        ],
        body,
      );
    }
    for (const body of ["a()", "a();", "{ a(); b(); }"]) {
      assert.deepStrictEqual(refusals(body), [], body);
    }
  });

  it("a script that doesn't parse is refused as TypeScript reads it", () => {
    assert.deepStrictEqual(refusals("a("), ["')' expected."]);
  });

  it("a name strict mode forbids is refused", () => {
    assert.deepStrictEqual(refusals("{ const await = 1; }"), [
      "`await` is not allowed as a variable declaration name: it is " +
        "reserved in module code.",
    ]);
  });
});
