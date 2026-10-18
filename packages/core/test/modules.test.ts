import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { modulesOf } from "../dist/index.js";
import { installedPackages } from "../dist/node.js";

// An app: its dependencies, installed at their versions.
function app(installed: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "modules-"));
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({
      dependencies: Object.fromEntries(
        Object.keys(installed).map((name) => [name, "*"]),
      ),
    }),
  );
  for (const [name, version] of Object.entries(installed)) {
    mkdirSync(join(root, "node_modules", name), { recursive: true });
    writeFileSync(
      join(root, "node_modules", name, "package.json"),
      JSON.stringify({ name, version }),
    );
  }
  return root;
}

const installed = { react: "19.2.3", "@facebook/sdk": "13.4.3" };

describe("the packages an app is built with", () => {
  it("are its dependencies' installed versions", () => {
    assert.deepEqual(installedPackages(app(installed)), installed);
  });

  it("are found above the app, as a workspace hoists them", () => {
    const workspace = app(installed);
    const root = join(workspace, "apps", "app");
    mkdirSync(root, { recursive: true });
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({ dependencies: { react: "*" } }),
    );
    assert.deepEqual(installedPackages(root), { react: "19.2.3" });
  });
});

describe("the modules a build sends", () => {
  const moduleMap = {
    react: {},
    "react/jsx-runtime": {},
    "@facebook/sdk/login": {},
  };

  it("are its module map's, at its packages' installed versions", () => {
    assert.deepEqual(modulesOf(moduleMap, installedPackages(app(installed))), {
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
      "@facebook/sdk/login": "13.4.3",
    });
  });

  it("need every package's version, or the app throws as it starts", () => {
    assert.throws(
      () => modulesOf(moduleMap, { react: "19.2.3" }),
      /offers "@facebook\/sdk\/login", but @facebook\/sdk isn't in package\.json's dependencies/,
    );
    for (const packages of [undefined, null]) {
      assert.throws(
        () => modulesOf(moduleMap, packages),
        /No installed packages: the app's build records them/,
      );
    }
  });
});
