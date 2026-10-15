import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  buildIdOf,
  buildIds,
  createBuilds,
  DeprecatedBuild,
  moduleMapFile,
  readModuleMap,
  register,
  UnknownBuild,
} from "../dist/index.js";
import { buildIdFrom } from "../dist/client.js";
import withBuildIds from "../dist/expo.js";

const cli = fileURLToPath(new URL("../dist/cli.js", import.meta.url));

// An app: its module maps, and its installed packages at their versions.
function app(
  files: Record<string, string>,
  installed: Record<string, string> = {},
): string {
  const root = mkdtempSync(join(tmpdir(), "builds-"));
  for (const [file, source] of Object.entries(files)) {
    writeFileSync(join(root, file), source);
  }
  for (const [name, version] of Object.entries(installed)) {
    mkdirSync(join(root, "node_modules", name), { recursive: true });
    writeFileSync(
      join(root, "node_modules", name, "package.json"),
      JSON.stringify({ name, version }),
    );
  }
  return root;
}

const map = (...specifiers: string[]) =>
  `${specifiers.map((each, index) => `import * as M${index} from "${each}";`).join("\n")}
export const moduleMap = {
${specifiers.map((each, index) => `  "${each}": M${index},`).join("\n")}
};
`;

// iOS and Android with a native SDK; the web without it.
const mobile = () =>
  app(
    {
      "moduleMap.ts": map("react", "react/jsx-runtime", "fbsdk"),
      "moduleMap.web.ts": map("react", "react/jsx-runtime"),
    },
    { react: "19.2.3", fbsdk: "13.4.3" },
  );

describe("a module map", () => {
  it("is read as a table of specifiers", () => {
    const root = mobile();
    assert.deepEqual(readModuleMap(join(root, "moduleMap.ts")), [
      "react",
      "react/jsx-runtime",
      "fbsdk",
    ]);
  });

  it("may not decide at runtime", () => {
    const root = app({
      "moduleMap.ts": `import * as React from "react";
import * as Fbsdk from "fbsdk";
export const moduleMap = {
  react: React,
  fbsdk: native ? Fbsdk : {},
};`,
    });
    assert.throws(
      () => readModuleMap(join(root, "moduleMap.ts")),
      /moduleMap\.ts:5: each entry is/,
    );
  });

  it("offers only what it imports", () => {
    const root = app({
      "moduleMap.ts": `import * as React from "react";
export const moduleMap = {
  react: React,
  fbsdk: Fbsdk,
};`,
    });
    assert.throws(
      () => readModuleMap(join(root, "moduleMap.ts")),
      /moduleMap\.ts:4: each entry is `"specifier": Name`, with `Name` imported above/,
    );
  });

  it("takes any import: a namespace, a name, a default", () => {
    const root = app({
      "moduleMap.ts": `import * as React from "react";
import { Fiber } from "./fiber";
import Constants from "expo-constants";
export const moduleMap = {
  react: React,
  "@react-three/fiber/native": Fiber,
  "expo-constants": Constants,
};`,
    });
    assert.deepEqual(readModuleMap(join(root, "moduleMap.ts")), [
      "react",
      "@react-three/fiber/native",
      "expo-constants",
    ]);
  });

  it("may hold nothing but the table", () => {
    const root = app({
      "moduleMap.ts": `const native = () => true;\nexport const moduleMap = {};`,
    });
    assert.throws(
      () => readModuleMap(join(root, "moduleMap.ts")),
      /moduleMap\.ts:1: a module map holds/,
    );
  });

  it("is the platform's file, as Metro picks it", () => {
    const root = app({
      "moduleMap.ts": map("react"),
      "moduleMap.native.ts": map("react"),
      "moduleMap.ios.ts": map("react"),
    });
    assert.match(moduleMapFile(root, "ios"), /moduleMap\.ios\.ts$/);
    assert.match(moduleMapFile(root, "android"), /moduleMap\.native\.ts$/);
    assert.match(moduleMapFile(root, "web"), /moduleMap\.ts$/);
  });

  it("is in the client root package.json names", () => {
    const root = app({
      "package.json": JSON.stringify({ backtick: { clientRoot: "client" } }),
    });
    mkdirSync(join(root, "client"));
    writeFileSync(join(root, "client", "moduleMap.ts"), map("react"));
    assert.equal(
      moduleMapFile(root, "ios"),
      join(root, "client", "moduleMap.ts"),
    );
  });
});

it("names each platform's build by its packages", () => {
  const ids = buildIds(mobile());
  assert.equal(ids.ios, ids.android);
  assert.notEqual(ids.ios, ids.web);
  assert.equal(
    ids.web,
    buildIdOf({ react: "19.2.3", "react/jsx-runtime": "19.2.3" }),
  );
});

