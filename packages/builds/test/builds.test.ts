import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  installedModules,
  moduleMapFile,
  parseModules,
  readModuleMap,
} from "../dist/index.js";
import { modulesFrom } from "../dist/client.js";
import withModules from "../dist/expo.js";

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

it("puts each platform's modules in the Expo config, keeping its extra", () => {
  const root = mobile();
  const config = withModules({
    name: "app",
    extra: { eas: { projectId: "1" } },
    _internal: { projectRoot: root },
  });
  assert.equal(config.name, "app");
  assert.deepEqual(config.extra, {
    eas: { projectId: "1" },
    backtick: {
      modules: {
        ios: {
          fbsdk: "13.4.3",
          react: "19.2.3",
          "react/jsx-runtime": "19.2.3",
        },
        android: {
          fbsdk: "13.4.3",
          react: "19.2.3",
          "react/jsx-runtime": "19.2.3",
        },
        web: { react: "19.2.3", "react/jsx-runtime": "19.2.3" },
      },
    },
  });
});

it("offers the modules a map names, not only their packages", () => {
  const root = app(
    { "moduleMap.ts": map("react", "fbsdk", "fbsdk/x") },
    { react: "19.2.3", fbsdk: "13.4.3" },
  );
  assert.deepEqual(installedModules(root, "ios"), {
    fbsdk: "13.4.3",
    "fbsdk/x": "13.4.3",
    react: "19.2.3",
  });
});

it("finds a package installed above the app, as a workspace hoists it", () => {
  const workspace = mobile();
  const root = join(workspace, "apps", "app");
  mkdirSync(root, { recursive: true });
  writeFileSync(join(root, "moduleMap.ts"), map("react", "fbsdk"));
  assert.deepEqual(installedModules(root, "ios"), {
    fbsdk: "13.4.3",
    react: "19.2.3",
  });
});

describe("the modules a build sends", () => {
  it("are what its server reads", () => {
    const { extra } = withModules({ _internal: { projectRoot: mobile() } });
    assert.deepEqual(parseModules(modulesFrom(extra, "web")), {
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
    });
  });

  it("are in the app config, or the app throws as it starts", () => {
    assert.throws(
      () => modulesFrom({ backtick: { modules: { ios: {} } } }, "android"),
      /No modules for android/,
    );
    assert.throws(
      () => modulesFrom(undefined, "ios"),
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
