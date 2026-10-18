import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { installedPackages, parseModules } from "../dist/index.js";
import { modulesOf } from "../dist/client.js";
import withPackages from "../dist/expo.js";

// An app: its dependencies, installed at their versions.
function app(installed: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "builds-"));
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

  it("are put in the Expo config, keeping its extra", () => {
    const root = app(installed);
    const config = withPackages({
      name: "app",
      extra: { eas: { projectId: "1" }, backtick: { other: true } },
      _internal: { projectRoot: root },
    });
    assert.equal(config.name, "app");
    assert.deepEqual(config.extra, {
      eas: { projectId: "1" },
      backtick: { other: true, packages: installed },
    });
  });
});

describe("the modules a build sends", () => {
  const moduleMap = {
    react: {},
    "react/jsx-runtime": {},
    "@facebook/sdk/login": {},
  };

  it("are its module map's, at its packages' versions", () => {
    assert.deepEqual(modulesOf(moduleMap, installed), {
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
      "@facebook/sdk/login": "13.4.3",
    });
  });

  it("are what its server reads", () => {
    const { extra } = withPackages({
      _internal: { projectRoot: app(installed) },
    });
    const packages = (extra.backtick as { packages: Record<string, string> })
      .packages;
    const modules = modulesOf(moduleMap, packages);
    assert.deepEqual(parseModules(JSON.stringify(modules)), modules);
  });

  it("need every package's version, or the app throws as it starts", () => {
    assert.throws(
      () => modulesOf(moduleMap, { react: "19.2.3" }),
      /offers "@facebook\/sdk\/login", but @facebook\/sdk isn't in package\.json's dependencies/,
    );
    assert.throws(
      () => modulesOf(moduleMap, undefined),
      /is @backtickjs\/builds\/expo in app.json's plugins/,
    );
  });

  it("are refused by the server when missing or malformed", () => {
    assert.throws(() => parseModules(undefined), /No modules were sent/);
    assert.throws(() => parseModules(""), /No modules were sent/);
    assert.throws(() => parseModules("{"), /aren't JSON/);
    assert.throws(() => parseModules("[]"), /aren't \{ specifier: version \}/);
    assert.throws(
      () => parseModules('{"react":19}'),
      /aren't \{ specifier: version \}/,
    );
  });
});