it("puts each platform's id in the Expo config, keeping its extra", () => {
  const root = mobile();
  const config = withBuildIds({
    name: "app",
    extra: { eas: { projectId: "1" } },
    _internal: { projectRoot: root },
  });
  assert.equal(config.name, "app");
  assert.deepEqual(config.extra, {
    eas: { projectId: "1" },
    buildIds: buildIds(root),
  });
});

it("names a build by the modules it offers, not only their packages", () => {
  // a later build offers another module from a package it already had
  const before = buildIds(mobile());
  const after = buildIds(
    app(
      {
        "moduleMap.ts": map("react", "react/jsx-runtime", "fbsdk", "fbsdk/x"),
        "moduleMap.web.ts": map("react", "react/jsx-runtime"),
      },
      { react: "19.2.3", fbsdk: "13.4.3" },
    ),
  );
  assert.notEqual(after.ios, before.ios);
  assert.equal(after.web, before.web);
});

it("finds a package installed above the app, as a workspace hoists it", () => {
  const workspace = mobile();
  const root = join(workspace, "apps", "app");
  mkdirSync(root, { recursive: true });
  writeFileSync(join(root, "moduleMap.ts"), map("react", "fbsdk"));
  assert.equal(
    buildIds(root).ios,
    buildIdOf({ fbsdk: "13.4.3", react: "19.2.3" }),
  );
});

describe("a server's builds", () => {
  it("resolves this code's builds, registered or not", () => {
    const root = mobile();
    const builds = createBuilds({ projectRoot: root });
    const ids = buildIds(root);
    assert.deepEqual(builds.modulesOf(ids.ios), {
      fbsdk: "13.4.3",
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
    });
    assert.deepEqual(builds.modulesOf(ids.web), {
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
    });
  });

  it("resolves a registered build after the code moves on", () => {
    const root = mobile();
    const [ios] = register(root);
    // fbsdk upgraded since
    writeFileSync(
      join(root, "node_modules", "fbsdk", "package.json"),
      JSON.stringify({ name: "fbsdk", version: "14.0.0" }),
    );
    const builds = createBuilds({ projectRoot: root });
    assert.equal(builds.modulesOf(ios!.id).fbsdk, "13.4.3");
  });

  it("refuses a build it doesn't know, or none", () => {
    const builds = createBuilds({ projectRoot: mobile() });
    assert.throws(() => builds.modulesOf("0123456789abcdef"), UnknownBuild);
    assert.throws(() => builds.modulesOf(null), /No build id was sent/);
  });

  it("refuses a build deprecated on purpose", () => {
    const root = mobile();
    const [ios] = register(root);
    const build = JSON.parse(readFileSync(ios!.file, "utf8"));
    writeFileSync(ios!.file, JSON.stringify({ ...build, deprecated: true }));
    const builds = createBuilds({ projectRoot: root });
    assert.throws(
      () => builds.modulesOf(ios!.id),
      (error) =>
        error instanceof DeprecatedBuild && error.modules.fbsdk === "13.4.3",
    );
    assert.match(builds.unregistered("ios")!, /is deprecated/);
  });
});

describe("registering", () => {
  it("records each platform's build, keeping when it was first", () => {
    const root = mobile();
    const [first] = register(root);
    const recorded = JSON.parse(readFileSync(first!.file, "utf8"));
    assert.equal(recorded.deprecated, false);
    assert.deepEqual(recorded.modules, {
      fbsdk: "13.4.3",
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
    });
    const [again] = register(root);
    assert.equal(
      JSON.parse(readFileSync(again!.file, "utf8")).createdAt,
      recorded.createdAt,
    );
    assert.equal(createBuilds({ projectRoot: root }).unregistered("web"), null);
  });
});

describe("backtick-builds check", () => {
  const check = (root: string, env: Record<string, string> = {}) =>
    spawnSync(process.execPath, [cli, "check"], {
      cwd: root,
      env: { ...process.env, ...env },
      encoding: "utf8",
    });

  it("fails while a build isn't registered", () => {
    const result = check(mobile());
    assert.equal(result.status, 1);
    assert.match(result.stderr, /No builds\/\w+\.json for ios/);
  });

  it("checks only the platform an EAS build builds", () => {
    const root = mobile();
    register(root);
    assert.equal(check(root, { EAS_BUILD_PLATFORM: "ios" }).status, 0);
  });

  it("lets a development build through", () => {
    assert.equal(
      check(mobile(), { EAS_BUILD_PROFILE: "development" }).status,
      0,
    );
  });
});

describe("buildIdFrom", () => {
  it("reads this build's id from the app config, or throws as the app starts", () => {
    const extra = {
      buildIds: { ios: "f327397121ce4e4e", web: "887a92bf84a4b44e" },
    };
    assert.equal(buildIdFrom(extra, "ios"), "f327397121ce4e4e");
    assert.throws(
      () => buildIdFrom(extra, "android"),
      /No build id for android/,
    );
    assert.throws(
      () => buildIdFrom(undefined, "ios"),
      /is @backtickjs\/builds\/expo in app.json's plugins/,
    );
  });
});
