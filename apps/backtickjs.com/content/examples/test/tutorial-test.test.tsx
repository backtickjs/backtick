import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { it } from "node:test";
// The tutorial's last step, run here as a project's `npm test` runs it. In a
// file of its own: the orders it saves would reach the tutorial's other tests.
import "../tutorial-5/server/Home.test.js";

// The step shows the template's own `drawScreen`.
it("tutorial: drawScreen is the template's", () => {
  const read = (path: string) =>
    readFileSync(new URL(path, import.meta.url), "utf8");
  assert.equal(
    read("../tutorial-5/server/test/drawScreen.ts"),
    read(
      "../../../../../packages/create-backtick-app/templates/react-native/server/test/drawScreen.ts",
    ),
  );
});
