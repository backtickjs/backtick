import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluate } from "@backtickjs/web-testing";
import { createSourceLoader } from "./importFixture.ts";

// What `a[k]` does with a key of the wrong type.
//
// TypeScript reads a numeric string literal as a numeric index, so `coins["0"]`
// passes the typechecker — it is `5` in JavaScript, where an array is an object
// and every key is a string. Nothing coerces here, so the read has no meaning
// and says so. The sources are compiled without typechecking, so the reads the
// typechecker would refuse reach the client too.
//
// A key that is not a place the value has anything is the other case, and it
// stays `undefined`: `index-past-end` and `index-absent` in `valid/` pin that,
// and the two must not be told apart by the same rule.
const importSource = createSourceLoader("indexing");

async function read(expression: string): Promise<unknown> {
  return evaluate(
    await importSource(
      `import { cs } from "@backtickjs/core";
      export default cs\`${expression}\`;`,
    ),
  );
}

describe("a read by key", () => {
  it("refuses a string where an array takes a number", async () => {
    await assert.rejects(
      read(`[5, 31, 7]["0"]`),
      /an array is read by a number: this bundle produced "0"\./,
    );
  });

  it("refuses a string where a string takes a number", async () => {
    await assert.rejects(
      read(`"abc"["0"]`),
      /a string is read by a number: this bundle produced "0"\./,
    );
  });

  it("refuses a number where an object takes a string", async () => {
    await assert.rejects(
      read(`({ x: 1 })[0]`),
      /an object is read by a string: this bundle produced 0\./,
    );
  });

  it("refuses a target that holds nothing by key at all", async () => {
    await assert.rejects(
      read(`(7 as any)[0]`),
      /only an array, a string or an object can be read by key/,
    );
  });

  // The other half of the rule, so the two cases are pinned together: a
  // well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    for (const expression of [
      `[5, 31, 7][9]`,
      `[5, 31, 7][1.5]`,
      `[5, 31, 7][-1]`,
      `({ x: 1 } as { [key: string]: number })["y"]`,
      `"abc"[9]`,
    ]) {
      assert.equal(await read(expression), undefined, expression);
    }
  });
});
