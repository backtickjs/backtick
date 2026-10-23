import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { ClientVersionMismatch } from "@backtickjs/bundler";
import { installedPackages } from "@backtickjs/core/node";
import { bundle } from "../src/bundle.ts";
import { typecheck } from "../src/typecheck.ts";

// A counter app, as a model writes one from the service's starter.
const counter = readFileSync(
  join(import.meta.dirname, "fixtures/App.tsx"),
  "utf8",
);

const root = join(import.meta.dirname, "..");

// What a phone carrying the versions installed here sends.
const installed = installedPackages(root);
const phone = {
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
  "react-native-safe-area-context":
    installed["react-native-safe-area-context"]!,
};

// An app's `App.tsx`, in a directory of its own.
function write(name: string, source: string): string {
  const dir = join(root, ".builds", "test", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "App.tsx"), source);
  return join(dir, "App.tsx");
}

describe("typecheck", () => {
  it("passes the counter", () => {
    assert.deepEqual(typecheck(write("counter", counter)), {
      errors: [],
      warnings: [],
    });
  });

  it("reports type errors where they are in the file", () => {
    const file = write(
      "type",
      counter.replace("$useState<number>(0)", '$useState<number>("0")'),
    );
    assert.match(
      typecheck(file).errors.join("\n"),
      /^App\.tsx\(23,49\): error TS2345: Argument of type 'string'/,
    );
  });
  it("reports a regex escaped as if in a string as a warning, not an error", () => {
    const file = write(
      "warning",
      counter.replace(
        '{count + " taps"}',
        '{String(count).replace(/\\\\B/g, ",") + " taps"}',
      ),
    );
    const { errors, warnings } = typecheck(file);
    assert.deepEqual(errors, []);
    assert.match(
      warnings.join("\n"),
      /^App\.tsx\(27,62\): warning TS0: `\\\\B` in this regex matches a backslash/,
    );
  });
});

describe("bundle", () => {
  it("bundles the counter for a phone, with its map", async () => {
    const { code, map } = await bundle(write("counter", counter), phone);
    assert.match(code, /require\("react-native"\)/);
    assert.equal(JSON.parse(map).version, 3);
  });

  it("refuses a module the phone doesn't provide", async () => {
    const file = write(
      "import",
      `import { isRunningInExpoGo } from "expo" with { backtick: "client" };\n` +
        counter.replace(
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
