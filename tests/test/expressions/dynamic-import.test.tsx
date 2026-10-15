import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

const url = "data:text/javascript,export default 42";

// `import()` in a script is the language's, as in the same code written by
// hand, not a module of the bundle's own.
it("a dynamic import imports", async () => {
  const value = await evaluate(
    cs`(async () => (await import($url)).default)()`,
  );
  assert.equal(value, 42);
});
