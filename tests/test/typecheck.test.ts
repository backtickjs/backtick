import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";
import { describe, it } from "node:test";

const require = createRequire(import.meta.url);

// The `.tsx` tests hold their cases as code, which has to typecheck the way a
// user's would: through `backtick-tsc`, with the project `test/tsconfig.json`
// describes. A deliberate type error is written under `@ts-expect-error`, so
// one that stops being an error is reported too.
describe("typecheck the .tsx tests", () => {
  it("reports nothing", () => {
    let output: string;
    try {
      output = execFileSync(
        process.execPath,
        [
          require.resolve("@backtickjs/tsc/bin/backtick-tsc.js"),
          "--project",
          join(import.meta.dirname, "tsconfig.json"),
          "--pretty",
          "false",
        ],
        { encoding: "utf8" },
      );
    } catch (error) {
      const { stdout, stderr } = error as { stdout?: string; stderr?: string };
      output = stdout || stderr || String(error);
    }
    assert.equal(output, "");
  });
});
