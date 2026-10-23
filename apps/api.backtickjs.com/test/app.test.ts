import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { ClientVersionMismatch } from "@backtickjs/bundler";
import { installedPackages } from "@backtickjs/core/node";
import { bundle } from "../src/sandbox/bundle.ts";
import { typecheck } from "../src/sandbox/typecheck.ts";
import { starter } from "../src/function/starter.ts";

const root = join(import.meta.dirname, "..");

// What a phone carrying the versions installed here sends.
const installed = installedPackages(root);
const phone = {
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
};

// An app's `App.tsx`, in a directory of its own.
function write(name: string, source: string): string {
  const dir = join(root, ".builds", "test", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "App.tsx"), source);
  return join(dir, "App.tsx");
}

describe("typecheck", () => {
  it("passes the starter", () => {
    assert.deepEqual(typecheck(write("starter", starter)), {
      errors: [],
      warnings: [],
    });
  });

  it("reports type errors where they are in the file", () => {
    const file = write(
      "type",
      starter.replace("$useState<number>(0)", '$useState<number>("0")'),
    );
    assert.match(
      typecheck(file).errors.join("\n"),
      /^App\.tsx\(18,49\): error TS2345: Argument of type 'string'/,
    );
  });
  it("reports a regex escaped as if in a string as a warning, not an error", () => {
    const file = write(
      "warning",
      starter.replace(
        '{count + " taps"}',
        '{String(count).replace(/\\\\B/g, ",") + " taps"}',
      ),
    );
    const { errors, warnings } = typecheck(file);
    assert.deepEqual(errors, []);
    assert.match(
      warnings.join("\n"),
      /^App\.tsx\(22,62\): warning TS0: `\\\\B` in this regex matches a backslash/,
    );
  });
});

describe("bundle", () => {
  it("bundles the starter for a phone, with its map", async () => {
    const { code, map } = await bundle(write("starter", starter), phone);
    assert.match(code, /require\("react-native"\)/);
    assert.equal(JSON.parse(map).version, 3);
  });

  it("refuses a module the phone doesn't provide", async () => {
    const file = write(
      "import",
      `import { isRunningInExpoGo } from "expo" with { backtick: "client" };\n` +
        starter.replace(
          "return <App />;",
          "$isRunningInExpoGo(); return <App />;",
        ),
    );
    await assert.rejects(
      () => bundle(file, phone),
      (error) =>
        error instanceof ClientVersionMismatch && error.from === "expo",
    );
  });
});
