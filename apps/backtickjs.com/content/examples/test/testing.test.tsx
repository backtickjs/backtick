import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
// The guide's test, run here as a project's `npm test` runs it.
import "../testing/server/Order.test.js";

// The guide shows the template's own `drawScreen`.
it("testing: drawScreen is the template's", () => {
  const read = (path: string) =>
    readFileSync(new URL(path, import.meta.url), "utf8");
  assert.equal(
    read("../testing/server/test/drawScreen.ts"),
    read(
      "../../../../../packages/create-backtick-app/templates/react-native/server/test/drawScreen.ts",
    ),
  );
});

// The command the guide shows is the template's `npm test`.
it("testing: the command shown is the template's", () => {
  const read = (path: string) =>
    readFileSync(new URL(path, import.meta.url), "utf8");
  const { scripts } = JSON.parse(
    read(
      "../../../../../packages/create-backtick-app/templates/react-native/package.json",
    ),
  );
  assert.ok(read("../../testing.md").includes(`\n${scripts.test}\n`));
});
