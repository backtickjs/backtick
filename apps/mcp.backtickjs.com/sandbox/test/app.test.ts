import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { compile } from "../src/compile.ts";
import { typecheck } from "../src/typecheck.ts";
import installed from "../installed-packages.json" with { type: "json" };
import { positionOf, starter } from "./app.ts";

// The starter, and the starter with a type error.
const typo = starter.replace("$useState(false)", '$useState<boolean>("no")');

const root = join(import.meta.dirname, "..");

// What a phone carrying the versions installed here sends.
const phone = JSON.stringify({
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
  "@react-navigation/native": installed["@react-navigation/native"]!,
  "@react-navigation/native-stack":
    installed["@react-navigation/native-stack"]!,
  "react-native-safe-area-context":
    installed["react-native-safe-area-context"]!,
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
  it("passes the starter", () => {
    assert.deepEqual(typecheck(write("starter", starter)), {
      errors: [],
      warnings: [],
    });
  });

  it("reports type errors where they are in the file", () => {
    assert.ok(
      typecheck(write("type", typo)).errors[0]!.startsWith(
        `App.tsx${positionOf(typo, '"no"')}: error TS2345`,
      ),
    );
  });
  it("reports a regex escaped as if in a string as a warning, not an error", () => {
    const source = starter.replace(
      'name + " cooked!"',
      'name.replace(/\\\\B/g, ",") + " cooked!"',
    );
    const { errors, warnings } = typecheck(write("warning", source));
    assert.deepEqual(errors, []);
    assert.ok(
      warnings[0]!.startsWith(
        `App.tsx${positionOf(source, "/\\\\B/")}: warning TS0: \`\\\\B\` in this regex matches a backslash`,
      ),
      warnings[0],
    );
  });
});

describe("typecheck's default export", () => {
  it("refuses an app whose default export isn't its Hono server", () => {
    const file = write(
      "export",
      starter.replace("export default app;", "export default styles;"),
    );
    assert.match(
      typecheck(file).errors.join("\n"),
      /^App\.tsx: error: the default export is the app's Hono server/,
    );
  });
});

// What the runtime runs: the release, imported on its own, answering a
// phone's request.
async function release(source: string, name: string) {
  const { code } = await compile(write(name, source));
  const file = join(root, ".builds", "test", name, "release.mjs");
  writeFileSync(file, code!);
  const { default: app } = await import(file);
  return (path: string, modules: string) =>
    app.fetch(
      new Request(`http://app${path}`, {
        headers: { "x-backtick-modules": modules },
      }),
    ) as Promise<Response>;
}

describe("a release", () => {
  it("answers each route with its screen, bundled for the phone", async () => {
    const open = await release(starter, "release-starter");
    for (const path of ["/", "/recipes", "/recipe/pancakes"]) {
      const answer = await open(path, phone);
      assert.equal(answer.status, 200);
      assert.equal(answer.headers.get("content-type"), "text/javascript");
      assert.match(await answer.text(), /require\("react-native"\)/);
    }
  });

  it("answers 406 for a module the phone doesn't provide", async () => {
    const open = await release(
      `import { isRunningInExpoGo } from "expo" with { backtick: "client" };\n` +
        starter.replace(
          "const [cooked, setCooked]",
          "$isRunningInExpoGo();\n  const [cooked, setCooked]",
        ),
      "release-import",
    );
    const answer = await open("/recipe/pancakes", phone);
    assert.equal(answer.status, 406);
    assert.equal(answer.headers.get("content-type"), "text/javascript");
    const refusal = await answer.text();
    assert.match(refusal, /"UnsupportedImportError"/);
    assert.match(refusal, /expo/);
  });

  it("answers 404 for a path the app has no route for", async () => {
    const open = await release(starter, "release-404");
    assert.equal((await open("/nowhere", phone)).status, 404);
  });
});

describe("compile", () => {
  it("bundles the starter into one minified release, its server packages in it", async () => {
    const { code, errors } = await compile(write("starter", starter));
    assert.equal(errors, undefined);
    const imports = ts
      .createSourceFile("release.js", code!, ts.ScriptTarget.Latest)
      .statements.filter(ts.isImportDeclaration)
      .map(({ moduleSpecifier }) => (moduleSpecifier as ts.StringLiteral).text);
    assert.deepEqual([...new Set(imports)], ["node:async_hooks"]);
    assert.match(code!, /UnsupportedImportError/);
    // A guard against a dependency bundled by accident, not a platform limit.
    assert.ok(code!.length < 150_000, `${code!.length} bytes`);
  });
});
