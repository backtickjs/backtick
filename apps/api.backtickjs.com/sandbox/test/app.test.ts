import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { installedPackages } from "@backtickjs/core/node";
import { compile } from "../src/compile.ts";
import { screen } from "../src/screen.ts";
import { typecheck } from "../src/typecheck.ts";

// A counter app, as a model writes one from the service's starter.
const counter = readFileSync(
  join(import.meta.dirname, "fixtures/App.tsx"),
  "utf8",
);

const root = join(import.meta.dirname, "..");

// What a phone carrying the versions installed here sends.
const installed = installedPackages(root);
const phone = JSON.stringify({
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
  "react-native-safe-area-context":
    installed["react-native-safe-area-context"]!,
  "expo-router": installed["expo-router"]!,
});

// An app's `App.tsx`, in a directory of its own.
function write(name: string, source: string): string {
  const dir = join(root, ".builds", "test", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "App.tsx"), source);
  writeFileSync(
    join(dir, "tsconfig.json"),
    `{ "extends": "../../../tsconfig.app.json" }`,
  );
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
      /^App\.tsx\(31,51\): error TS2345: Argument of type 'string'/,
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
      /^App\.tsx\(36,65\): warning TS0: `\\\\B` in this regex matches a backslash/,
    );
  });
});

describe("typecheck's default export", () => {
  it("refuses an app whose default export isn't its Hono server", () => {
    const file = write(
      "export",
      counter.replace("export default app;", "export default styles;"),
    );
    assert.match(
      typecheck(file).errors.join("\n"),
      /^App\.tsx: error: the default export is the app's Hono server/,
    );
  });
});

describe("screen", () => {
  it("answers each route with its screen, bundled for the phone", async () => {
    const file = write("counter", counter);
    for (const path of ["/", "/day"]) {
      const { status, contentType, body } = await screen(file, path, phone);
      assert.equal(status, 200);
      assert.equal(contentType, "text/javascript");
      assert.match(body, /require\("react-native"\)/);
    }
  });

  it("answers 426 for a module the phone doesn't provide", async () => {
    const file = write(
      "import",
      `import { isRunningInExpoGo } from "expo" with { backtick: "client" };\n` +
        counter.replace(
          "return <Screen />;",
          "$isRunningInExpoGo(); return <Screen />;",
        ),
    );
    const { status, body } = await screen(file, "/", phone);
    assert.equal(status, 426);
    assert.match(JSON.parse(body).message, /expo/);
  });

  it("answers 404 for a path the app has no route for", async () => {
    const { status } = await screen(
      write("counter", counter),
      "/nowhere",
      phone,
    );
    assert.equal(status, 404);
  });
});

describe("compile", () => {
  it("bundles the counter into one minified release, its server packages in it", async () => {
    const { code, errors } = await compile(write("counter", counter));
    assert.equal(errors, undefined);
    const imports = ts
      .createSourceFile("release.js", code!, ts.ScriptTarget.Latest)
      .statements.filter(ts.isImportDeclaration)
      .map(({ moduleSpecifier }) => (moduleSpecifier as ts.StringLiteral).text);
    assert.deepEqual([...new Set(imports)], ["node:async_hooks"]);
    assert.match(code!, /ClientVersionMismatch/);
    assert.ok(code!.length < 100_000, `${code!.length} bytes`);
  });
});
